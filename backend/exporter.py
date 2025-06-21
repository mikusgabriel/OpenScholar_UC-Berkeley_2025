from globals import write_global_action_map, read_global_action_map
from uagents import Agent
from schema import Request
import tempfile
import subprocess
import os
import json

exporter = Agent("exporter", seed="exporter", port=8002,
                 endpoint="http://localhost:8002/submit")


def latex_to_blob(latex: str):
    with tempfile.TemporaryDirectory() as tmpdir:
        tex_path = os.path.join(tmpdir, "document.tex")
        with open(tex_path, "w", encoding="utf-8") as f:
            f.write(latex)

        # Run pdflatex
        result = subprocess.run(
            ["pdflatex", "-interaction=nonstopmode",
                "-output-directory", tmpdir, tex_path],
            stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )

        pdf_path = os.path.join(tmpdir, "document.pdf")
        if not os.path.exists(pdf_path):
            return {
                "error": "PDF generation failed",
                "stdout": result.stdout.decode(),
                "stderr": result.stderr.decode()
            }, 500

        return result


@exporter.on_message(model=Request)
async def handle_review(ctx, sender: str, msg):
    blob = latex_to_blob(msg)
    write_global_action_map({"exporter": {"content": blob}})


if __name__ == "__main__":
    exporter.run()
