import requests
import base64
import os
from dotenv import load_dotenv

load_dotenv()

USERNAME = "testgyaccount"
TOKEN = os.getenv("GITHUB_API_TOKEN")
GITHUB_API_URL = "https://api.github.com"

headers = {
    'Authorization': f'token {TOKEN}',
    'Accept': 'application/vnd.github+json'
}

def create_github_repo(name, description="", private=True):
    url = f'{GITHUB_API_URL}/user/repos'
    payload = {
        "name": name,
        "description": description,
        "private": private
    }
    resp = requests.post(url, headers=headers, json=payload)
    return {"status_code": resp.status_code, "data": resp.json()}

def commit_file_to_repo(repo, path, content, message, branch="main"):
    ref_url = f'{GITHUB_API_URL}/repos/{USERNAME}/{repo}/git/ref/heads/{branch}'
    ref_resp = requests.get(ref_url, headers=headers)
    ref_json = ref_resp.json()

    if ref_resp.status_code == 409 and ref_json.get('message') == 'Git Repository is empty.':
        contents_url = f'{GITHUB_API_URL}/repos/{USERNAME}/{repo}/contents/{path}'
        contents_data = {
            "message": message,
            "content": base64.b64encode(content.encode("utf-8")).decode("utf-8"),
            "branch": "main"
        }
        resp = requests.put(contents_url, headers=headers, json=contents_data)
        return {"status_code": resp.status_code, "data": resp.json()}

    latest_commit_sha = ref_json['object']['sha']
    commit_data = requests.get(
        f'{GITHUB_API_URL}/repos/{USERNAME}/{repo}/git/commits/{latest_commit_sha}', headers=headers).json()
    tree_sha = commit_data['tree']['sha']

    blob = requests.post(
        f'{GITHUB_API_URL}/repos/{USERNAME}/{repo}/git/blobs',
        headers=headers,
        json={"content": content, "encoding": "utf-8"}
    ).json()

    new_tree = requests.post(
        f'{GITHUB_API_URL}/repos/{USERNAME}/{repo}/git/trees',
        headers=headers,
        json={
            "base_tree": tree_sha,
            "tree": [{
                "path": path,
                "mode": "100644",
                "type": "blob",
                "sha": blob['sha']
            }]
        }
    ).json()

    new_commit = requests.post(
        f'{GITHUB_API_URL}/repos/{USERNAME}/{repo}/git/commits',
        headers=headers,
        json={
            "message": message,
            "tree": new_tree['sha'],
            "parents": [latest_commit_sha]
        }
    ).json()

    update_resp = requests.patch(
        f'{GITHUB_API_URL}/repos/{USERNAME}/{repo}/git/refs/heads/{branch}',
        headers=headers,
        json={"sha": new_commit['sha']}
    )

    return {"status_code": update_resp.status_code, "data": update_resp.json()}

def get_commit_history(repo):
    url = f'{GITHUB_API_URL}/repos/{USERNAME}/{repo}/commits'
    resp = requests.get(url, headers=headers)
    return {"status_code": resp.status_code, "data": resp.json()}

def create_new_branch(repo, new_branch):
    ref_url = f'{GITHUB_API_URL}/repos/{USERNAME}/{repo}/git/ref/heads/main'
    ref_resp = requests.get(ref_url, headers=headers)
    if ref_resp.status_code != 200:
        return {"status_code": ref_resp.status_code, "data": ref_resp.json()}
    latest_commit_sha = ref_resp.json()['object']['sha']
    branch_url = f'{GITHUB_API_URL}/repos/{USERNAME}/{repo}/git/refs'
    payload = {
        "ref": f"refs/heads/{new_branch}",
        "sha": latest_commit_sha
    }
    branch_resp = requests.post(branch_url, headers=headers, json=payload)
    return {"status_code": branch_resp.status_code, "data": branch_resp.json()}

def checkout_existing_branch(repo, branch):
    ref_url = f'{GITHUB_API_URL}/repos/{USERNAME}/{repo}/git/ref/heads/{branch}'
    ref_resp = requests.get(ref_url, headers=headers)
    return {"status_code": ref_resp.status_code, "data": ref_resp.json()}

def pull_branch_commit(repo, branch):
    ref_url = f'{GITHUB_API_URL}/repos/{USERNAME}/{repo}/git/ref/heads/{branch}'
    ref_resp = requests.get(ref_url, headers=headers)
    if ref_resp.status_code != 200:
        return {"status_code": ref_resp.status_code, "data": ref_resp.json()}
    latest_commit_sha = ref_resp.json()['object']['sha']
    commit_url = f'{GITHUB_API_URL}/repos/{USERNAME}/{repo}/git/commits/{latest_commit_sha}'
    commit_resp = requests.get(commit_url, headers=headers)
    return {"status_code": commit_resp.status_code, "data": commit_resp.json()}

def list_repository_files(repo, branch="main"):
    url = f"{GITHUB_API_URL}/repos/{USERNAME}/{repo}/git/trees/{branch}?recursive=1"
    resp = requests.get(url, headers=headers)
    return {"status_code": resp.status_code, "data": resp.json()}

def list_repository_branches(repo):
    url = f"{GITHUB_API_URL}/repos/{USERNAME}/{repo}/branches"
    resp = requests.get(url, headers=headers)
    return {"status_code": resp.status_code, "data": resp.json()}

def list_pull_requests(repo, state="open"):
    url = f"{GITHUB_API_URL}/repos/{USERNAME}/{repo}/pulls?state={state}"
    resp = requests.get(url, headers=headers)
    return {"status_code": resp.status_code, "data": resp.json()}

def create_pull_request_func(repo, title, head, base, body):
    url = f"{GITHUB_API_URL}/repos/{USERNAME}/{repo}/pulls"
    payload = {
        "title": title,
        "head": head,
        "base": base,
        "body": body
    }
    resp = requests.post(url, headers=headers, json=payload)
    return {"status_code": resp.status_code, "data": resp.json()}

def update_pull_request_func(repo, pull_number, title, body, state):
    payload = {
        "title": title,
        "body": body,
        "state": state
    }
    url = f"{GITHUB_API_URL}/repos/{USERNAME}/{repo}/pulls/{pull_number}"
    resp = requests.patch(url, headers=headers, json=payload)
    return {"status_code": resp.status_code, "data": resp.json()}

def fork_repository(owner, repo):
    url = f"{GITHUB_API_URL}/repos/{owner}/{repo}/forks"
    resp = requests.post(url, headers=headers)
    return {"status_code": resp.status_code, "data": resp.json()}

def merge_pull_request_func(repo, pull_number, commit_title=None, commit_message=None, merge_method="merge"):
    payload = {
        "merge_method": merge_method
    }
    if commit_title:
        payload["commit_title"] = commit_title
    if commit_message:
        payload["commit_message"] = commit_message
    url = f"{GITHUB_API_URL}/repos/{USERNAME}/{repo}/pulls/{pull_number}/merge"
    resp = requests.put(url, headers=headers, json=payload)
    return {"status_code": resp.status_code, "data": resp.json()}

def pull_chain():
    print(create_new_branch("test-repo", "mybranch"))
    print(checkout_existing_branch("test-repo", "mybranch"))
    print(commit_file_to_repo("test-repo", "changes.txt", "changes ", "changes ", "mybranch"))
    a = create_pull_request_func("test-repo", "test", "mybranch", "main", "test")
    return {"status_code": resp.status_code, "data": a.json()}