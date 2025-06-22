import LayoutWrapper from "@/components/layout-wrapper";
import { GitPullRequest, GitMerge, GitCommit, MessageSquare, CheckCircle, Clock, FileText, Plus, Minus, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { getRepositoryBranches } from "@/api/api";

export default function PullRequestPage() {
    const [selectedBranch, setSelectedBranch] = useState("main");
    const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
    const [branches, setBranches] = useState<Array<{ name: string; isDefault: boolean }>>([]);
    const [loading, setLoading] = useState(true);

    // Fetch branches from API
    useEffect(() => {
        const fetchBranches = async () => {
            try {
                setLoading(true);
                // Using a mock repository name - in real app this would come from props or URL params
                const branchData = await getRepositoryBranches("ml-healthcare-research");
                const formattedBranches = branchData.map((branch) => ({
                    name: branch.name,
                    isDefault: branch.name === "main",
                }));
                setBranches(formattedBranches);
                if (formattedBranches.length > 0) {
                    setSelectedBranch(formattedBranches[0].name);
                }
            } catch (error) {
                console.error("Error fetching branches:", error);
                // Fallback to mock data
                setBranches([
                    { name: "main", isDefault: true },
                    { name: "feature/methodology-section", isDefault: false },
                    { name: "feature/data-analysis", isDefault: false },
                    { name: "feature/validation", isDefault: false },
                    { name: "bugfix/typo-fixes", isDefault: false },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchBranches();
    }, []);

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
            name: "AI Reviewer",
            avatar: "AR",
        },
        status: "open",
        branch: "feature/methodology-section",
        target: "main",
        commits: 8,
        additions: 456,
        deletions: 23,
        createdAt: "3 days ago",
        updatedAt: "2 hours ago",
        reviewers: [{ name: "AI Reviewer", status: "pending", avatar: "AR" }],
    };

    const commits = [
        {
            id: "a1b2c3d",
            message: "Add initial methodology framework",
            author: "AI Reviewer",
            time: "3 days ago",
            additions: 89,
            deletions: 2,
        },
    ];

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
    ];

    const comments = [
        {
            id: 1,
            author: { name: "Prof. Michael Rodriguez", avatar: "MR" },
            content:
                "Great work on the methodology section! The data collection procedures are very thorough. I have a few minor suggestions for the statistical analysis part.",
            time: "1 day ago",
            type: "review",
        },
    ];

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
                                    <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">Open</div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                        <span>{pullRequest.branch}</span>
                                        <ArrowRight className="w-4 h-4" />
                                        <span>{pullRequest.target}</span>
                                    </div>
                                </div>

                                {/* Branch Dropdown */}
                                <div className="relative mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Branch</label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
                                            disabled={loading}
                                            className="w-full flex items-center justify-between px-3 py-2 bg-white/80 border border-purple-200/50 rounded-lg text-sm text-gray-900 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                <span>{loading ? "Loading branches..." : selectedBranch}</span>
                                                {!loading && branches.find((b) => b.name === selectedBranch)?.isDefault && (
                                                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">default</span>
                                                )}
                                            </div>
                                            <ChevronDown
                                                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                                                    isBranchDropdownOpen ? "rotate-180" : ""
                                                }`}
                                            />
                                        </button>

                                        {isBranchDropdownOpen && !loading && (
                                            <div className="absolute z-10 w-full mt-1 bg-white/95 backdrop-blur-sm border border-purple-200/50 rounded-lg shadow-lg shadow-purple-500/10 overflow-hidden">
                                                {branches.map((branch) => (
                                                    <button
                                                        key={branch.name}
                                                        onClick={() => {
                                                            setSelectedBranch(branch.name);
                                                            setIsBranchDropdownOpen(false);
                                                        }}
                                                        className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-purple-50/50 transition-colors duration-200 ${
                                                            selectedBranch === branch.name ? "bg-purple-100/50 text-purple-700" : "text-gray-700"
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                            <span>{branch.name}</span>
                                                            {branch.isDefault && (
                                                                <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                                                                    default
                                                                </span>
                                                            )}
                                                        </div>
                                                        {selectedBranch === branch.name && <CheckCircle className="w-4 h-4 text-purple-600" />}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
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
                                                className={`w-2 h-2 rounded-full ${
                                                    file.status === "added" ? "bg-green-500" : file.status === "modified" ? "bg-blue-500" : "bg-red-500"
                                                }`}
                                            ></div>
                                            <span className="font-mono text-sm text-gray-800">{file.name}</span>
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-medium ${
                                                    file.status === "added"
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
                                                        <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">Review</span>
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
                                        <div className={`flex items-center gap-1 ${reviewer.status === "approved" ? "text-green-600" : "text-yellow-600"}`}>
                                            {reviewer.status === "approved" ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
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
                                    <div key={commit.id} className="p-3 bg-gradient-to-r from-white/50 to-purple-50/30 rounded-lg border border-white/30">
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
    );
}
