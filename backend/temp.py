import requests
import json
from typing import List, Dict, Any

def get_repository_branches(repository_name: str) -> List[Dict[str, Any]]:
    """
    Python equivalent of the TypeScript getRepositoryBranches function.
    Makes a POST request to get repository branches from the backend.
    
    Args:
        repository_name (str): Name of the repository to get branches for
        
    Returns:
        List[Dict[str, Any]]: List of branch information dictionaries
    """
    try:
        url = "http://localhost:8000/rest/post"
        
        payload = {
            "request": f"List the branches: {repository_name}",
            "content": {
                "type": "versionner",
                "content": "list_branches",
                "message": f"List the branches: {repository_name}"
            }
        }
        
        headers = {
            "Content-Type": "application/json"
        }
        
        print(f"Sending request to get branches for repository: {repository_name}")
        response = requests.post(url, headers=headers, json=payload)
        
        if not response.ok:
            raise Exception(f"Failed to fetch repository branches. Status: {response.status_code}")
        
        data = response.json()
        branches = data.get('data', [])
        
        print(f"Successfully retrieved {len(branches)} branches")
        return branches
        
    except Exception as error:
        print(f"Error fetching repository branches: {error}")
        return []

# Example usage
if __name__ == "__main__":
    # Test the function with a sample repository name
    repository_name = "bite-bite"
    branches = get_repository_branches(repository_name)
    
    print(f"\nBranches for {repository_name}:")
    for branch in branches:
        print(f"- {branch.get('name', 'Unknown')} (SHA: {branch.get('commit', {}).get('sha', 'Unknown')[:8]})") 