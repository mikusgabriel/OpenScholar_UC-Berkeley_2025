import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    GitCommit,
    GitPullRequest,
    FileText,
    Plus,
    Upload,
    Cross,
} from "lucide-react";
import MarkdownEditor from "@/components/MarkdownEditor";
import LayoutWrapper from "@/components/layout-wrapper";
import VoiceRecorder from "@/components/VoiceRecorder";
import { RequestExport } from "@/api/api";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function EditorPage() {
    const { title } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [content, setContent] = useState<string>(location.state?.content || "");
    const [message, setMessage] = useState<string>("");

    const handleGoToPullRequest = () => {
        if (title) {
            navigate(`/papers/${title}/pull-request`, {
                state: { content: content }
            });
        }
    };

    async function RequestAgent(query: string, type: string) {
        let request;
        if (type !== "voice") {
            const dict = {
                export: "I want my research paper to be exported to latex",
                "create pull request":
                    "I want to create a pull request for my research paper with description: ",
                commit:
                    "I want to commit my research paper to the repository with message: ",
                "create repository":
                    "I want to create a repository for my research paper with name: ",
                "close pull request":
                    "I want to close pull request DONT LIST THEM JUST use close",
            };
            request = {
                request: dict[type as keyof typeof dict] + " " + query,
                content: {
                    type: dict[type as keyof typeof dict],
                    content: content,
                    message: message,
                },
            };
        } else {
            request = {
                request: query,
                content: {
                    type: "voice",
                    content: content,
                },
            };
        }
        try {
            const response = await fetch("http://localhost:8000/rest/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request),
            });
            console.log(request);
            if (!response.ok) throw new Error("Failed to send action to server");
            console.log(await response.text());
            console.log("Transcript sent successfully");
        } catch (error) {
            console.error("Export failed:", error);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function RequestAgentFund(type: string, request_content: object) {
        const request = { type: type, content: request_content };
        try {
            const response = await fetch("http://localhost:8000/rest/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request),
            });
            console.log(request);
            if (!response.ok) throw new Error("Failed to send action to server");
            console.log(await response.text());
            console.log("Transcript sent successfully");
        } catch (error) {
            console.error("Export failed:", error);
        }
    }

    async function RequestAgentComplete(price: string) {
        const request = { type: title, content: price };
        try {
            const response = await fetch("http://localhost:8000/rest/post/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request),
            });
            console.log(request);
            if (!response.ok) throw new Error("Failed to send action to server");
            console.log(await response.text());
            console.log("Transcript sent successfully");
        } catch (error) {
            console.error("Export failed:", error);
        }
    }

    return (
        <LayoutWrapper>
            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Editor Section */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-purple-500/5 flex-1 overflow-hidden">
                        <MarkdownEditor content={content} setContent={setContent} />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-80 flex flex-col gap-4 overflow-y-auto rounded-2xl border border-gray-200/50 bg-white/60 backdrop-blur-sm p-3 shadow-md">
                    {/* Repository Actions */}
                    <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg shadow-purple-500/5">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-gray-900 flex items-center gap-2 text-sm font-semibold">
                                Repository Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Input
                                type="text"
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                placeholder="Commit message or repo name..."
                                className="bg-white/80 border-purple-200/50 text-gray-800 placeholder-gray-500 text-sm focus:border-purple-400 focus:ring-purple-400/20"
                            />

                            <div className="space-y-2">
                                <Button
                                    onClick={() => RequestAgent(message, "create repository")}
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xs py-2 shadow-lg hover:shadow-green-500/25 transition-all duration-200"
                                    size="sm"
                                >
                                    <Plus className="w-3 h-3 mr-1" />
                                    Create Repository
                                </Button>

                                <Button
                                    onClick={() => RequestAgent(message, "commit")}
                                    variant="outline"
                                    className="w-full bg-white/80 border-purple-200/50 text-gray-800 hover:bg-purple-50/50 hover:border-purple-300 text-xs py-2 transition-all duration-200"
                                    size="sm"
                                >
                                    <GitCommit className="w-3 h-3 mr-1" />
                                    Commit Changes
                                </Button>

                                <Button
                                    onClick={() => RequestAgent(message, "close pull request")}
                                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xs py-2 shadow-lg hover:shadow-red-500/25 transition-all duration-200"
                                    size="sm"
                                >
                                    <Cross className="w-3 h-3 mr-1" />
                                    Close Pull Request
                                </Button>
                            </div>

                            <Separator className="bg-purple-200/30" />

                            <Button
                                onClick={handleGoToPullRequest}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-xs py-2 shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                                size="sm"
                            >
                                <GitPullRequest className="w-3 h-3 mr-1" />
                                Create Pull Request
                            </Button>

                            <Button
                                onClick={() => RequestAgent(message, "create pull request")}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-xs py-2 shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                                size="sm"
                            >
                                <GitPullRequest className="w-3 h-3 mr-1" />
                                Create Pull Request (Agent)
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Export Section */}
                    <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg shadow-purple-500/5">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-gray-900 flex items-center gap-2 text-sm font-semibold">
                                <Upload className="w-3 h-3" />
                                Export Options
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button
                                onClick={() => RequestExport(content)}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs py-2 shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
                                disabled={!content.trim()}
                                size="sm"
                            >
                                <FileText className="w-3 h-3 mr-1" />
                                Export to LaTeX
                            </Button>
                            {!content.trim() && (
                                <p className="text-xs text-gray-500 mt-2">
                                    Add content to enable export
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="mt-4">
                <VoiceRecorder research_text={content} />
            </div>
        </LayoutWrapper>
    );
}
