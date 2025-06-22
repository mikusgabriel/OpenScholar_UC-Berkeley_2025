import { useParams, useLocation, useNavigate } from "react-router-dom";
import LayoutWrapper from "@/components/layout-wrapper";
import { FileText, Calendar, User, GitBranch, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import type { Paper } from "@/api/api";
import { getPaperContent } from "@/api/api";

interface LocationState {
    paper?: Paper;
}

export default function PaperDetailPage() {
    const { title } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { paper: passedPaper } = (location.state as LocationState) || {};

    const [currentPaper, setCurrentPaper] = useState<Paper | null>(passedPaper || null); // empty forsome reason
    const [paperContent, setPaperContent] = useState<string>("");
    const [loading, setLoading] = useState(!passedPaper);
    const [error, setError] = useState<string | null>(null);

    // Fetch paper content when paper is available
    useEffect(() => {
        const fetchContent = async () => {
            if (title) {
                try {
                    console.log("Fetching content for paper:", title);
                    const content = await getPaperContent(title);
                    console.log("Received content:", content);
                    setPaperContent(content);
                    setLoading(false);
                } catch (err) {
                    console.error("Error fetching paper content:", err);
                }
            }
        };

        fetchContent();
    }, [title, paperContent]);

    if (loading) {
        return (
            <LayoutWrapper>
                <div className="h-full flex items-center justify-center">
                    <div className="flex items-center gap-3 text-gray-600">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Loading paper...</span>
                    </div>
                </div>
            </LayoutWrapper>
        );
    }

    if (error) {
        return (
            <LayoutWrapper>
                <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-red-600 mb-2">{error}</div>
                        <Button
                            onClick={() => window.location.href = "/papers"}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white mr-2"
                        >
                            Back to Papers
                        </Button>
                        <Button
                            onClick={() => window.location.reload()}
                            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white"
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            </LayoutWrapper>
        );
    }

    if (!currentPaper) {
        return (
            <LayoutWrapper>
                <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-red-600 mb-2">Paper not found</div>
                        <Button
                            onClick={() => window.location.href = "/papers"}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                        >
                            Back to Papers
                        </Button>
                    </div>
                </div>
            </LayoutWrapper>
        );
    }

    return (
        <LayoutWrapper>
            <div className="h-full flex flex-col space-y-6 overflow-y-auto">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl shadow-purple-500/5">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">{currentPaper.title}</h1>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        <span>{currentPaper.author}</span>
                                    </div>
                                    <span>•</span>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>Created {currentPaper.createdAt}</span>
                                    </div>
                                    <span>•</span>
                                    <span>Updated {currentPaper.updatedAt}</span>
                                </div>
                                <p className="text-gray-700 mb-4">{currentPaper.description}</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <GitBranch className="w-4 h-4 text-gray-600" />
                                        <span className="text-sm text-gray-600">Repository: {currentPaper.repository}</span>
                                    </div>
                                    <Button
                                        onClick={() => window.location.href = `/pull-request`}
                                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
                                    >
                                        View Pull Requests
                                    </Button>
                                    <Button
                                        onClick={() => navigate(`/papers/${currentPaper.title}/edit`, {
                                            state: { content: paperContent }
                                        })}
                                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200"
                                    >
                                        Edit Paper
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Paper Content Section */}
                {paperContent && (
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl shadow-purple-500/5">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Paper Content</h2>
                        <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                                {paperContent}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </LayoutWrapper>
    );
} 