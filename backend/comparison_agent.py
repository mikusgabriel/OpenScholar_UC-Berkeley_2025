import requests
import os
import tarfile
import shutil

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
        print(f"Failed to download. Status {response.status_code}: {response.text}")


def list_tex_files(arxiv_id, base_dir="."):
    folder_path = os.path.join(base_dir, arxiv_id)

    if not os.path.exists(folder_path):
        print(f"❌ Folder '{folder_path}' does not exist.")
        return []

    tex_files = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith(".tex"):
                tex_files.append(os.path.join(root, file))

    print(f"Found {len(tex_files)} .tex file(s) in '{folder_path}'")
    return tex_files


similar_papers = search_arxiv_ids("large language models for healthcare", limit=5)
for papers in similar_papers:
  print(papers["arxiv_id"])
  download_and_extract_arxiv_source(papers["arxiv_id"])


def information_extraction(file_text):
  from openai import OpenAI
  from pydantic import BaseModel

  client = OpenAI(api_key=api_key)


  class TexFileAnalysis(BaseModel):
      info_type: str
      relevant: bool
      relevant_info: str


  response = client.responses.parse(
      model="gpt-4o-2024-08-06",
      input=[
          {"role": "system", "content": "You are an agent which determines if the information in the paper is relevant to a research comparison. If the information is relevant, say true, else false. Determine the information title, and give the detailed relevant info to a comparison such data, stats, methodology."},
          {
              "role": "user",
              "content": f"Latex dump: {file_text}",
          },
      ],
      text_format=TexFileAnalysis,
  )

  return response.output_parsed
