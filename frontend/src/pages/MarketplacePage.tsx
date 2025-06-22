"use client";

import { useState } from "react";
import LayoutWrapper from "@/components/layout-wrapper";
import {
  ShoppingBag,
  Zap,
  Search,
  Heart,
  Eye,
  Clock,
  Monitor,
  Leaf,
  FlaskRoundIcon as Flask,
  Calculator,
  Cog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { id: "all", title: "All Themes", count: 156 },
    {
      id: "health",
      title: "Health & Medicine",
      icon: Heart,
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
      count: 35,
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
  ];

  const marketplaceItems = [
    {
      id: "1",
      title: "Medical Research Template Pro",
      description:
        "Professional template for medical research papers with NEJM and JAMA formatting standards",
      category: "health",
      image: "🏥",
      tags: ["Medical", "NEJM", "Clinical Trial", "Healthcare"],
      author: "Dr. Sarah Chen",
      lastUpdated: "1 day ago",
      featured: true,
    },
    {
      id: "2",
      title: "Quantum Physics Paper Template",
      description:
        "Specialized template for quantum physics research with equation formatting and diagram support",
      category: "physics",
      image: "⚛️",
      tags: ["Quantum", "Physics", "Equations", "Diagrams"],
      author: "Prof. Einstein Lab",
      lastUpdated: "3 days ago",
      featured: true,
    },
    {
      id: "3",
      title: "Computer Science Research Suite",
      description:
        "Complete template suite for CS papers including algorithm pseudocode and code blocks",
      category: "computer-science",
      image: "💻",
      tags: ["Algorithms", "Code", "Software", "AI/ML"],
      author: "TechPaper Inc",
      lastUpdated: "2 days ago",
      featured: true,
    },
    {
      id: "4",
      title: "Biological Research Template",
      description:
        "Template designed for biological research with species classification and genetic notation",
      category: "biology",
      image: "🧬",
      tags: ["Biology", "Genetics", "Species", "Research"],
      author: "BioLab Solutions",
      lastUpdated: "1 week ago",
      featured: false,
    },
    {
      id: "5",
      title: "Chemistry Lab Report Template",
      description:
        "Professional chemistry template with molecular structure support and reaction equations",
      category: "chemistry",
      image: "🧪",
      tags: ["Chemistry", "Molecules", "Reactions", "Lab"],
      author: "ChemWrite Pro",
      lastUpdated: "4 days ago",
      featured: false,
    },
    {
      id: "6",
      title: "Mathematical Proof Template",
      description:
        "Advanced template for mathematical proofs with theorem formatting and symbol support",
      category: "mathematics",
      image: "📐",
      tags: ["Mathematics", "Proofs", "Theorems", "Symbols"],
      author: "MathTeX Solutions",
      lastUpdated: "5 days ago",
      featured: true,
    },
    {
      id: "7",
      title: "Engineering Design Template",
      description:
        "Comprehensive template for engineering papers with CAD integration and technical drawings",
      category: "engineering",
      image: "⚙️",
      tags: ["Engineering", "CAD", "Design", "Technical"],
      author: "EngiPaper Ltd",
      lastUpdated: "6 days ago",
      featured: false,
    },
    {
      id: "8",
      title: "Epidemiology Study Template",
      description:
        "Specialized template for epidemiological studies with statistical analysis sections",
      category: "health",
      image: "📊",
      tags: ["Epidemiology", "Statistics", "Public Health", "Data"],
      author: "EpiResearch Group",
      lastUpdated: "2 days ago",
      featured: false,
    },
    {
      id: "9",
      title: "Astrophysics Research Template",
      description:
        "Template for astrophysics papers with celestial coordinate systems and observation data",
      category: "physics",
      image: "🌌",
      tags: ["Astrophysics", "Astronomy", "Observations", "Space"],
      author: "Cosmic Papers",
      lastUpdated: "1 week ago",
      featured: false,
    },
    {
      id: "10",
      title: "Machine Learning Paper Template",
      description:
        "Modern template for ML research with model architecture diagrams and performance metrics",
      category: "computer-science",
      image: "🤖",
      tags: ["Machine Learning", "AI", "Neural Networks", "Data Science"],
      author: "AI Research Hub",
      lastUpdated: "1 day ago",
      featured: true,
    },
    {
      id: "11",
      title: "Organic Chemistry Template",
      description:
        "Specialized template for organic chemistry with reaction mechanisms and synthesis pathways",
      category: "chemistry",
      image: "🔬",
      tags: ["Organic Chemistry", "Synthesis", "Mechanisms", "Compounds"],
      author: "OrganicChem Pro",
      lastUpdated: "3 days ago",
      featured: false,
    },
    {
      id: "12",
      title: "Statistical Analysis Template",
      description:
        "Comprehensive template for statistical research with R and Python code integration",
      category: "mathematics",
      image: "📈",
      tags: ["Statistics", "R", "Python", "Data Analysis"],
      author: "StatsPaper Solutions",
      lastUpdated: "2 days ago",
      featured: false,
    },
  ];

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (itemId: string) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter((id) => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  const featuredItems = filteredItems.filter((item) => item.featured);
  const regularItems = filteredItems.filter((item) => !item.featured);

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
                <h2 className="text-2xl font-bold text-gray-900">
                  Marketplace
                </h2>
                <p className="text-gray-600">
                  Discover templates, tools, and resources for your research
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search templates, tools, themes..."
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
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category.id
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
              <h3 className="text-lg font-semibold text-gray-900">
                Featured Items
              </h3>
              <Button
                variant="ghost"
                className="text-purple-600 hover:text-purple-700"
              >
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
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleFavorite(item.id)}
                          className={`p-1 h-8 w-8 ${
                            favorites.includes(item.id)
                              ? "text-red-500"
                              : "text-gray-400"
                          }`}
                        >
                          <Heart
                            className="w-4 h-4"
                            fill={
                              favorites.includes(item.id)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-1 h-8 w-8 text-gray-400"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-base group-hover:text-purple-700 transition-colors">
                      {item.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-purple-100/50 text-purple-700"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>by {item.author}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200/50">
                      <Button
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-md transition-all duration-200 text-sm"
                        size="sm"
                      >
                        Invest In
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
                ? "All Items"
                : categories.find((c) => c.id === selectedCategory)?.title}
              <span className="text-gray-500 font-normal ml-2">
                ({filteredItems.length} items)
              </span>
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
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleFavorite(item.id)}
                        className={`p-1 h-6 w-6 ${
                          favorites.includes(item.id)
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      >
                        <Heart
                          className="w-3 h-3"
                          fill={
                            favorites.includes(item.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-sm group-hover:text-purple-700 transition-colors line-clamp-2">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-500"></div>

                  <div className="flex items-center justify-between">
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-md transition-all duration-200"
                      size="sm"
                    >
                      Invest In
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No items found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}
