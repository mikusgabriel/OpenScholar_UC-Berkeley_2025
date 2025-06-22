import requests
import os
import tarfile
import shutil
from globals import write_global_action_map, read_global_action_map
from schema import Reviewer_Request, Versionner_Request
from orchestrator import agent_addresses
from pydantic import BaseModel
from openai import OpenAI
import json
from dotenv import load_dotenv
from uagents import Agent
from supabase import create_client, Client

load_dotenv()

reviewer = Agent(name="reviewer", seed="reviewer", mailbox=True)


def search_arxiv_ids(query, limit=5):
    url = "https://api.semanticscholar.org/graph/v1/paper/search"
    params = {
        "query": query,
        "limit": limit * 2,  # over-fetch to ensure enough arXiv results
        "fields": "title,authors,year,abstract,url,externalIds"
    }

    response = requests.get(url, params=params)
    if response.status_code != 200:
        print(f"Error: {response.status_code} - {response.text}")
        return

    papers = response.json().get("data", [])
    arxiv_papers = []

    for paper in papers:
        external_ids = paper.get("externalIds", {})
        arxiv_id = external_ids.get("ArXiv")
        if arxiv_id:
            arxiv_papers.append({
                "title": paper["title"],
                "year": paper["year"],
                "authors": [a["name"] for a in paper["authors"]],
                "abstract": paper.get("abstract", "N/A"),
                "arxiv_id": arxiv_id,
                "arxiv_url": f"https://arxiv.org/abs/{arxiv_id}"
            })
        if len(arxiv_papers) >= limit:
            break
    print(arxiv_papers)
    return arxiv_papers


def download_and_extract_arxiv_source(arxiv_id, base_dir="."):
    # Define download URL and headers
    url = f"https://export.arxiv.org/e-print/{arxiv_id}"
    headers = {
        "User-Agent": "YourAppName/1.0 (Contact: your_email@example.com)"
    }

    # File paths
    tar_path = os.path.join(base_dir, f"{arxiv_id}.tar.gz")
    extract_path = os.path.join(base_dir, arxiv_id)

    # Download the .tar.gz
    print(f"Downloading {arxiv_id} source from arXiv...")
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        try:
            with open(tar_path, "wb") as f:
                f.write(response.content)

            os.makedirs(extract_path, exist_ok=True)
            with tarfile.open(tar_path) as tar:
                tar.extractall(path=extract_path)
            os.remove(tar_path)

            print(f"Extracted to {extract_path} and cleaned up.")

        except (tarfile.TarError, OSError) as e:
            print(f"Could not extract source for {arxiv_id}: {e}")
            if os.path.exists(tar_path):
                os.remove(tar_path)
            if os.path.exists(extract_path):
                shutil.rmtree(extract_path)

    else:
        print(
            f"Failed to download. Status {response.status_code}: {response.text}")


def extract_info(arxiv_id, base_dir="."):
    folder_path = os.path.join(base_dir, arxiv_id)

    if not os.path.exists(folder_path):
        print(f"❌ Folder '{folder_path}' does not exist.")
        return []
    info = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:

            if file.endswith(".tex"):
                fpath = os.path.join(root, file)
                print(f"Extracting: {fpath}")
                with open(fpath) as f:
                    file_text = f.read()
                extracted_info = information_extraction(file_text)
                extracted_info["path"] = fpath
                info.append(extracted_info)

    return info


def information_extraction(file_text):

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    prompt = (
        "You are an AI agent tasked with evaluating whether a research paper contains information "
        "relevant for comparing it with other studies.\n"
        "- Always respond with:\n"
        "  1. `true` or `false` (is the paper relevant for comparison?)\n"
        "  2. A one-line Information Title (brief summary of what the paper is about)\n"
        "  3. Relevant Details – key data, stats, or methods useful for comparison, be detailed in what is in the file and the info, if any\n"
        "- If the result is `false`, still fill out the title and include minimal relevant detail explaining why it's not useful.\n\n"
        "- If its latex formatting or figures, also mention \n"
        "Ignore appendices and supplementary materials — focus only on the abstract, introduction, methods, results, and discussion. Figures are not relevant in this part of the project. \n\n"
        "Your output will be used to benchmark and compare future papers."
        "info_type should be like, graph, abstract, etc or whole paper if file isnt a partial section of the paper"
    )

    class TexFileAnalysis(BaseModel):
        info_type: str
        relevant: bool
        relevant_info: str

    response = client.responses.parse(
        model="gpt-4.1-mini",
        input=[
            {"role": "system", "content": prompt},
            {
                "role": "user",
                "content": f"Latex dump: {file_text}",
            },
        ],
        text_format=TexFileAnalysis,
    )

    return response.output_parsed.model_dump()


def comparison_result(research_info, info_to_review):

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    prompt = (
        "You are an AI agent that reviews pull requests to open-source scientific research repositories. "
        "Your task is to compare the submitted research (in this PR) with existing scientific papers to determine the following:\n\n"
        "1. **Similarity or correlation** — Does the submission address a similar problem, use related methods, or follow up on any of the cited works?\n"
        "2. **Originality** — Does it appear to introduce new insights, methods, results, or applications beyond existing work?\n"
        "3. **Consistency** — Are there any contradictions, invalidated assumptions, or methodological flaws compared to the literature?\n"
        "4. **Scientific relevance** — Is the submission scientifically meaningful in the context of prior work?\n\n"
        "You are provided with prior paper abstracts or full texts (e.g., from arXiv) and a LaTeX-formatted or Markdown submission. "
        "Be critical but fair. If the submission is redundant or contradicts known literature, explain why. "
        "If it is a clear improvement or original contribution, highlight what sets it apart.\n\n"
        "Return a structured JSON with:\n"
        "- `conflict`: true/false (whether it contradicts existing claims)\n"
        "- `summary`: a brief comment explaining your judgment"
    )

    class Comparison(BaseModel):
        conflict: bool
        summary: str

    response = client.responses.parse(
        model="gpt-4.1",
        input=[
            {"role": "system", "content": prompt},
            {
                "role": "user",
                "content": f"Base info: {research_info}, PR: {info_to_review}",
            },
        ],
        text_format=Comparison,
    )

    return response.output_parsed.model_dump()


def condenser(info_to_condense):

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    prompt = (
        "You are an AI agent that summarizes multiple research comparisons into a single judgment.\n\n"
        "You will receive a list of comparison outputs, each with:\n"
        "- `conflict`: a boolean indicating if the new research contradicts previous work.\n"
        "- `summary`: a paragraph explaining the relationship between the new submission and the prior work.\n\n"
        "Your task is to:\n"
        "1. Return a single final `conflict` value: `true` if **any** comparison shows contradiction, else `false`.\n"
        "2. Return a merged `summary`: synthesize the unique points from all summaries into one cohesive paragraph or two, avoiding redundancy.\n"
        "3. Keep the summary clear, technical, and focused on originality, relevance, and contradiction (if any).\n\n"
        "Input: A list of comparison results.\n"
        "Output: A JSON object with the final `conflict` and a merged `summary`."
    )

    class Condense(BaseModel):
        conflict: bool
        summary: str

    response = client.responses.parse(
        model="gpt-4.1",
        input=[
            {"role": "system", "content": prompt},
            {
                "role": "user",
                "content": f"Collection = {info_to_condense}",
            },
        ],
        text_format=Condense,
    )

    return response.output_parsed.model_dump()


def ultra_condenser(paper_reviews):
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    system_prompt = (
        "You are an expert AI summarizer for peer-reviewed research comparisons.\n"
        "You receive multiple paper comparisons, each with:\n"
        "- `conflict`: true or false\n"
        "- `summary`: a paragraph detailing similarity or contradiction\n\n"
        "Your job is to produce an **ultra-condensed summary**:\n"
        "1. Set `conflict = true` if **any** comparison contains a contradiction.\n"
        "2. Write a **single powerful paragraph** that:\n"
        "   - Highlights contradictions clearly and directly.\n"
        "   - Synthesizes only *original, distinct, or methodological insights*.\n"
        "   - Skips fluff and repetition.\n"
        "   - Prioritizes technical accuracy, contradiction evidence, and novelty gaps.\n"
        "3. Be brutally honest and specific about quality, rigor, and whether it builds on or weakens the field."
        "Relevancy score out of 10, this will determine how much users receive in FET token"
    )

    class UltraCondensedOutput(BaseModel):
        conflict: bool
        summary: str
        relevant_score: int

    summaries = [paper["review"]
                 for paper in paper_reviews if "review" in paper]

    response = client.responses.parse(
        model="gpt-4o",
        input=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"{summaries}"},
        ],
        text_format=UltraCondensedOutput,
    )

    return response.output_parsed.model_dump()

def get_Review(paper_description, pr):
    similar_papers = search_arxiv_ids(paper_description, limit=5)
    info_papers = []
    for papers in similar_papers:
        info_papers.append({
            "arxiv_id": papers["arxiv_id"],
            "title": papers["title"],
            "info": extract_info(papers["arxiv_id"])
        }
        )
    per_section_pr = []

    for papers in info_papers:
        reviews = []
        for sections in papers["info"]:
            if sections["relevant"] == True:

                print(f'Reviewing: {sections["info_type"]}')
                reviews.append(comparison_result(
                    sections["relevant_info"], pr))

        per_section_pr.append({
            "arxiv_id": papers["arxiv_id"],
            "title": papers["title"],
            "comparison": reviews
        })

    per_paper_pr = []

    for papers in per_section_pr:
        if papers["comparison"]:
            per_paper_pr.append({
                "arxiv_id": papers["arxiv_id"],
                "title": papers["title"],
                "review": condenser(papers["comparison"])
            })

    pr = ultra_condenser(per_paper_pr)

    return pr

supabase: Client = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

@reviewer.on_message(model=Reviewer_Request)
async def handle_review_request(ctx, sender: str, msg: Reviewer_Request):
    ctx.logger.info(f"Review request for paper: {msg.paper_description}")
    result = get_Review(msg.paper_description, msg.pr)
    ctx.logger.info(f"Review result: {result}")
    write_global_action_map({"reviewer": result})
    if result["conflict"] != True:
        ctx.send(agent_addresses["versionner"], message=Versionner_Request(type="close", content={"message": "PR CLOSE", "content":"please close the PR", "type":"close"}))

        ctx.send(agent_addresses["transferrer"], message=Transferrer_Request(type="generate_wallet", content={"message": "GENERATE WALLET", "content":"please generate a wallet", "type":"generate_wallet"}))
        key = read_global_action_map("transferrer")

        ctx.send(agent_addresses["transferrer"], message=Transferrer_Request(type="get_self_address", content={"message": "GET SELF ADDRESS", "content":key, "type":"get_self_address"}))
        public = read_global_action_map("transferrer")
        
        try:
            a = read_global_action_map("versionner")
            name = a["user"]["name"]
            user_email = "name@random.com"
            user_query = supabase.schema("public").table("keys_stuff").select("*").eq("username", name).execute()

            if not user_query.data:
                user_data = {
                    "username": name,
                    "public": public,
                    "private": key
                }
                supabase.schema("public").table("keys_stuff").insert(user_data).execute()
                
        except Exception as e:
            ctx.logger.error(f"Error creating user in Supabase: {e}")
        
        return

if __name__ == "__main__":
    reviewer.run()