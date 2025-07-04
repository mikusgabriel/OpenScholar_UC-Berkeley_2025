


export async function RequestExport(content: string) {
    try {
        console.log("Sending transcript for export:", content);
        const response = await fetch("http://localhost:8000/rest/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                request: "I want my research paper to be exported to latex",
                content: content,
            }),
        });
        if (!response.ok) throw new Error("Failed to send transcript");

        const data: OrchestratorResponse = await response.json();

        console.log("Full response:", data);

        // Type guard checks
        if ("error" in data.content) {
            console.error("Error from orchestrator:", data.content.error);
        } else if ("export_path" in data.content) {
            // If you define more specific props later
            console.log("Exporter response:", data.content.content);
        } else if (data.type === "exporter") {
            // Handle both cases where content might be direct Base64 or nested
            const pdfData = JSON.parse(data.content.content);
            downloadBase64PDF(pdfData.content, "exported.pdf");
        } else if (data.type === "reviewer") {
            const reviewContent = data.content as ReviewerResponse;
            console.log("Review comments:", reviewContent.content);
        } else if (data.type === "versionner") {
            const versionContent = data.content as VersionnerResponse;
            console.log("Versioned content:", versionContent.content);
        } else {
            console.warn("Unknown content type:", data.type);
        }

        console.log(await response.text());
        console.log("Transcript sent successfully");
    } catch (error) {
        console.error("Export failed:", error);
    }
}

// Basic response types
interface ExporterResponse {
    content: string;
}

interface VersionnerResponse {
    content: string;
}

interface ReviewerResponse {
    content: string;
}

interface ErrorResponse {
    error: string;
}

// Union of all content response types
type OrchestratorContent = ExporterResponse | VersionnerResponse | ReviewerResponse | ErrorResponse;

// Full orchestrator response structure
interface OrchestratorResponse {
    timestamp: number;
    type: string;
    content: OrchestratorContent;
    agent_address: string;
}

// Repository and branch types
interface RepositoryBranch {
    name: string;
    commit: {
        sha: string;
        url: string;
    };
    protected: boolean;
}

interface RepositoryInfo {
    id: string;
    name: string;
    full_name: string;
    description: string;
    private: boolean;
    created_at: string;
    updated_at: string;
}

// API functions for repository operations
export async function getRepositoryBranches(repositoryName: string): Promise<RepositoryBranch[]> {
    try {
        const response = await fetch("http://localhost:8000/rest/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                request: "List Branches of repo: " + repositoryName,
                content: {
                    "type": "versionner",
                    "content": "list_branches",
                    "message": "List Branches of repo: " + repositoryName,
                }
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch repository branches");
        }

        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error("Error fetching repository branches:", error);
        return [];
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getRepositoryFiles(repositoryName: string): Promise<Array<any> | null> {
    try {
        console.log("Repository Name: " + repositoryName);
        const response = await fetch("http://localhost:8000/rest/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                request: "List Files of repo: " + repositoryName,
                content: {
                    "type": "versionner",
                    "content": "list_files",
                    "message": "List Files of repo: " + repositoryName
                }
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch repository info");
        }

        const data = await response.json();
        return data.content.content.data.tree;
    } catch (error) {
        console.error("Error fetching repository info:", error);
        return null;
    }
}

export async function getRepositoriesList(): Promise<RepositoryInfo[]> {
    try {
        const response = await fetch("http://localhost:8000/rest/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                request: "list_repositories",
                content: {
                    "type": "versionner",
                    "content": "list_repositories",
                    "message": "List all repositories"
                }
            }),
        });

        console.log(response);
        if (!response.ok) {
            throw new Error("Failed to fetch repositories list");
        }


        const data = await response.json();
        console.log(data);
        // const files = await getRepositoryFiles(data.content.content.data[0].name);
        // console.log(files);
        // const branches = await getRepositoryBranches(data.content.content.data[0].name);

        return data.content.content.data || [];
    } catch (error) {
        console.error("Error fetching repositories list:", error);
        return [];
    }
}

export async function getRepositoryById(repositoryId: string): Promise<RepositoryInfo | null> {
    try {
        // This would typically call your backend API to get repo info by ID
        // For now, returning mock data based on common patterns
        const mockRepositories: Record<string, RepositoryInfo> = {
            "1": {
                id: "1",
                name: "ml-healthcare-research",
                full_name: "testgyaccount/ml-healthcare-research",
                description: "Machine Learning Applications in Healthcare Research",
                private: true,
                created_at: "2024-01-15T10:00:00Z",
                updated_at: "2024-01-20T15:30:00Z"
            },
            "2": {
                id: "2",
                name: "quantum-crypto-study",
                full_name: "testgyaccount/quantum-crypto-study",
                description: "Quantum Computing in Cryptography Study",
                private: true,
                created_at: "2024-01-10T09:00:00Z",
                updated_at: "2024-01-18T14:20:00Z"
            }
        };

        return mockRepositories[repositoryId] || null;
    } catch (error) {
        console.error("Error fetching repository by ID:", error);
        return null;
    }
}

// Improved download function
export function downloadBase64PDF(base64String: string, fileName: string) {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
}

// Papers API functions
export interface Paper {
    id: string;
    title: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    repository: string;
    // branches: string[];
    status: string;
}

export async function getPapersList(): Promise<Paper[]> {
    try {
        // Get real repositories from GitHub
        const repositories = await getRepositoriesList();

        if (repositories.length === 0) {
            // Fallback to mock data if no repositories found
            const mockPapers: Paper[] = [
                {
                    id: "1",
                    title: "Machine Learning Applications in Healthcare",
                    author: "Dr. Sarah Johnson",
                    createdAt: "2024-01-15",
                    updatedAt: "2024-01-20",
                    description: "A comprehensive study on the implementation of ML algorithms in medical diagnosis.",
                    repository: "ml-healthcare-research",
                    // branches: ["main", "feature/data-analysis", "feature/validation"],
                    status: "active"
                },
                {
                    id: "2",
                    title: "Quantum Computing in Cryptography",
                    author: "Prof. Michael Chen",
                    createdAt: "2024-01-10",
                    updatedAt: "2024-01-18",
                    description: "Exploring the impact of quantum computing on current cryptographic methods.",
                    repository: "quantum-crypto-study",
                    // branches: ["main", "feature/quantum-algorithms", "feature/security-analysis"],
                    status: "active"
                }
            ];
            return mockPapers.slice(0, 3);
        }

        // Convert repositories to papers format
        const papers: Paper[] = await Promise.all(
            repositories.slice(0, 3).map(async (repo, index) => {
                // Try to get branches for each repository
                // let branches: string[] = ["main"];
                // try {
                //     // const branchData = await getRepositoryBranches(repo.name);
                //     // branches = branchData.map(b => b.name);
                // // eslint-disable-next-line @typescript-eslint/no-unused-vars
                // } catch (error) {
                //     console.log(`Could not fetch branches for ${repo.name}`);
                // }

                return {
                    id: (index + 1).toString(),
                    title: repo.description || repo.name,
                    author: "Research Author", // GitHub doesn't provide author info in repo list
                    createdAt: new Date(repo.created_at).toLocaleDateString(),
                    updatedAt: new Date(repo.updated_at).toLocaleDateString(),
                    description: repo.description || `Research paper repository: ${repo.name}`,
                    repository: repo.name,
                    // branches: branches,
                    status: repo.private ? "private" : "public"
                };
            })
        );

        return papers;
    } catch (error) {
        console.error("Error fetching papers list:", error);
        return [];
    }
}

export async function getPaperContent(paperTitle: string) {
    try {
        // Get repository files
        const files = await getRepositoryFiles(paperTitle);

        if (!files) {
            console.error("Repository files not found for:", paperTitle);
            return "";
        }

        const file = files[0];
        const url = file.url

        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.raw+json',
                'Authorization': ''
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch content: ${response.status}`);
        }

        const content = await response.text();
        return content;

    } catch (error) {
        console.error("Error fetching paper content:", error);
        return "";
    }
}
