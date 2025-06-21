import json
import os
import base64


GLOBAL_ACTION_MAP_FILE = "global_action_map.json"

# Initialize map if file doesn't exist
if not os.path.exists(GLOBAL_ACTION_MAP_FILE):
    with open(GLOBAL_ACTION_MAP_FILE, "w") as f:
        json.dump({"exporter": {}, "ai_reviewers": {}, "github_agent": {}}, f)


def read_global_action_map():
    with open(GLOBAL_ACTION_MAP_FILE, "r") as f:
        return json.load(f)


def write_global_action_map(data):
    def convert(obj):
        if isinstance(obj, bytes):
            return base64.b64encode(obj).decode("utf-8")
        if isinstance(obj, dict):
            return {k: convert(v) for k, v in obj.items()}
        if isinstance(obj, list):
            return [convert(i) for i in obj]
        return obj

    clean_data = convert(data)
    with open("global_action_map.json", "w") as f:
        json.dump(clean_data, f, indent=2)
