export async function RequestExport(content : string) {
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
        console.log(await response.text());
        console.log("Transcript sent successfully");
    } catch (error) {
        console.error("Export failed:", error);
    }
}
