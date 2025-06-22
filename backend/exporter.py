from globals import write_global_action_map, read_global_action_map
from uagents import Agent, Context
from schema import Exporter_Request
import tempfile
import subprocess
import os
import json
import pypandoc

exporter = Agent("exporter", seed="exporter", port=8002,
                 endpoint="http://localhost:8002/submit")


def latex_to_pdf_blob(latex_string):
    project_dir = os.path.dirname(os.path.abspath(
        __file__))  # current script directory
    tex_path = os.path.join(project_dir, "temp.tex")
    pdf_path = os.path.join(project_dir, "temp.pdf")
    begin_doc = r"""\documentclass{article}
\usepackage[utf8]{inputenc}
\usepackage{geometry}
\usepackage{amsmath}
\usepackage{hyperref}
\usepackage{listings}
\geometry{margin=1in}
\usepackage[T1]{fontenc}
\usepackage{lmodern}

\title{Entropic Convergence in Hyperreal AI Systems}
\author{Dr. Eliza Cipher}
\date{June 2025}

\begin{document}
"""
    end_doc = r"\end{document}"
    # Write your LaTeX string to a temp file automatically
    with open(tex_path, "w", encoding="utf-8") as f:
        f.write(begin_doc+latex_string+end_doc)
    pdf_blob = None
    # Run pdflatex to compile the LaTeX to PDF (hidden, no manual file handling)
    subprocess.run(
        ["pdflatex", "-interaction=nonstopmode", tex_path],
        cwd=project_dir,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    with open(pdf_path, "rb") as f:
        pdf_blob = f.read()
        write_global_action_map({"exporter": {"result": pdf_blob}})
        return pdf_blob

    return pdf_blob


def convert_markdown_to_latex(markdown_text: str) -> str:
    latex = pypandoc.convert_text(markdown_text, to='latex', format='md')
    return latex


@exporter.on_message(model=Exporter_Request)
async def handle_review(ctx: Context, sender: str, msg: Exporter_Request):
    ctx.logger.info(
        "Received POST request with content: %s", msg.content)
    latex = convert_markdown_to_latex(msg.content)
    blob = latex_to_pdf_blob(latex)
    ctx.logger.info(
        "Received POST request with datacontent: %s", blob)
    write_global_action_map({"exporter": {"content": blob}})


if __name__ == "__main__":
    exporter.run()
