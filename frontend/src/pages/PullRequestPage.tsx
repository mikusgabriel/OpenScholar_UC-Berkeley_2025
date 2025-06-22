import LayoutWrapper from "@/components/layout-wrapper"
import { GitPullRequest, GitMerge, X, Clock, CheckCircle, AlertCircle, Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function PullRequestsPage() {
  const pullRequests = [
    {
      id: 1,
      title: "Add methodology section to research paper",
      description: "Comprehensive methodology section covering data collection and analysis approaches",
      author: "Dr. Sarah Chen",
      status: "open",
      branch: "feature/methodology",
      target: "main",
      commits: 5,
      additions: 234,
      deletions: 12,
      comments: 3,
      reviews: 2,
      createdAt: "2 hours ago",
      updatedAt: "30 minutes ago",
    },
    {
      id: 2,
      title: "Fix citation formatting in bibliography",
      description: "Updated APA citation format and fixed reference ordering",
      author: "Prof. Michael Rodriguez",
      status: "merged",
      branch: "fix/citations",
      target: "main",
      commits: 2,
      additions: 45,
      deletions: 23,
      comments: 1,
      reviews: 1,
      createdAt: "1 day ago",
      updatedAt: "6 hours ago",
    },
    {
      id: 3,
      title: "Update literature review with recent studies",
      description: "Added 15 new references from 2024 publications and updated analysis",
      author: "Dr. Emily Watson",
      status: "open",
      branch: "feature/literature-update",
      target: "main",
      commits: 8,
      additions: 567,
      deletions: 89,
      comments: 7,
      reviews: 0,
      createdAt: "3 days ago",
      updatedAt: "1 hour ago",
    },
    {
      id: 4,
      title: "Remove outdated experimental data",
      description: "Cleaned up deprecated datasets and updated analysis scripts",
      author: "Dr. James Park",
      status: "closed",
      branch: "cleanup/old-data",
      target: "main",
      commits: 3,
      additions: 12,
      deletions: 456,
      comments: 2,
      reviews: 1,
      createdAt: "1 week ago",
      updatedAt: "5 days ago",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <GitPullRequest className="w-4 h-4 text-green-600" />
      case "merged":
        return <GitMerge className="w-4 h-4 text-purple-600" />
      case "closed":
        return <X className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "from-green-500 to-emerald-600"
      case "merged":
        return "from-purple-500 to-indigo-600"
      case "closed":
        return "from-red-500 to-pink-600"
      default:
        return "from-gray-500 to-slate-600"
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-50 text-green-700 border-green-200"
      case "merged":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "closed":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const stats = [
    { label: "Open", count: pullRequests.filter((pr) => pr.status === "open").length, color: "text-green-600" },
    { label: "Merged", count: pullRequests.filter((pr) => pr.status === "merged").length, color: "text-purple-600" },
    { label: "Closed", count: pullRequests.filter((pr) => pr.status === "closed").length, color: "text-red-600" },
  ]

  return (
    <LayoutWrapper>
      <div className="h-full flex flex-col space-y-6">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl shadow-purple-500/5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
                <GitPullRequest className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Pull Requests</h2>
                <p className="text-gray-600">Review and manage code changes for your research projects</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200">
              <Plus className="w-4 h-4 mr-2" />
              New Pull Request
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.count}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg shadow-purple-500/5">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search pull requests..."
                className="pl-10 bg-white/80 border-purple-200/50 focus:border-purple-400 focus:ring-purple-400/20"
              />
            </div>
            <Button variant="outline" className="bg-white/80 border-purple-200/50 text-gray-800 hover:bg-purple-50/50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Pull Requests List */}
        <div className="flex-1 space-y-4 overflow-y-auto">
          {pullRequests.map((pr) => (
            <div
              key={pr.id}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg shadow-purple-500/5 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">{getStatusIcon(pr.status)}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">
                      {pr.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{pr.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>
                        #{pr.id} opened {pr.createdAt} by {pr.author}
                      </span>
                      <span>•</span>
                      <span>Updated {pr.updatedAt}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBg(pr.status)}`}>
                  {pr.status.charAt(0).toUpperCase() + pr.status.slice(1)}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>{pr.branch}</span>
                    <span>→</span>
                    <span>{pr.target}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {pr.commits} commits
                    </span>
                    <span className="text-green-600">+{pr.additions}</span>
                    <span className="text-red-600">-{pr.deletions}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {pr.reviews > 0 && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{pr.reviews} reviews</span>
                    </div>
                  )}
                  {pr.comments > 0 && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <AlertCircle className="w-4 h-4 text-blue-500" />
                      <span>{pr.comments} comments</span>
                    </div>
                  )}
                  <Button
                    size="sm"
                    className={`bg-gradient-to-r ${getStatusColor(pr.status)} text-white hover:shadow-md transition-all duration-200`}
                  >
                    {pr.status === "open" ? "Review" : "View"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg shadow-purple-500/5">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Showing {pullRequests.length} pull requests</div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/80 border-purple-200/50 text-gray-800 hover:bg-purple-50/50"
              >
                Load More
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-md transition-all duration-200"
              >
                Create Template
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
