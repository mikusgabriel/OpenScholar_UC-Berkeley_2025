import { useState } from "react"
import LayoutWrapper from "@/components/layout-wrapper"
import {
  ShoppingBag,
  Zap,
  Search,
  Clock,
  Monitor,
  Leaf,
  FlaskRoundIcon as Flask,
  Calculator,
  Cog,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", title: "All Research Areas", count: 157 },
    {
      id: "health",
      title: "Health & Medicine",
      color: "from-red-500 to-pink-600",
      count: 28,
    },
    {
      id: "physics",
      title: "Physics",
      icon: Zap,
      color: "from-blue-500 to-indigo-600",
      count: 22,
    },
    {
      id: "computer-science",
      title: "Computer Science",
      icon: Monitor,
      color: "from-green-500 to-emerald-600",
      count: 36,
    },
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      icon: Monitor,
      color: "from-purple-500 to-pink-600",
      count: 18,
    },
    {
      id: "biology",
      title: "Biology",
      icon: Leaf,
      color: "from-emerald-500 to-teal-600",
      count: 19,
    },
    {
      id: "chemistry",
      title: "Chemistry",
      icon: Flask,
      color: "from-purple-500 to-violet-600",
      count: 16,
    },
    {
      id: "mathematics",
      title: "Mathematics",
      icon: Calculator,
      color: "from-orange-500 to-amber-600",
      count: 24,
    },
    {
      id: "engineering",
      title: "Engineering",
      icon: Cog,
      color: "from-gray-500 to-slate-600",
      count: 12,
    },
  ]

  const marketplaceItems = [
    {
      id: "1",
      company: "OncoNova Therapeutics",
      title: "Efficacy of Immunotherapy in Late-Stage Melanoma",
      description:
        "This study seeks collaborators to analyze immunotherapy outcomes across global oncology centers. Focus on cross-institutional data harmonization and patient outcome modeling.",
      category: "health",
      contributors: 12,
      lastUpdated: "1 day ago",
      featured: true,
    },
    {
      id: "2",
      company: "QBit Research Labs",
      title: "Qubit Stability in Quantum Error Correction Systems",
      description:
        "Open-source repository focused on developing scalable error correction algorithms for NISQ-era quantum devices. Theoretical physicists and hardware integrators welcome.",
      category: "physics",
      contributors: 8,
      lastUpdated: "3 days ago",
      featured: true,
    },
    {
      id: "3",
      company: "MedEthix Initiative",
      title: "Ethical Oversight Framework for AI Diagnostic Tools",
      description:
        "Inviting contributors to co-develop an ethical framework for AI-based medical diagnostics. Interdisciplinary input from clinicians, ethicists, and AI researchers encouraged.",
      category: "computer-science",
      contributors: 15,
      lastUpdated: "2 days ago",
      featured: true,
    },
    {
      id: "4",
      company: "UrbanEco Collective",
      title: "Urban Green Corridors for Insect Biodiversity",
      description:
        "Project aims to evaluate biodiversity corridors across 10 major cities. Seeks ecologists and spatial data analysts for fieldwork coordination and data modeling.",
      category: "biology",
      contributors: 6,
      lastUpdated: "1 week ago",
      featured: false,
    },
    {
      id: "5",
      company: "GreenChem Corp",
      title: "Solvent-Free Organic Synthesis for Industrial Use",
      description:
        "Developing solvent-free reaction mechanisms to reduce industrial emissions. Seeking collaboration with synthetic chemists for pilot reaction testing and scalability assessment.",
      category: "chemistry",
      contributors: 9,
      lastUpdated: "4 days ago",
      featured: false,
    },
    {
      id: "6",
      company: "ClimateModeling Alliance (CliMA)",
      title: "Mathematical Frameworks for Multi-Decadal Climate Projection",
      description:
        "Developing predictive PDE-based models for long-term climate scenarios. Looking for collaborators to refine temporal resolution and validation datasets.",
      category: "mathematics",
      contributors: 11,
      lastUpdated: "5 days ago",
      featured: true,
    },
    {
      id: "7",
      company: "GridNova Energy",
      title: "Smart Grid Design for Solar and Wind Integration",
      description:
        "Designing next-gen smart grid architecture for decentralized renewables. Engineers with expertise in control systems and grid policy are invited to contribute simulation models.",
      category: "engineering",
      contributors: 7,
      lastUpdated: "6 days ago",
      featured: false,
    },
    {
      id: "8",
      company: "GlobalHealthNow",
      title: "Cross-National Protocol for Pandemic Response Planning",
      description:
        "Proposes a data-driven response framework for pandemics. Seeking global contributors for modeling, policy benchmarking, and logistics planning.",
      category: "health",
      contributors: 18,
      lastUpdated: "2 days ago",
      featured: false,
    },
    {
      id: "9",
      company: "Astroparticle Physics Institute",
      title: "Next-Generation Cryogenic Sensors for Dark Matter Detection",
      description:
        "Research aims to test a new generation of cryogenic detectors. Open to experimental physicists and simulation specialists.",
      category: "physics",
      contributors: 14,
      lastUpdated: "1 week ago",
      featured: false,
    },
    {
      id: "10",
      company: "SciExplain AI",
      title: "Interpretable Deep Learning for Scientific Literature Analysis",
      description:
        "Builds interpretable ML tools for semantic clustering and citation tracing. Open to NLP researchers and domain scientists.",
      category: "computer-science",
      contributors: 13,
      lastUpdated: "1 day ago",
      featured: true,
    },
    {
      id: "11",
      company: "BlueOceans Lab",
      title: "Quantifying Microplastic Accumulation in Coral Reef Systems",
      description:
        "Studies microplastic impact on coral reef biodiversity using chemical assays and remote sensing. Marine ecologists and chemists encouraged to apply.",
      category: "chemistry",
      contributors: 10,
      lastUpdated: "3 days ago",
      featured: false,
    },
    {
      id: "12",
      company: "BioStatTech",
      title: "Machine Learning-Assisted Genomic Association Mapping",
      description:
        "Proposes an open pipeline for mapping gene-disease associations using ML and statistical modeling. Contributions from bioinformaticians and statisticians are highly valued.",
      category: "mathematics",
      contributors: 16,
      lastUpdated: "2 days ago",
      featured: false,
    },
    {
      id: "13",
      company: "RAG Research Consortium",
      title: "Retrieval-Augmented Generation in AI",
      description:
        "Cluster 17-3: High-growth research area focusing on retrieval-augmented generation systems. Opportunity Score: 0.970, Growth Rate: 10.33 papers/period, Acceleration: 3.00 papers/period². Recent Papers: 84, Total Papers: 94. Seeking AI researchers and NLP specialists.",
      category: "ai-ml",
      contributors: 25,
      lastUpdated: "Just now",
      featured: true,
      metrics: {
        opportunityScore: 0.970,
        growthRate: 10.33,
        acceleration: 3.00,
        recentPapers: 84,
        totalPapers: 94
      }
    },
    {
      id: "14",
      company: "LLM Applications Lab",
      title: "Large Language Models Application",
      description:
        "High-growth research area focusing on practical applications of large language models. Opportunity Score: 1.0, Growth Rate: 17.21 papers/period, Acceleration: 2.62 papers/period². Recent Papers: 205, Total Papers: 242. Seeking AI researchers and application developers.",
      category: "ai-ml",
      contributors: 45,
      lastUpdated: "Just now",
      featured: true,
      metrics: {
        opportunityScore: 1.0,
        growthRate: 17.21,
        acceleration: 2.62,
        recentPapers: 205,
        totalPapers: 242
      }
    },
    {
      id: "15",
      company: "AI Foundation Institute",
      title: "Large Language Models in AI",
      description:
        "Core research area focusing on fundamental aspects of large language models in artificial intelligence. Opportunity Score: 1.0, Growth Rate: 11.22 papers/period, Acceleration: 2.25 papers/period². Recent Papers: 82, Total Papers: 103. Seeking AI researchers and theoretical computer scientists.",
      category: "ai-ml",
      contributors: 38,
      lastUpdated: "Just now",
      featured: true,
      metrics: {
        opportunityScore: 1.0,
        growthRate: 11.22,
        acceleration: 2.25,
        recentPapers: 82,
        totalPapers: 103
      }
    },
    {
      id: "16",
      company: "MedAI Research Consortium",
      title: "Medical Applications of Large Language Models",
      description:
        "Cutting-edge research in applying large language models to medical applications and healthcare. Opportunity Score: 1.0, Growth Rate: 16.78 papers/period, Acceleration: 2.12 papers/period². Recent Papers: 107, Total Papers: 152. Seeking AI researchers, medical professionals, and healthcare technologists.",
      category: "ai-ml",
      contributors: 52,
      lastUpdated: "Just now",
      featured: true,
      metrics: {
        opportunityScore: 1.0,
        growthRate: 16.78,
        acceleration: 2.12,
        recentPapers: 107,
        totalPapers: 152
      }
    },
    {
      id: "17",
      company: "AI Security Foundation",
      title: "LLM Jailbreak Vulnerability Defense",
      description:
        "Critical research area focusing on defending against jailbreak vulnerabilities in large language models. Opportunity Score: 1.0, Growth Rate: 14.29 papers/period, Acceleration: 2.5 papers/period². Recent Papers: 75, Total Papers: 103. Seeking AI security researchers and cybersecurity experts.",
      category: "ai-ml",
      contributors: 41,
      lastUpdated: "Just now",
      featured: true,
      metrics: {
        opportunityScore: 1.0,
        growthRate: 14.29,
        acceleration: 2.5,
        recentPapers: 75,
        totalPapers: 103
      }
    },
    {
      id: "18",
      company: "Optimized RAG Systems",
      title: "Optimized Retrieval-Augmented Generation",
      description:
        "Advanced research in optimizing retrieval-augmented generation systems for better performance and efficiency. Opportunity Score: 1.0, Growth Rate: 16.29 papers/period, Acceleration: 4.17 papers/period². Recent Papers: 88, Total Papers: 115. Seeking AI researchers and optimization specialists.",
      category: "ai-ml",
      contributors: 47,
      lastUpdated: "Just now",
      featured: true,
      metrics: {
        opportunityScore: 1.0,
        growthRate: 16.29,
        acceleration: 4.17,
        recentPapers: 88,
        totalPapers: 115
      }
    },
    {
      id: "19",
      company: "Reasoning AI Lab",
      title: "Reinforcement Learning in Reasoning Models",
      description:
        "Innovative research combining reinforcement learning with reasoning models for enhanced AI capabilities. Opportunity Score: 0.97, Growth Rate: 8.0 papers/period, Acceleration: 5.29 papers/period². Recent Papers: 60, Total Papers: 65. Seeking AI researchers and reinforcement learning specialists.",
      category: "ai-ml",
      contributors: 33,
      lastUpdated: "Just now",
      featured: true,
      metrics: {
        opportunityScore: 0.97,
        growthRate: 8.0,
        acceleration: 5.29,
        recentPapers: 60,
        totalPapers: 65
      }
    },
    {
      id: "20",
      company: "AI Security Institute",
      title: "Large Language Models Security",
      description:
        "Comprehensive research in security aspects of large language models and AI systems. Opportunity Score: 0.97, Growth Rate: 9.12 papers/period, Acceleration: 3.14 papers/period². Recent Papers: 55, Total Papers: 74. Seeking AI security researchers and cybersecurity professionals.",
      category: "ai-ml",
      contributors: 39,
      lastUpdated: "Just now",
      featured: true,
      metrics: {
        opportunityScore: 0.97,
        growthRate: 9.12,
        acceleration: 3.14,
        recentPapers: 55,
        totalPapers: 74
      }
    },
    {
      id: "21",
      company: "AI Analysis Lab",
      title: "Large Language Models Analysis",
      description:
        "Deep analysis and evaluation of large language models for understanding their capabilities and limitations. Opportunity Score: 0.956, Growth Rate: 14.6 papers/period, Acceleration: 1.11 papers/period². Recent Papers: 94, Total Papers: 147. Seeking AI researchers and data scientists.",
      category: "ai-ml",
      contributors: 44,
      lastUpdated: "Just now",
      featured: true,
      metrics: {
        opportunityScore: 0.956,
        growthRate: 14.6,
        acceleration: 1.11,
        recentPapers: 94,
        totalPapers: 147
      }
    },
    {
      id: "22",
      company: "Reasoning Optimization Lab",
      title: "Chain-of-Thought Reasoning Optimization",
      description:
        "Research focused on optimizing chain-of-thought reasoning in AI systems for better problem-solving capabilities. Opportunity Score: 0.954, Growth Rate: 6.0 papers/period, Acceleration: 2.25 papers/period². Recent Papers: 46, Total Papers: 55. Seeking AI researchers and cognitive scientists.",
      category: "ai-ml",
      contributors: 28,
      lastUpdated: "Just now",
      featured: true,
      metrics: {
        opportunityScore: 0.954,
        growthRate: 6.0,
        acceleration: 2.25,
        recentPapers: 46,
        totalPapers: 55
      }
    },
    {
      id: "23",
      company: "Efficient AI Systems",
      title: "Small Language Models Optimization",
      description:
        "Research in optimizing small language models for efficiency and performance in resource-constrained environments. Opportunity Score: 0.95, Growth Rate: 9.14 papers/period, Acceleration: 1.0 papers/period². Recent Papers: 110, Total Papers: 129. Seeking AI researchers and optimization experts.",
      category: "ai-ml",
      contributors: 42,
      lastUpdated: "Just now",
      featured: true,
      metrics: {
        opportunityScore: 0.95,
        growthRate: 9.14,
        acceleration: 1.0,
        recentPapers: 110,
        totalPapers: 129
      }
    },
    {
      id: "24",
      company: "Computer Vision AI Lab",
      title: "Segment Anything Model Development",
      description:
        "Advanced research in developing and improving segment anything models for computer vision applications. Opportunity Score: 0.949, Growth Rate: 8.25 papers/period, Acceleration: 1.57 papers/period². Recent Papers: 50, Total Papers: 79. Seeking computer vision researchers and AI specialists.",
      category: "ai-ml",
      contributors: 35,
      lastUpdated: "Just now",
      featured: true,
      metrics: {
        opportunityScore: 0.949,
        growthRate: 8.25,
        acceleration: 1.57,
        recentPapers: 50,
        totalPapers: 79
      }
    },
    {
      id: "25",
      company: "Multimodal AI Institute",
      title: "Enhanced Vision-Language Models",
      description:
        "Research in enhancing vision-language models for better multimodal understanding and generation capabilities. Opportunity Score: 0.945, Growth Rate: 5.55 papers/period, Acceleration: 1.5 papers/period². Recent Papers: 52, Total Papers: 62. Seeking AI researchers and computer vision specialists.",
      category: "ai-ml",
      contributors: 31,
      lastUpdated: "Just now",
      featured: true,
      metrics: {
        opportunityScore: 0.945,
        growthRate: 5.55,
        acceleration: 1.5,
        recentPapers: 52,
        totalPapers: 62
      }
    },
    {
      id: "26",
      company: "AI Applications Hub",
      title: "Large Language Models Applications",
      description:
        "Comprehensive research in developing practical applications of large language models across various domains. Opportunity Score: 0.944, Growth Rate: 11.22 papers/period, Acceleration: 0.88 papers/period². Recent Papers: 77, Total Papers: 102. Seeking AI researchers and application developers.",
      category: "ai-ml",
      contributors: 48,
      lastUpdated: "Just now",
      featured: true,
      metrics: {
        opportunityScore: 0.944,
        growthRate: 11.22,
        acceleration: 0.88,
        recentPapers: 77,
        totalPapers: 102
      }
    },
    {
      id: "27",
      company: "Robotics AI Lab",
      title: "AI-Enhanced Robotic Planning",
      description:
        "Research in enhancing robotic planning and control systems using artificial intelligence and machine learning. Opportunity Score: 0.942, Growth Rate: 8.7 papers/period, Acceleration: 1.44 papers/period². Recent Papers: 63, Total Papers: 88. Seeking robotics researchers and AI specialists.",
      category: "ai-ml",
      contributors: 37,
      lastUpdated: "Just now",
      featured: true,
      metrics: {
        opportunityScore: 0.942,
        growthRate: 8.7,
        acceleration: 1.44,
        recentPapers: 63,
        totalPapers: 88
      }
    },
    {
      id: "28",
      company: "AI Evaluation Institute",
      title: "Large Language Models Evaluation",
      description:
        "Comprehensive evaluation and benchmarking of large language models for performance and capabilities assessment. Opportunity Score: 0.939, Growth Rate: 8.44 papers/period, Acceleration: 1.38 papers/period². Recent Papers: 56, Total Papers: 77. Seeking AI researchers and evaluation specialists.",
      category: "ai-ml",
      contributors: 36,
      lastUpdated: "Just now",
      featured: true,
      metrics: {
        opportunityScore: 0.939,
        growthRate: 8.44,
        acceleration: 1.38,
        recentPapers: 56,
        totalPapers: 77
      }
    },
    {
      id: "29",
      company: "Cognitive AI Lab",
      title: "Large Language Models Reasoning",
      description:
        "Research in enhancing reasoning capabilities of large language models for complex problem-solving tasks. Opportunity Score: 0.937, Growth Rate: 5.0 papers/period, Acceleration: 1.58 papers/period². Recent Papers: 47, Total Papers: 66. Seeking AI researchers and cognitive scientists.",
      category: "ai-ml",
      contributors: 29,
      lastUpdated: "Just now",
      featured: true,
      metrics: {
        opportunityScore: 0.937,
        growthRate: 5.0,
        acceleration: 1.58,
        recentPapers: 47,
        totalPapers: 66
      }
    },
    {
      id: "30",
      company: "Multimodal AI Research",
      title: "Multimodal Large Language Models",
      description:
        "Research in developing and improving multimodal large language models that can process text, images, and other data types. Opportunity Score: 0.936, Growth Rate: 5.8 papers/period, Acceleration: 1.56 papers/period². Recent Papers: 47, Total Papers: 59. Seeking AI researchers and multimodal specialists.",
      category: "ai-ml",
      contributors: 32,
      lastUpdated: "Just now",
      featured: true,
      metrics: {
        opportunityScore: 0.936,
        growthRate: 5.8,
        acceleration: 1.56,
        recentPapers: 47,
        totalPapers: 59
      }
    },
  ]

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredItems = filteredItems.filter((item) => item.featured && !item.metrics)
  const promisingItems = filteredItems.filter((item) => item.metrics)
  const regularItems = filteredItems.filter((item) => !item.featured && !item.metrics)

  return (
    <LayoutWrapper>
      <div className="h-full flex flex-col space-y-6">
        {/* Marketplace Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl shadow-purple-500/5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Research Marketplace</h2>
                <p className="text-gray-600">
                  Discover collaborative research proposals and contribute to cutting-edge studies
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search research proposals, studies, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 border-purple-200/50 focus:border-purple-400 focus:ring-purple-400/20"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${selectedCategory === category.id
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                : "bg-white/70 text-gray-700 hover:bg-white/90 border border-white/20"
                }`}
            >
              {category.icon && <category.icon className="w-4 h-4" />}
              <span className="font-medium">{category.title}</span>
              <Badge variant="secondary" className="bg-white/20 text-current">
                {category.count}
              </Badge>
            </button>
          ))}
        </div>

        {/* Featured Items */}
        {featuredItems.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Featured Research Proposals</h3>
              <Button variant="ghost" className="text-purple-600 hover:text-purple-700">
                View All Featured
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredItems.map((item) => (
                <Card
                  key={item.id}
                  className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg shadow-purple-500/5 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-200 group"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base group-hover:text-purple-700 transition-colors">
                      {item.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>opened by {item.company}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{item.contributors} contributors</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.lastUpdated}</span>
                        </div>
                      </div>
                    </div>

                    {item.metrics && (
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-100">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Opportunity Score:</span>
                            <span className="font-semibold text-purple-700">{item.metrics.opportunityScore}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Growth Rate:</span>
                            <span className="font-semibold text-green-700">{item.metrics.growthRate} papers/period</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Acceleration:</span>
                            <span className="font-semibold text-blue-700">{item.metrics.acceleration} papers/period²</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Recent Papers:</span>
                            <span className="font-semibold text-orange-700">{item.metrics.recentPapers}</span>
                          </div>
                          <div className="flex justify-between col-span-2">
                            <span className="text-gray-600">Total Papers:</span>
                            <span className="font-semibold text-gray-700">{item.metrics.totalPapers}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200/50">
                      <Button
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-md transition-all duration-200 text-sm"
                        size="sm"
                      >
                        Join Research
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-green-600 text-white hover:shadow-md transition-all duration-200 text-sm"
                        size="sm"
                      >
                        Invest
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Promising Items */}
        {promisingItems.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Promising Research Areas</h3>
              <Button variant="ghost" className="text-purple-600 hover:text-purple-700">
                View All Promising
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {promisingItems.map((item) => (
                <Card
                  key={item.id}
                  className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg shadow-purple-500/5 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-200 group"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base group-hover:text-purple-700 transition-colors">
                      {item.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>opened by {item.company}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{item.contributors} contributors</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.lastUpdated}</span>
                        </div>
                      </div>
                    </div>

                    {item.metrics && (
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-100">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Opportunity Score:</span>
                            <span className="font-semibold text-purple-700">{item.metrics.opportunityScore}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Growth Rate:</span>
                            <span className="font-semibold text-green-700">{item.metrics.growthRate} papers/period</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Acceleration:</span>
                            <span className="font-semibold text-blue-700">{item.metrics.acceleration} papers/period²</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Recent Papers:</span>
                            <span className="font-semibold text-orange-700">{item.metrics.recentPapers}</span>
                          </div>
                          <div className="flex justify-between col-span-2">
                            <span className="text-gray-600">Total Papers:</span>
                            <span className="font-semibold text-gray-700">{item.metrics.totalPapers}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200/50">
                      <Button
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-md transition-all duration-200 text-sm"
                        size="sm"
                      >
                        Join Research
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-green-600 text-white hover:shadow-md transition-all duration-200 text-sm"
                        size="sm"
                      >
                        Invest
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Items */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedCategory === "all"
                ? "All Research Proposals"
                : categories.find((c) => c.id === selectedCategory)?.title}
              <span className="text-gray-500 font-normal ml-2">({filteredItems.length} proposals)</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {regularItems.map((item) => (
              <Card
                key={item.id}
                className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg shadow-purple-500/5 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-200 group"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm group-hover:text-purple-700 transition-colors line-clamp-2">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{item.contributors} contributors</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-md transition-all duration-200"
                      size="sm"
                    >
                      Join Research
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No research proposals found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </LayoutWrapper>
  )
}
