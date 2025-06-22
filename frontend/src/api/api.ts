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
            const exportContent = data.content as ExporterResponse;
            if (exportContent) {
                const prout = arrayBufferToBase64(exportContent.content);
                downloadBase64PDF(prout, "converted.pdf");
            }
            console.log("Exported content:", exportContent.content);
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

function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

export function downloadBase64PDF(base64String: string, fileName: string) {
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${base64String}`;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
