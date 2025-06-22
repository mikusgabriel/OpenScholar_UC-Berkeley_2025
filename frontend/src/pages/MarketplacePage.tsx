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
      count: 1,
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
      image: "🏥",
      tags: ["Medical", "Oncology", "Clinical Trial", "Multi-center"],
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
      image: "⚛️",
      tags: ["Quantum", "Computing", "Error Correction", "Algorithms"],
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
      image: "💻",
      tags: ["AI Ethics", "Healthcare", "Machine Learning", "Policy"],
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
      image: "🧬",
      tags: ["Ecology", "Conservation", "Urban Planning", "Biodiversity"],
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
      image: "🧪",
      tags: ["Green Chemistry", "Sustainability", "Synthesis", "Environment"],
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
      image: "📐",
      tags: ["Climate Science", "Mathematical Modeling", "Data Analysis", "Prediction"],
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
      image: "⚙️",
      tags: ["Renewable Energy", "Smart Grid", "Engineering", "Policy"],
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
      image: "📊",
      tags: ["Epidemiology", "Public Health", "Policy", "Global Health"],
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
      image: "🌌",
      tags: ["Dark Matter", "Particle Physics", "Detection", "Cosmology"],
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
      image: "🤖",
      tags: ["Explainable AI", "Scientific Computing", "Machine Learning", "Research Tools"],
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
      image: "🔬",
      tags: ["Environmental Chemistry", "Marine Biology", "Pollution", "Ecosystems"],
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
      image: "📈",
      tags: ["Biostatistics", "Genomics", "Data Science", "Statistical Methods"],
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
      image: "🧠",
      tags: ["RAG", "AI", "NLP", "Information Retrieval", "Generation"],
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
  ]

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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
                    <div className="flex items-start justify-between">
                      <div className="text-3xl mb-2">{item.image}</div>
                    </div>
                    <CardTitle className="text-base group-hover:text-purple-700 transition-colors">
                      {item.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-purple-100/50 text-purple-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>

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
                    <div className="flex items-start justify-between">
                      <div className="text-3xl mb-2">{item.image}</div>
                    </div>
                    <CardTitle className="text-base group-hover:text-purple-700 transition-colors">
                      {item.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-purple-100/50 text-purple-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>

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
                  <div className="flex items-start justify-between">
                    <div className="text-2xl mb-2">{item.image}</div>
                  </div>
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
