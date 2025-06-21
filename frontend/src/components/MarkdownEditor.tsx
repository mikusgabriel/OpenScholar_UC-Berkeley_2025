import MDEditor from "@uiw/react-md-editor";

export default function MarkdownEditor({
    content,
    setContent,
}: {
    content: string;
    setContent: (value: string) => void;
}) {
    return (
        <MDEditor
            value={content}
            onChange={(value: string) => setContent(value || "")}
        />
    );
}
