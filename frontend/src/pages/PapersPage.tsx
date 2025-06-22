import LayoutWrapper from "@/components/layout-wrapper";
import { Calendar, User, GitBranch, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getPapersList } from "@/api/api";
import type { Paper } from "@/api/api";

export default function PapersPage() {
    const [papers, setPapers] = useState<Paper[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const papersData = await getPapersList();
                setPapers(papersData);
            } catch (err) {
                setError("Failed to fetch data");
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <LayoutWrapper>
                <div className="h-full flex items-center justify-center">
                    <div className="flex items-center gap-3 text-gray-600">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Loading papers...</span>
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
                            onClick={() => window.location.reload()}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                        >
                            Try Again
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
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Research Papers</h1>
                        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200">
                            Create New Paper
                        </Button>
                    </div>

                    <div className="grid gap-4">
                        {papers.map((paper) => (
                            <div
                                key={paper.id}
                                className="p-4 bg-gradient-to-r from-white/50 to-purple-50/30 rounded-lg border border-white/30 hover:shadow-lg transition-all duration-200 cursor-pointer"
                                onClick={() => window.location.href = `/papers/${paper.id}`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 mb-2">{paper.title}</h3>
                                        <p className="text-gray-600 text-sm mb-3">{paper.description}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <User className="w-4 h-4" />
                                                <span>{paper.author}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>Updated {paper.updatedAt}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <GitBranch className="w-4 h-4" />
                                                {/* <span>{paper.branches.length} branches</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                                            {paper.status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
