import { useRef, useState } from "react";
import { Mic, StopCircle } from "lucide-react"

export default function VoiceRecorder({ research_text }: { research_text: string }) {
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const audioChunks = useRef<Blob[]>([]);

    const toggleRecording = async () => {
        if (isRecording) {
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: { noiseSuppression: true, echoCancellation: true },
                });

                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;
                audioChunks.current = [];

                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunks.current.push(event.data);
                    }
                };

                mediaRecorder.onstop = async () => {
                    const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
                    console.log(audioBlob);
                    const transcription = await transcribeAudio(audioBlob);
                    await sendTranscript(transcription);
                };

                mediaRecorder.start();
                setIsRecording(true);
            } catch (err) {
                console.error("Microphone access denied:", err);
            }
        }
    };

    const transcribeAudio = async (blob: Blob): Promise<string> => {
        const formData = new FormData();
        formData.append("file", blob, "audio.webm");
        formData.append("model", "whisper-1");
        console.log(import.meta.env.VITE_REACT_APP_OPENAI_API_KEY);
        const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_OPENAI_API_KEY || "your-api-key-here"}`,
            },
            body: formData,
        });
        console.log("prout");

        if (!response.ok) {
            console.error(await response.text());
            throw new Error("Transcription failed");
        }

        const data = await response.json();
        return data.text;
    };

    const sendTranscript = async (text: string) => {
        console.log(text);

        try {
            const response = await fetch("http://192.168.2.228:8000/rest/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ request: text, content: research_text }),
            });
            if (!response.ok) throw new Error("Failed to send transcript");
            console.log(response.text());
            console.log("Transcript sent successfully");
        } catch (err) {
            console.error("Sending error:", err);
        }
    };

    return (
        <button
            onClick={toggleRecording}
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 text-white rounded-full p-4 shadow-lg z-50 ${isRecording ? "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600" : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                }`}
        >
            {isRecording ? <StopCircle className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
    );
}
