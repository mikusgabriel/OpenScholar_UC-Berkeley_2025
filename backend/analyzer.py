#!/usr/bin/env python3
"""
Clean Research Opportunity Analyzer
===================================

All-in-one script for analyzing arXiv papers and identifying emerging research opportunities.
Focuses on subclusters with proper naming for website integration.

Usage:
    python clean_research_analyzer.py
"""

import json
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from scipy import stats
from datetime import datetime, timedelta
import warnings
import openai
import os
import math
warnings.filterwarnings('ignore')

class CleanResearchAnalyzer:
    def __init__(self, data_file='ml-arxiv-embeddings.json', openai_api_key=None):
        """Initialize the research opportunity analyzer."""
        self.data_file = data_file
        self.openai_api_key = openai_api_key
        self.papers_df = None
        self.embeddings = None
        self.cluster_labels = None
        self.scaler = StandardScaler()
        self.sub_clusters = {}
        self.opportunities = []
        self.risks = []

    def load_data(self, sample_size=150000, random_seed=42):
        """Load and sample papers from the JSON file."""
        print(f"Loading {sample_size:,} papers for analysis...")

        papers = []
        embeddings = []

        # Scan file for date range first
        print("Scanning file for date range...")
        dates = []
        with open(self.data_file, 'r') as f:
            for i, line in enumerate(f):
                if i % 100000 == 0:
                    print(f"  Scanned {i:,} lines...")
                try:
                    paper = json.loads(line.strip())
                    dates.append(pd.to_datetime(paper['update_date']))
                except:
                    continue

        date_range = (min(dates), max(dates))
        print(f"Date range: {date_range[0]} to {date_range[1]}")

        # Sample papers
        print("Sampling papers...")
        with open(self.data_file, 'r') as f:
            for i, line in enumerate(f):
                if i % 100000 == 0:
                    print(f"  Processed {i:,} lines...")
                if len(papers) >= sample_size:
                    break
                try:
                    paper = json.loads(line.strip())
                    papers.append(paper)
                    embeddings.append(paper['embedding'])
                except:
                    continue

        # Create DataFrame
        self.papers_df = pd.DataFrame([
            {
                'id': paper['id'],
                'title': paper['title'],
                'abstract': paper['abstract'],
                'authors': paper['authors'],
                'categories': paper['categories'],
                'update_date': paper['update_date']
            }
            for paper in papers
        ])

        self.embeddings = np.array(embeddings)
        print(f"Loaded {len(papers):,} papers with {self.embeddings.shape[1]}-dimensional embeddings")

    def preprocess_embeddings(self):
        """Standardize embeddings for clustering."""
        print("Preprocessing embeddings...")
        self.embeddings_scaled = self.scaler.fit_transform(self.embeddings)
        print("Embeddings standardized successfully")

    def fit_clustering(self, n_clusters=100):
        """Fit K-means clustering."""
        print(f"Fitting K-means clustering with {n_clusters} clusters...")

        kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
        self.cluster_labels = kmeans.fit_predict(self.embeddings_scaled)

        print("Clustering completed successfully!")
        cluster_counts = pd.Series(self.cluster_labels).value_counts().sort_index()
        print(f"Cluster distribution: {len(cluster_counts)} clusters")

    def create_subclusters(self, n_subclusters=50):
        """Create subclusters for each main cluster."""
        print(f"Creating {n_subclusters} subclusters per cluster...")

        for cluster_id in np.unique(self.cluster_labels):
            cluster_mask = self.cluster_labels == cluster_id
            cluster_papers = self.papers_df[cluster_mask]
            cluster_embeddings = self.embeddings_scaled[cluster_mask]

            if len(cluster_papers) < n_subclusters:
                # If cluster is too small, create fewer subclusters
                n_subs = min(len(cluster_papers) // 3, 10)
                if n_subs < 2:
                    continue
            else:
                n_subs = n_subclusters

            # Fit subclustering
            sub_kmeans = KMeans(n_clusters=n_subs, random_state=42, n_init=10)
            sub_labels = sub_kmeans.fit_predict(cluster_embeddings)

            # Store subcluster data
            self.sub_clusters[cluster_id] = {}
            for sub_id in range(n_subs):
                sub_mask = sub_labels == sub_id
                sub_papers = cluster_papers[sub_mask]

                if len(sub_papers) >= 5:  # Minimum size threshold
                    self.sub_clusters[cluster_id][sub_id] = {
                        'papers': sub_papers,
                        'size': len(sub_papers),
                        'density': self.calculate_density(cluster_embeddings[sub_mask])
                    }

        total_subs = sum(len(subs) for subs in self.sub_clusters.values())
        print(f"Created {total_subs} subclusters")

    def calculate_density(self, embeddings):
        """Calculate density of embeddings."""
        if len(embeddings) < 2:
            return 0
        distances = []
        for i in range(len(embeddings)):
            for j in range(i+1, len(embeddings)):
                dist = np.linalg.norm(embeddings[i] - embeddings[j])
                distances.append(dist)
        return np.mean(distances) if distances else 0

    def analyze_temporal_trends(self):
        """Analyze temporal trends for subclusters."""
        print("Analyzing temporal trends...")

        # Convert dates
        self.papers_df['date'] = pd.to_datetime(self.papers_df['update_date'])

        # Create quarterly periods
        self.papers_df['quarter'] = self.papers_df['date'].dt.to_period('Q')
        quarters = sorted(self.papers_df['quarter'].unique())

        # Analyze each subcluster
        for cluster_id, subclusters in self.sub_clusters.items():
            for sub_id, sub_data in subclusters.items():
                sub_papers = sub_data['papers']
                sub_papers['date'] = pd.to_datetime(sub_papers['update_date'])
                sub_papers['quarter'] = sub_papers['date'].dt.to_period('Q')

                # Count papers per quarter
                quarter_counts = sub_papers['quarter'].value_counts().sort_index()

                if len(quarter_counts) >= 3:  # Need at least 3 quarters for trend analysis
                    # Calculate growth rate and acceleration
                    quarters_list = list(quarter_counts.index)
                    counts_list = list(quarter_counts.values)

                    # Linear regression for growth rate
                    x = np.arange(len(counts_list))
                    slope, intercept, r_value, p_value, std_err = stats.linregress(x, counts_list)

                    # Calculate acceleration (second derivative)
                    if len(counts_list) >= 3:
                        acceleration = np.polyfit(x, counts_list, 2)[0] * 2
                    else:
                        acceleration = 0

                    # Calculate opportunity score
                    opportunity_score = self.calculate_opportunity_score({
                        'avg_growth_rate': slope,
                        'avg_acceleration': acceleration,
                        'recent_papers_added': sum(counts_list[-2:]),  # Last 2 quarters
                        'total_cumulative_papers': sum(counts_list),
                        'growth_status': 'ACCELERATING' if acceleration > 0 else 'DECELERATING'
                    })

                    if opportunity_score > 0.7:  # High opportunity threshold
                        self.opportunities.append({
                            'cluster_id': cluster_id,
                            'sub_id': sub_id,
                            'type': 'subcluster',
                            'opportunity_score': opportunity_score,
                            'growth_rate': slope,
                            'acceleration': acceleration,
                            'recent_papers': sum(counts_list[-2:]),
                            'total_papers': sum(counts_list),
                            'growth_status': 'ACCELERATING' if acceleration > 0 else 'DECELERATING',
                            'reasoning': self.explain_opportunity({
                                'avg_growth_rate': slope,
                                'avg_acceleration': acceleration,
                                'recent_papers_added': sum(counts_list[-2:]),
                                'total_cumulative_papers': sum(counts_list),
                                'growth_status': 'ACCELERATING' if acceleration > 0 else 'DECELERATING'
                            })
                        })

        print(f"Identified {len(self.opportunities)} emerging opportunities")

    def calculate_opportunity_score(self, data):
        """Calculate opportunity score based on growth metrics."""
        growth_rate = data['avg_growth_rate']
        acceleration = data['avg_acceleration']
        recent_papers = data['recent_papers_added']
        total_papers = data['total_cumulative_papers']

        # Normalize metrics
        growth_score = min(growth_rate / 10, 1.0) if growth_rate > 0 else 0
        accel_score = min(acceleration / 5, 1.0) if acceleration > 0 else 0
        recent_score = min(recent_papers / 100, 1.0)
        size_score = min(total_papers / 200, 1.0)

        # Weighted combination
        score = (0.3 * growth_score + 0.3 * accel_score + 0.2 * recent_score + 0.2 * size_score)
        return min(score, 1.0)

    def explain_opportunity(self, data):
        """Generate reasoning for opportunity."""
        reasons = []

        if data['avg_growth_rate'] > 5:
            reasons.append(f"High growth rate ({data['avg_growth_rate']:.2f} papers/period)")
        if data['avg_acceleration'] > 1:
            reasons.append(f"Strong acceleration ({data['avg_acceleration']:.2f} papers/period²)")
        if data['recent_papers_added'] > 50:
            reasons.append(f"High recent activity ({data['recent_papers_added']} papers added)")

        reasons.append("Growth is accelerating" if data['growth_status'] == 'ACCELERATING' else "Growth is decelerating")

        if 50 <= data['total_cumulative_papers'] <= 200:
            reasons.append(f"Optimal size ({data['total_cumulative_papers']} papers) - not too small, not saturated")

        return "; ".join(reasons)

    def name_subclusters_with_openai(self, top_n=50):
        """Name top subclusters using OpenAI."""
        if not self.openai_api_key:
            print("No OpenAI API key provided. Skipping naming.")
            return

        print(f"Naming top {top_n} subclusters...")

        # Sort opportunities by score and take top N
        sorted_opportunities = sorted(self.opportunities, key=lambda x: x['opportunity_score'], reverse=True)[:top_n]

        try:
            client = openai.OpenAI(api_key=self.openai_api_key)

            for opp in sorted_opportunities:
                cluster_id = opp['cluster_id']
                sub_id = opp['sub_id']

                if cluster_id in self.sub_clusters and sub_id in self.sub_clusters[cluster_id]:
                    sub_data = self.sub_clusters[cluster_id][sub_id]
                    sub_papers = sub_data['papers']

                    # Use only 50 random papers for naming
                    if len(sub_papers) > 50:
                        sub_papers_sample = sub_papers.sample(n=50, random_state=42)
                    else:
                        sub_papers_sample = sub_papers

                    # Get categories and titles
                    all_categories = []
                    for cats in sub_papers_sample['categories']:
                        all_categories.extend(cats.split())
                    category_counts = pd.Series(all_categories).value_counts()

                    sample_titles = sub_papers_sample['title'].tolist()[:5]

                    prompt = f"""
                    You are analyzing a subcluster in machine learning and AI papers from arXiv.

                    Subcluster statistics:
                    - Size: {len(sub_papers)} papers (analyzed 50 random papers)
                    - Growth rate: {opp['growth_rate']:.2f} papers/period
                    - Acceleration: {opp['acceleration']:.2f} papers/period²
                    - Recent papers added: {opp['recent_papers']}
                    - Total papers: {opp['total_papers']}
                    - Growth status: {opp['growth_status']}

                    Top categories: {list(category_counts.head(5).index)}
                    Sample titles: {sample_titles}

                    This subcluster has been identified as an EMERGING RESEARCH OPPORTUNITY.

                    Provide a concise, descriptive name (2-4 words) for this specific research subarea that captures its focus and why it's emerging.
                    Return only the name, nothing else.
                    """

                    response = client.chat.completions.create(
                        model="gpt-4",
                        messages=[{"role": "user", "content": prompt}],
                        max_tokens=20,
                        temperature=0.3
                    )

                    if response and response.choices and response.choices[0] and response.choices[0].message:
                        sub_name = response.choices[0].message.content.strip()
                        opp['openai_name'] = sub_name
                        print(f"Subcluster {cluster_id}-{sub_id}: {sub_name}")

        except Exception as e:
            print(f"Error naming subclusters with OpenAI: {e}")

    def generate_report(self):
        """Generate comprehensive analysis report."""
        print("Generating comprehensive analysis report...")

        report = []
        report.append("=" * 100)
        report.append("COMPREHENSIVE RESEARCH OPPORTUNITY ANALYSIS REPORT")
        report.append("=" * 100)
        report.append(f"Analysis date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        report.append(f"Total papers analyzed: {len(self.papers_df):,}")
        report.append(f"Main clusters: {len(np.unique(self.cluster_labels))}")
        report.append(f"Subclusters: {sum(len(sub) for sub in self.sub_clusters.values())}")
        report.append("")

        # Summary statistics
        report.append("SUMMARY STATISTICS")
        report.append("-" * 50)
        report.append(f"Emerging opportunities identified: {len(self.opportunities)}")
        report.append(f"Areas to avoid identified: {len(self.risks)}")

        # Top opportunities - SUBCLUSTERS ONLY
        if self.opportunities:
            report.append("")
            report.append("TOP EMERGING RESEARCH OPPORTUNITIES (SUBCLUSTERS ONLY)")
            report.append("-" * 50)

            # Sort by opportunity score
            sorted_opportunities = sorted(self.opportunities, key=lambda x: x['opportunity_score'], reverse=True)

            for i, opp in enumerate(sorted_opportunities[:15], 1):
                name = opp.get('openai_name', f'Sub-{opp["sub_id"]}')
                report.append(f"{i:2d}. Cluster {opp['cluster_id']} - {name} (Cluster {opp['cluster_id']}-{opp['sub_id']})")

                report.append(f"     Opportunity Score: {opp['opportunity_score']:.3f}")
                report.append(f"     Growth Rate: {opp['growth_rate']:.2f} papers/period")
                report.append(f"     Acceleration: {opp['acceleration']:.2f} papers/period²")
                report.append(f"     Recent Papers: {opp['recent_papers']}")
                report.append(f"     Total Papers: {opp['total_papers']}")
                report.append(f"     Reasoning: {opp['reasoning']}")
                report.append("")

        # Save report
        with open('research_opportunity_analysis.txt', 'w') as f:
            f.write('\n'.join(report))

        print("Comprehensive analysis report saved as 'research_opportunity_analysis.txt'")
        return '\n'.join(report)

    def export_website_json(self, filename='website_opportunities.json'):
        """Export subcluster opportunities to clean JSON for website use."""
        if not self.opportunities:
            print("No opportunities to export.")
            return

        # Sort by opportunity score
        sorted_opportunities = sorted(self.opportunities, key=lambda x: x['opportunity_score'], reverse=True)

        # Create clean JSON structure for website
        website_opportunities = []
        for opp in sorted_opportunities[:20]:  # Top 20 subclusters
            opportunity = {
                "title": opp.get('openai_name', f'Sub-{opp["sub_id"]}'),
                "opportunity_score": round(float(opp['opportunity_score']), 3),
                "growth_rate": round(float(opp['growth_rate']), 2),
                "acceleration": round(float(opp['acceleration']), 2),
                "recent_papers": int(opp['recent_papers']),
                "total_papers": int(opp['total_papers']),
                "reasoning": str(opp['reasoning'])
            }
            website_opportunities.append(opportunity)

        # Save to JSON file
        with open(filename, 'w') as f:
            json.dump(website_opportunities, f, indent=2)

        print(f"Website opportunities exported to {filename}")
        return website_opportunities

    def run_analysis(self, sample_size=150000, n_clusters=100, n_subclusters=50, openai_api_key=None):
        """Run complete analysis pipeline."""
        print("=" * 80)
        print("CLEAN RESEARCH OPPORTUNITY ANALYZER")
        print("=" * 80)
        print(f"Analyzing {sample_size:,} papers with {n_clusters} clusters and {n_subclusters} subclusters each")
        print("=" * 80)

        # Set API key if provided
        if openai_api_key:
            self.openai_api_key = openai_api_key

        # Run analysis pipeline
        self.load_data(sample_size=sample_size)
        self.preprocess_embeddings()
        self.fit_clustering(n_clusters=n_clusters)
        self.create_subclusters(n_subclusters=n_subclusters)
        self.analyze_temporal_trends()

        if self.openai_api_key:
            self.name_subclusters_with_openai(top_n=50)

        self.generate_report()
        self.export_website_json()

        print("\n" + "=" * 80)
        print("ANALYSIS COMPLETE!")
        print("=" * 80)
        print(f"Emerging opportunities: {len(self.opportunities)}")
        print(f"Named subclusters: {len([opp for opp in self.opportunities if 'openai_name' in opp])}")

        return self.opportunities

def main():
    """Main function to run the analysis."""
    # Your OpenAI API key

    # Create analyzer and run analysis
    analyzer = CleanResearchAnalyzer()
    opportunities = analyzer.run_analysis(
        sample_size=150000,
        n_clusters=100,
        n_subclusters=50,
        openai_api_key=OPENAI_API_KEY
    )

    # Print top 5 opportunities
    if opportunities:
        print("\nTop 5 Opportunities:")
        for i, opp in enumerate(opportunities[:5], 1):
            name = opp.get('openai_name', f'Sub-{opp["sub_id"]}')
            print(f"{i}. {name} (Score: {opp['opportunity_score']:.3f})")

if __name__ == "__main__":
    main()
