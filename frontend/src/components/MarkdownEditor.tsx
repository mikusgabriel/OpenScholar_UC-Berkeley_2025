import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";

export default function MarkdownEditor({
  content,
  setContent,
}: {
  content: string;
  setContent: (value: string) => void;
}) {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Document Editor
        </CardTitle>
        <CardDescription className="text-gray-400">
          Write your research paper content here
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <div data-color-mode="light" className="w-full h-full p-4 overflow-hidden">
          <MDEditor
            value={content}
            onChange={(value) => setContent(value ?? "")}
            height="100%" // Let it stretch
          />
        </div>
      </CardContent>
    </Card>
  );
}
