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
