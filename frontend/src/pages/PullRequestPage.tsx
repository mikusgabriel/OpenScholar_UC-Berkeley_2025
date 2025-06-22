import LayoutWrapper from "@/components/layout-wrapper";
import { GitPullRequest, GitMerge, GitCommit, MessageSquare, CheckCircle, Clock, FileText, Plus, Minus, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { getRepositoryBranches } from "@/api/api";
import { useParams, useLocation } from "react-router-dom";

export default function PullRequestPage() {
    const { title } = useParams();
    const location = useLocation();
    const [selectedBranch, setSelectedBranch] = useState("main");
    const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
    const [branches, setBranches] = useState<Array<{ name: string; isDefault: boolean }>>([]);
    const [loading, setLoading] = useState(true);

    // Get content from navigation state
    const paperContent = location.state?.content || "";

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

    // Customize pull request data based on the paper title
    const pullRequest = {
        id: 42,
        title: `AI Review: ${title || "Research Paper"}`,
        description: `This pull request contains AI-generated improvements and suggestions for the research paper "${title || "Research Paper"}".

The AI reviewer has analyzed the content and provided:
- Enhanced methodology sections
- Improved data analysis approaches
- Better formatting and structure
- Additional references and citations
- Grammar and clarity improvements

All changes maintain the original research intent while improving overall quality and readability.`,
        author: {
            name: "AI Reviewer",
            avatar: "AR",
        },
        status: "open",
        branch: "feature/ai-review",
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
                                    <span>#{pullRequest.id} opened {pullRequest.createdAt}</span>
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
                            </div>
                        </div>

                        {/* Branch Dropdown - Moved to the right */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Branch</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
                                    disabled={loading}
                                    className="w-48 flex items-center justify-between px-3 py-2 bg-white/80 border border-purple-200/50 rounded-lg text-sm text-gray-900 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <span>{loading ? "Loading..." : selectedBranch}</span>
                                        {!loading && branches.find((b) => b.name === selectedBranch)?.isDefault && (
                                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">default</span>
                                        )}
                                    </div>
                                    <ChevronDown
                                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isBranchDropdownOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {isBranchDropdownOpen && !loading && (
                                    <div className="absolute z-10 w-48 mt-1 bg-white/95 backdrop-blur-sm border border-purple-200/50 rounded-lg shadow-lg shadow-purple-500/10 overflow-hidden">
                                        {branches.map((branch) => (
                                            <button
                                                key={branch.name}
                                                onClick={() => {
                                                    setSelectedBranch(branch.name);
                                                    setIsBranchDropdownOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-purple-50/50 transition-colors duration-200 ${selectedBranch === branch.name ? "bg-purple-100/50 text-purple-700" : "text-gray-700"
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Main Content Panel */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg shadow-purple-500/5">
                            <h3 className="font-semibold text-gray-900 mb-4">AI Review for: {title || "Research Paper"}</h3>
                            <div className="prose prose-sm text-gray-700 max-w-none">
                                {paperContent ? (
                                    <>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Paper Content</h4>
                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                                            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">{paperContent}</pre>
                                        </div>

                                        <h4 className="text-lg font-semibold text-gray-900 mb-3">AI Review Summary</h4>
                                        <p className="text-gray-600 mb-4">
                                            The AI reviewer has analyzed your research paper and suggested several improvements to enhance clarity,
                                            methodology, and overall quality while maintaining the original research objectives.
                                        </p>

                                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Improvements</h4>
                                        <ul className="space-y-2 text-gray-600">
                                            <li>• <strong>Methodology Enhancement:</strong> Added detailed experimental procedures and statistical analysis methods</li>
                                            <li>• <strong>Data Presentation:</strong> Improved figure and table formatting for better readability</li>
                                            <li>• <strong>Literature Review:</strong> Enhanced citations and references for better academic rigor</li>
                                            <li>• <strong>Language Clarity:</strong> Improved sentence structure and technical terminology</li>
                                            <li>• <strong>Results Analysis:</strong> Strengthened the discussion of findings and their implications</li>
                                        </ul>

                                        <h4 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Review Status</h4>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <span className="text-sm text-gray-600">Pending human review and approval</span>
                                        </div>

                                        <p className="text-sm text-gray-500">
                                            The AI has completed its review and suggestions. Please review the changes and provide feedback
                                            on whether you'd like to accept, modify, or reject any of the proposed improvements.
                                        </p>
                                    </>
                                ) : (
                                    <div className="text-gray-500 text-center py-8">
                                        <p>No paper content available for review.</p>
                                        <p className="text-sm mt-2">Please create a pull request from the editor page.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Comments */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg shadow-purple-500/5">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" />
                                Feedback ({comments.length})
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
                </div>
            </div>
        </LayoutWrapper>
    );
}
