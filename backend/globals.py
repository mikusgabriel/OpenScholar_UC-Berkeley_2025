import json
import os
import base64

GLOBAL_ACTION_MAP_FILE = "global_action_map.json"

# Initialize map if file doesn't exist
if not os.path.exists(GLOBAL_ACTION_MAP_FILE):
    with open(GLOBAL_ACTION_MAP_FILE, "w") as f:
        json.dump({"exporter": {}, "reviewer": {},
                  "versionner": {}, "transferrer": {}}, f)


def read_global_action_map(agent_type: str):
    with open(GLOBAL_ACTION_MAP_FILE, "r") as f:
        return json.load(f).get(agent_type, {})


def write_global_action_map(agent_type: str, new_data):
    def convert(obj):
        if isinstance(obj, bytes):
            return base64.b64encode(obj).decode("utf-8")
        if isinstance(obj, dict):
            return {k: convert(v) for k, v in obj.items()}
        if isinstance(obj, list):
            return [convert(i) for i in obj]
        return obj

    # Read existing data
    with open(GLOBAL_ACTION_MAP_FILE, "r") as f:
        full_data = json.load(f)

    # Update only the selected agent type
    full_data[agent_type] = convert(new_data)

    # Write updated data back
    with open(GLOBAL_ACTION_MAP_FILE, "w") as f:
        json.dump(full_data, f, indent=2)
