from openai import OpenAI
from uagents import Agent
from schema import Versionner_Request, Branch_Request, Repository_Request
import dotenv
import os
import json
from git_functions import (
    create_github_repo,
    commit_file_to_repo,
    get_commit_history,
    create_new_branch,
    checkout_existing_branch,
    pull_branch_commit,
    list_repository_files,
    list_repository_branches,
    get_repository_info,
    list_pull_requests,
    create_pull_request_func,
    update_pull_request_func,
    fork_repository,
    merge_pull_request_func,
    pull_chain,
)
from globals import write_global_action_map, read_global_action_map

dotenv.load_dotenv()


versionner = Agent("versionner", seed="versionner", port=8001,
                   endpoint="http://localhost:8001/submit")

CHAT_MODEL = "gpt-4.1-nano"
PROMPT_TEMPLATE = """
You are an AI backend automation agent for version control. You have functions you can call that allow you to interact with github, call upon them to satisfy the user's request
Do not include any other text or explanations.
branch is main by default.
IF USER SAYS SOMETHING LIKE: I want to create a pull request for my research paper with description: test-repo  test-repo,THEN USE TOOL pull_chain
YOUR username is testgyaccount

If the user does not specify a branch, use main.
make sure to pass all arguments to the functions you call.
You can use the following functions:
    "create_github_repo"
    "commit_file"
    "get_commit_history"
    "create_branch"
    "checkout_branch"
    "pull"
    "list_files"
    "list_pull_requests"
    "update_pull_request"
    "fork_repo"
    "merge_pull_request"
    "pull_chain"
Here is the user query:
"""

tools = [
    {
        "type": "function",
        "name": "create_github_repo",
        "description": "Create a new GitHub repository.",
        "parameters": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Name of the new repository."
                },
                "description": {
                    "type": "string",
                    "description": "Repository description."
                },
                "private": {
                    "type": "boolean",
                    "description": "Whether the repo is private."
                }
            },
            "required": ["name"]
        }
    },
    {
        "type": "function",
        "name": "commit_file_to_repo",
        "description": "Commit a new file to a GitHub repository.",
        "parameters": {
            "type": "object",
            "properties": {
                "repo": {
                    "type": "string",
                    "description": "Repository name."
                },
                "path": {
                    "type": "string",
                    "description": "Path of the file in the repo."
                },
                "content": {
                    "type": "string",
                    "description": "Content of the file."
                },
                "message": {
                    "type": "string",
                    "description": "Commit message."
                }
            },
            "required": ["repo", "path", "content", "message"]
        }
    },
    {
        "type": "function",
        "name": "get_commit_history",
        "description": "Get the commit history of a repository.",
        "parameters": {
            "type": "object",
            "properties": {
                "repo": {
                    "type": "string",
                    "description": "Repository name."
                }
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
                "repo": {
                    "type": "string",
                    "description": "Repository name."
                },
                "branch": {
                    "type": "string",
                    "description": "New branch name."
                }
            },
            "required": ["repo", "branch"]
        }
    },
    {
        "type": "function",
        "name": "checkout_existing_branch",
        "description": "Get information about an existing branch.",
        "parameters": {
            "type": "object",
            "properties": {
                "repo": {
                    "type": "string",
                    "description": "Repository name."
                },
                "branch": {
                    "type": "string",
                    "description": "Branch name to check out."
                }
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
                "repo": {
                    "type": "string",
                    "description": "Repository name."
                },
                "branch": {
                    "type": "string",
                    "description": "Branch name (default: main)."
                }
            },
            "required": ["repo"]
        }
    },
    {
        "type": "function",
        "name": "list_repository_files",
        "description": "List all files in a repository branch.",
        "parameters": {
            "type": "object",
            "properties": {
                "repo": {
                    "type": "string",
                    "description": "Repository name."
                },
                "branch": {
                    "type": "string",
                    "description": "Branch name (default: main)."
                }
            },
            "required": ["repo"]
        }
    },
    {
        "type": "function",
        "name": "list_pull_requests",
        "description": "List pull requests in a repository.",
        "parameters": {
            "type": "object",
            "properties": {
                "repo": {
                    "type": "string",
                    "description": "Repository name."
                },
                "state": {
                    "type": "string",
                    "description": "State of PRs: open, closed, or all."
                }
            },
            "required": ["repo"]
        }
    },
    {
        "type": "function",
        "name": "update_pull_request_func",
        "description": "Update an existing pull request.",
        "parameters": {
            "type": "object",
            "properties": {
                "repo": {
                    "type": "string",
                    "description": "Repository name."
                },
                "pull_number": {
                    "type": "integer",
                    "description": "Pull request number."
                },
                "title": {
                    "type": "string",
                    "description": "Updated title."
                },
                "body": {
                    "type": "string",
                    "description": "Updated body."
                },
                "state": {
                    "type": "string",
                    "description": "State: open or closed."
                }
            },
            "required": ["repo", "pull_number"]
        }
    },
    {
        "type": "function",
        "name": "fork_repository",
        "description": "Fork a repository from another owner.",
        "parameters": {
            "type": "object",
            "properties": {
                "owner": {
                    "type": "string",
                    "description": "Owner of the repo to fork."
                },
                "repo": {
                    "type": "string",
                    "description": "Name of the repo to fork."
                }
            },
            "required": ["owner", "repo"]
        }
    },
    {
        "type": "function",
        "name": "merge_pull_request_func",
        "description": "Merge a pull request into the base branch.",
        "parameters": {
            "type": "object",
            "properties": {
                "repo": {
                    "type": "string",
                    "description": "Repository name."
                },
                "pull_number": {
                    "type": "integer",
                    "description": "Pull request number."
                },
                "commit_title": {
                    "type": "string",
                    "description": "Title for merge commit."
                },
                "commit_message": {
                    "type": "string",
                    "description": "Message for merge commit."
                },
                "merge_method": {
                    "type": "string",
                    "description": "merge, squash, or rebase."
                }
            },
            "required": ["repo", "pull_number"]
        }
    },
    {
        "type": "function",
        "name": "pull_chain",
        "description": "CREATE A PULL REQUEST FOR A RESEARCH PAPER",
        "parameters": {
            "type": "object",
            "properties": {},
            "required": []
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

function_map = {
    "create_github_repo": create_github_repo,
    "commit_file_to_repo": commit_file_to_repo,
    "get_commit_history": get_commit_history,
    "create_new_branch": create_new_branch,
    "checkout_existing_branch": checkout_existing_branch,
    "pull_branch_commit": pull_branch_commit,
    "list_repository_files": list_repository_files,
    "list_pull_requests": list_pull_requests,
    "create_pull_request_func": create_pull_request_func,
    "update_pulupdate_pull_request_funcl_request": update_pull_request_func,
    "fork_repository": fork_repository,
    "merge_pull_request_func": merge_pull_request_func,
    "pull_chain": pull_chain,
}

@versionner.on_message(model=Versionner_Request)
async def handle_review(ctx, sender: str, msg: Versionner_Request):
    ctx.logger.info(msg.content["type"] + " " + msg.content["content"] + " " + msg.content["message"])
    result = query_openai_chat(msg.content["type"] + " File Content:" + msg.content["content"] + " " + msg.content["message"])
    ctx.logger.info(result)
    function_name = result[0].name
    arguments = json.loads(result[0].arguments)
    ctx.logger.info(function_name)

    if function_name in function_map:
        ctx.logger.info(
            f"Calling function: {function_name} with arguments: {arguments}")
        result = function_map[function_name](**arguments)
        ctx.logger.info(f"Function result: {result}")
        write_global_action_map("versionner", result)
    else:
        ctx.logger.error(
            f"Function {function_name} not found in function_map.")
        write_global_action_map("versionner", {"error": "Function not found"})

@versionner.on_message(model=Branch_Request)
async def handle_branch_request(ctx, sender: str, msg: Branch_Request):
    ctx.logger.info(f"Branch request for repository: {msg.repository_name}")
    result = list_repository_branches(msg.repository_name)
    ctx.logger.info(f"Branch list result: {result}")
    write_global_action_map("versionner", result)

if __name__ == "__main__":
    versionner.run()
