import LayoutWrapper from "@/components/layout-wrapper"
import {
  GitPullRequest,
  GitMerge,
  GitCommit,
  MessageSquare,
  Eye,
  CheckCircle,
  Clock,
  FileText,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function PullRequestPage() {
  const pullRequest = {
    id: 42,
    title: "Add comprehensive methodology section to research paper",
    description: `This pull request adds a detailed methodology section to our research paper covering:

- Data collection procedures and protocols
- Statistical analysis methods and tools used
- Sample size calculations and power analysis
- Quality control measures and validation steps
- Ethical considerations and IRB approval details

The methodology section follows the journal's guidelines and includes all necessary details for reproducibility.`,
    author: {
      name: "Dr. Sarah Chen",
      avatar: "SC",
      email: "sarah.chen@university.edu",
    },
    status: "open",
    branch: "feature/methodology-section",
    target: "main",
    commits: 8,
    additions: 456,
    deletions: 23,
    createdAt: "3 days ago",
    updatedAt: "2 hours ago",
    reviewers: [
      { name: "Prof. Michael Rodriguez", status: "approved", avatar: "MR" },
      { name: "Dr. Emily Watson", status: "pending", avatar: "EW" },
    ],
  }

  const commits = [
    {
      id: "a1b2c3d",
      message: "Add initial methodology framework",
      author: "Dr. Sarah Chen",
      time: "3 days ago",
      additions: 89,
      deletions: 2,
    },
    {
      id: "e4f5g6h",
      message: "Include data collection procedures",
      author: "Dr. Sarah Chen",
      time: "2 days ago",
      additions: 156,
      deletions: 8,
    },
    {
      id: "i7j8k9l",
      message: "Add statistical analysis methods",
      author: "Dr. Sarah Chen",
      time: "1 day ago",
      additions: 134,
      deletions: 5,
    },
    {
      id: "m0n1o2p",
      message: "Include ethical considerations section",
      author: "Dr. Sarah Chen",
      time: "2 hours ago",
      additions: 77,
      deletions: 8,
    },
  ]

  const filesChanged = [
    {
      name: "sections/methodology.tex",
      status: "added",
      additions: 234,
      deletions: 0,
    },
    {
      name: "sections/introduction.tex",
      status: "modified",
      additions: 45,
      deletions: 12,
    },
    {
      name: "bibliography.bib",
      status: "modified",
      additions: 89,
      deletions: 3,
    },
    {
      name: "main.tex",
      status: "modified",
      additions: 12,
      deletions: 2,
    },
  ]

  const comments = [
    {
      id: 1,
      author: { name: "Prof. Michael Rodriguez", avatar: "MR" },
      content:
        "Great work on the methodology section! The data collection procedures are very thorough. I have a few minor suggestions for the statistical analysis part.",
      time: "1 day ago",
      type: "review",
    },
    {
      id: 2,
      author: { name: "Dr. Sarah Chen", avatar: "SC" },
      content:
        "Thanks for the feedback! I've addressed the statistical analysis concerns and added more details about the power analysis calculations.",
      time: "6 hours ago",
      type: "comment",
    },
  ]

  return (
    <LayoutWrapper>
      <div className="h-full flex flex-col space-y-6 overflow-y-auto">
        {/* PR Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl shadow-purple-500/5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <GitPullRequest className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{pullRequest.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                      {pullRequest.author.avatar}
                    </div>
                    <span>{pullRequest.author.name}</span>
                  </div>
                  <span>•</span>
                  <span>
                    #{pullRequest.id} opened {pullRequest.createdAt}
                  </span>
                  <span>•</span>
                  <span>Updated {pullRequest.updatedAt}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                    Open
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>{pullRequest.branch}</span>
                    <ArrowRight className="w-4 h-4" />
                    <span>{pullRequest.target}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="bg-white/80 border-purple-200/50 text-gray-800 hover:bg-purple-50/50"
              >
                <Eye className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200">
                <GitMerge className="w-4 h-4 mr-2" />
                Merge Pull Request
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/20">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{pullRequest.commits}</div>
              <div className="text-sm text-gray-600">Commits</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">+{pullRequest.additions}</div>
              <div className="text-sm text-gray-600">Additions</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">-{pullRequest.deletions}</div>
              <div className="text-sm text-gray-600">Deletions</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{filesChanged.length}</div>
              <div className="text-sm text-gray-600">Files Changed</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg shadow-purple-500/5">
              <h3 className="font-semibold text-gray-900 mb-4">Description</h3>
              <div className="prose prose-sm text-gray-700 whitespace-pre-line">{pullRequest.description}</div>
            </div>

            {/* Files Changed */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg shadow-purple-500/5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Files Changed ({filesChanged.length})
              </h3>
              <div className="space-y-3">
                {filesChanged.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-white/50 to-purple-50/30 rounded-lg border border-white/30"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${file.status === "added"
                            ? "bg-green-500"
                            : file.status === "modified"
                              ? "bg-blue-500"
                              : "bg-red-500"
                          }`}
                      ></div>
                      <span className="font-mono text-sm text-gray-800">{file.name}</span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${file.status === "added"
                            ? "bg-green-100 text-green-700"
                            : file.status === "modified"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {file.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-green-600 flex items-center gap-1">
                        <Plus className="w-3 h-3" />
                        {file.additions}
                      </span>
                      <span className="text-red-600 flex items-center gap-1">
                        <Minus className="w-3 h-3" />
                        {file.deletions}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg shadow-purple-500/5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Discussion ({comments.length})
              </h3>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                      {comment.author.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gradient-to-r from-white/50 to-purple-50/30 rounded-lg p-4 border border-white/30">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900">{comment.author.name}</span>
                          <span className="text-sm text-gray-500">{comment.time}</span>
                          {comment.type === "review" && (
                            <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">
                              Review
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    You
                  </div>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Leave a comment..."
                      className="bg-white/80 border-purple-200/50 focus:border-purple-400 focus:ring-purple-400/20 mb-3"
                    />
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200">
                      Comment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Reviewers */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg shadow-purple-500/5">
              <h3 className="font-semibold text-gray-900 mb-4">Reviewers</h3>
              <div className="space-y-3">
                {pullRequest.reviewers.map((reviewer, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                        {reviewer.avatar}
                      </div>
                      <span className="text-sm text-gray-800">{reviewer.name}</span>
                    </div>
                    <div
                      className={`flex items-center gap-1 ${reviewer.status === "approved" ? "text-green-600" : "text-yellow-600"
                        }`}
                    >
                      {reviewer.status === "approved" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                      <span className="text-xs font-medium capitalize">{reviewer.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commits */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg shadow-purple-500/5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <GitCommit className="w-4 h-4" />
                Commits ({commits.length})
              </h3>
              <div className="space-y-3">
                {commits.map((commit) => (
                  <div
                    key={commit.id}
                    className="p-3 bg-gradient-to-r from-white/50 to-purple-50/30 rounded-lg border border-white/30"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-mono text-xs text-purple-600">{commit.id}</span>
                      <span className="text-xs text-gray-500">{commit.time}</span>
                    </div>
                    <p className="text-sm text-gray-800 mb-2">{commit.message}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span className="text-green-600">+{commit.additions}</span>
                      <span className="text-red-600">-{commit.deletions}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
