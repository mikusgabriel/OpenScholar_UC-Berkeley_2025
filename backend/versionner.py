from openai import OpenAI
from uagents import Agent
from schema import Request
import dotenv
import os

dotenv.load_dotenv()


versionner = Agent("versionner", seed="versionner", port=8001,
                   endpoint="http://localhost:8001/submit")

CHAT_MODEL = "gpt-4.1-nano"
PROMPT_TEMPLATE = "You are a good boy"
tools = [
    {
        "type": "function",
        "name": "commit_file_to_repo",
        "description": "Commit a file to a GitHub repository. Handles both empty and existing repos.",
        "parameters": {
            "type": "object",
            "properties": {
                "repo": {"type": "string", "description": "Repository name."},
                "path": {"type": "string", "description": "File path in the repo."},
                "content": {"type": "string", "description": "File content as plain text."},
                "message": {"type": "string", "description": "Commit message."}
            },
            "required": ["repo", "path", "content", "message"]
        }
    },
    {
        "type": "function",
        "name": "get_commit_history",
        "description": "Retrieve the commit history for a given GitHub repository.",
        "parameters": {
            "type": "object",
            "properties": {
                "repo": {"type": "string", "description": "Repository name."}
            },
            "required": ["repo"]
        }
    },
    {
        "type": "function",
        "name": "create_new_branch",
        "description": "Create a new branch from the main branch.",
        "parameters": {
            "type": "object",
            "properties": {
                "repo": {"type": "string", "description": "Repository name."},
                "new_branch": {"type": "string", "description": "Name of the new branch."}
            },
            "required": ["repo", "new_branch"]
        }
    },
    {
        "type": "function",
        "name": "checkout_existing_branch",
        "description": "Get information about an existing branch.",
        "parameters": {
            "type": "object",
            "properties": {
                "repo": {"type": "string", "description": "Repository name."},
                "branch": {"type": "string", "description": "Branch name to check out."}
            },
            "required": ["repo", "branch"]
        }
    },
    {
        "type": "function",
        "name": "pull_branch_commit",
        "description": "Get the latest commit from a branch.",
        "parameters": {
            "type": "object",
            "properties": {
                "repo": {"type": "string", "description": "Repository name."},
                "branch": {"type": "string", "description": "Branch name."}
            },
            "required": ["repo", "branch"]
        }
    },
    {
        "type": "function",
        "name": "list_repository_files",
        "description": "List all files in a repository branch recursively.",
        "parameters": {
            "type": "object",
            "properties": {
                "repo": {"type": "string", "description": "Repository name."},
                "branch": {"type": "string", "description": "Branch name. Default is 'main'."}
            },
            "required": ["repo"]
        }
    },
    {
        "type": "function",
        "name": "list_pull_requests",
        "description": "List pull requests for a repository.",
        "parameters": {
            "type": "object",
            "properties": {
                "repo": {"type": "string", "description": "Repository name."},
                "state": {"type": "string", "description": "Pull request state: open, closed, or all."}
            },
            "required": ["repo"]
        }
    },
    {
        "type": "function",
        "name": "create_pull_request_func",
        "description": "Create a new pull request.",
        "parameters": {
            "type": "object",
            "properties": {
                "repo": {"type": "string", "description": "Repository name."},
                "title": {"type": "string", "description": "Title of the PR."},
                "head": {"type": "string", "description": "Branch with your changes."},
                "base": {"type": "string", "description": "Branch to merge into."},
                "body": {"type": "string", "description": "Description of the PR."}
            },
            "required": ["repo", "title", "head", "base"]
        }
    },
    {
        "type": "function",
        "name": "update_pull_request_func",
        "description": "Update an existing pull request.",
        "parameters": {
            "type": "object",
            "properties": {
                "repo": {"type": "string", "description": "Repository name."},
                "pull_number": {"type": "integer", "description": "Pull request number."},
                "title": {"type": "string", "description": "Updated title."},
                "body": {"type": "string", "description": "Updated body."},
                "state": {"type": "string", "description": "New state: open or closed."}
            },
            "required": ["repo", "pull_number", "title", "body", "state"]
        }
    },
    {
        "type": "function",
        "name": "fork_repository",
        "description": "Fork a public repository into your account.",
        "parameters": {
            "type": "object",
            "properties": {
                "owner": {"type": "string", "description": "Owner of the original repo."},
                "repo": {"type": "string", "description": "Repository name."}
            },
            "required": ["owner", "repo"]
        }
    },
    {
        "type": "function",
        "name": "merge_pull_request_func",
        "description": "Merge a pull request using the specified method.",
        "parameters": {
            "type": "object",
            "properties": {
                "repo": {"type": "string", "description": "Repository name."},
                "pull_number": {"type": "integer", "description": "Pull request number."},
                "commit_title": {"type": "string", "description": "Title of the merge commit."},
                "commit_message": {"type": "string", "description": "Commit message content."},
                "merge_method": {"type": "string", "description": "Merge method: merge, squash, or rebase."}
            },
            "required": ["repo", "pull_number"]
        }
    }
]


def query_openai_chat(query: str) -> str:
    client = OpenAI(
        api_key=os.getenv("OPENAI_API_KEY"),
    )

    chat_completion = client.responses.create(
        model=CHAT_MODEL,
        input=[
            {"role": "system", "content": PROMPT_TEMPLATE},
            {"role": "user", "content": query}
        ],
        tools=tools,
    )
    return chat_completion.output


@versionner.on_message(model=Request)
async def handle_review(ctx, sender: str, msg: Request):
    result = query_openai_chat(msg)
    print(result)


if __name__ == "__main__":
    print(query_openai_chat("commit this file")[0].name)

    versionner.run()
