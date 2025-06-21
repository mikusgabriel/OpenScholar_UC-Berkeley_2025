import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GitBranch, GitCommit, GitPullRequest, GitFork, Download, FileText, Plus, Upload } from "lucide-react";
import MarkdownEditor from "@/components/MarkdownEditor";
import LayoutWrapper from "@/components/layout-wrapper";

// Mock API functions - replace with your actual implementations
const CreateRepo = (name: string, description: string) => console.log("Creating repo:", name, description);
const Commit = (message: string, content: string) => console.log("Committing:", message, content);
const CreatePullRequest = (repo: string, title: string, head: string, base: string, description: string) =>
    console.log("Creating PR:", { repo, title, head, base, description });

function App() {
    const [content, setContent] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    async function RequestExport() {
        try {
            const response = await fetch("http://localhost:8000/rest/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    request: "I want my research paper to be exported to latex",
                    content: content,
                }),
            });
            if (!response.ok) throw new Error("Failed to send transcript");
            console.log(await response.text());
            console.log("Transcript sent successfully");
        } catch (error) {
            console.error("Export failed:", error);
        }
    }

    return (
        <LayoutWrapper>

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
                    {/* Editor & Voice Recorder Section */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {/* Editor */}
                    </div>

                    {/* GitHub Actions Panel */}
                    <div className="space-y-6">
                        <Card className="bg-orange-100 border-orange-200">
                            <CardHeader>
                                <CardTitle className="text-gray-800 flex items-center gap-2">Repository Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Input
                                    type="text"
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    placeholder="Commit message or repo name..."
                                    className="bg-white border-orange-200 text-gray-800 placeholder-gray-500"
                                />

                                <div className="space-y-2">
                                    <Button
                                        onClick={() => CreateRepo(message, "Research paper repository")}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create Repository
                                    </Button>

                                    <Button
                                        onClick={() => Commit(message, content)}
                                        variant="outline"
                                        className="w-full bg-white border-orange-200 text-gray-800 hover:bg-orange-50"
                                    >
                                        <GitCommit className="w-4 h-4 mr-2" />
                                        Commit Changes
                                    </Button>
                                </div>

                                <Separator className="bg-orange-200" />

                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        onClick={() => console.log("Pull:", message)}
                                        variant="outline"
                                        size="sm"
                                        className="bg-white border-orange-200 text-gray-800 hover:bg-orange-50"
                                    >
                                        <Download className="w-4 h-4 mr-1" />
                                        Pull
                                    </Button>

                                    <Button
                                        onClick={() => console.log("Create Branch:", message)}
                                        variant="outline"
                                        size="sm"
                                        className="bg-white border-orange-200 text-gray-800 hover:bg-orange-50"
                                    >
                                        <GitBranch className="w-4 h-4 mr-1" />
                                        Branch
                                    </Button>
                                </div>

                                <Button
                                    onClick={() => console.log("Checkout:", message)}
                                    variant="outline"
                                    className="w-full bg-white border-orange-200 text-gray-800 hover:bg-orange-50"
                                >
                                    <GitFork className="w-4 h-4 mr-2" />
                                    Checkout
                                </Button>

                                <Button
                                    onClick={() => CreatePullRequest("first-repo", message, "main", "main", "Description for pull request")}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <GitPullRequest className="w-4 h-4 mr-2" />
                                    Create Pull Request
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Export Section */}
                        <Card className="bg-orange-100 border-orange-200">
                            <CardHeader>
                                <CardTitle className="text-gray-800 flex items-center gap-2">
                                    <Upload className="w-4 h-4" />
                                    Export Options
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={() => RequestExport()}
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                                    disabled={!content.trim()}
                                >
                                    <FileText className="w-4 h-4 mr-2" />
                                    Export to LaTeX
                                </Button>
                                {!content.trim() && <p className="text-xs text-gray-500 mt-2">Add content to enable export</p>}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    )
}

export default App;
