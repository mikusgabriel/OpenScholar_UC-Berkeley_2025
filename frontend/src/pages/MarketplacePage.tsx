"use client";

import { useState } from "react";
import LayoutWrapper from "@/components/layout-wrapper";
import {
  ShoppingBag,
  Star,
  Download,
  Zap,
  FileText,
  Palette,
  Search,
  Filter,
  ShoppingCart,
  Heart,
  Eye,
  Users,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { id: "all", title: "All Items", count: 156 },
    {
      id: "templates",
      title: "Templates",
      icon: FileText,
      color: "from-blue-500 to-purple-600",
      count: 45,
    },
    {
      id: "tools",
      title: "Tools",
      icon: Zap,
      color: "from-green-500 to-emerald-600",
      count: 32,
    },
    {
      id: "themes",
      title: "Themes",
      icon: Palette,
      color: "from-pink-500 to-rose-600",
      count: 28,
    },
    {
      id: "plugins",
      title: "Plugins",
      icon: Users,
      color: "from-orange-500 to-yellow-500",
      count: 51,
    },
  ];

  const marketplaceItems = [
    {
      id: "1",
      title: "Academic Paper Template Pro",
      description:
        "Professional template for academic research papers with IEEE formatting",
      price: 12.99,
      originalPrice: 19.99,
      rating: 4.8,
      reviews: 234,
      downloads: "2.1k",
      category: "templates",
      image: "📄",
      tags: ["Academic", "IEEE", "Professional"],
      author: "Dr. Smith",
      lastUpdated: "2 days ago",
      featured: true,
    },
    {
      id: "2",
      title: "Citation Manager Pro",
      description:
        "Advanced citation management and formatting tool with APA, MLA, Chicago styles",
      price: 24.99,
      rating: 4.9,
      reviews: 189,
      downloads: "1.8k",
      category: "tools",
      image: "📚",
      tags: ["Citations", "APA", "MLA", "Chicago"],
      author: "RefTools Inc",
      lastUpdated: "1 week ago",
      featured: true,
    },
    {
      id: "3",
      title: "Modern Research Theme",
      description:
        "Clean and modern theme for research presentations and documents",
      price: 8.99,
      rating: 4.7,
      reviews: 156,
      downloads: "3.2k",
      category: "themes",
      image: "🎨",
      tags: ["Modern", "Clean", "Presentation"],
      author: "DesignLab",
      lastUpdated: "3 days ago",
      featured: false,
    },
    {
      id: "4",
      title: "LaTeX Converter Plugin",
      description:
        "Convert your markdown documents to LaTeX format with advanced formatting",
      price: 15.99,
      rating: 4.6,
      reviews: 98,
      downloads: "1.2k",
      category: "plugins",
      image: "⚡",
      tags: ["LaTeX", "Converter", "Markdown"],
      author: "TechTools",
      lastUpdated: "5 days ago",
      featured: false,
    },
    {
      id: "5",
      title: "Scientific Journal Template",
      description:
        "Template designed for scientific journal submissions with multiple formats",
      price: 18.99,
      rating: 4.9,
      reviews: 312,
      downloads: "2.8k",
      category: "templates",
      image: "🔬",
      tags: ["Scientific", "Journal", "Submission"],
      author: "SciWrite",
      lastUpdated: "1 day ago",
      featured: true,
    },
    {
      id: "6",
      title: "Grammar & Style Checker",
      description:
        "AI-powered grammar and style checker specifically for academic writing",
      price: 29.99,
      rating: 4.8,
      reviews: 445,
      downloads: "4.1k",
      category: "tools",
      image: "✍️",
      tags: ["Grammar", "AI", "Academic"],
      author: "WriteWell AI",
      lastUpdated: "4 days ago",
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

  const addToCart = (itemId: string) => {
    if (!cartItems.includes(itemId)) {
      setCartItems([...cartItems, itemId]);
    }
  };

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
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="bg-white/80 border-purple-200/50 text-gray-800 hover:bg-purple-50/50"
              >
                <Heart className="w-4 h-4 mr-2" />
                Favorites ({favorites.length})
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart ({cartItems.length})
              </Button>
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
            <Button
              variant="outline"
              className="bg-white/80 border-purple-200/50 text-gray-800 hover:bg-purple-50/50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
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

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{item.rating}</span>
                        <span>({item.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span>{item.downloads}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>by {item.author}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200/50">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-gray-900">
                          ${item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button
                        onClick={() => addToCart(item.id)}
                        disabled={cartItems.includes(item.id)}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-md transition-all duration-200 text-sm"
                        size="sm"
                      >
                        {cartItems.includes(item.id)
                          ? "In Cart"
                          : "Add to Cart"}
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
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="bg-white/80 border border-purple-200/50 rounded-lg px-3 py-1 text-sm focus:border-purple-400 focus:ring-purple-400/20">
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Rated</option>
              </select>
            </div>
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
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span>{item.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      <span>{item.downloads}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">
                      ${item.price}
                    </span>
                    <Button
                      onClick={() => addToCart(item.id)}
                      disabled={cartItems.includes(item.id)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-md transition-all duration-200"
                      size="sm"
                    >
                      {cartItems.includes(item.id) ? "In Cart" : "Add"}
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
