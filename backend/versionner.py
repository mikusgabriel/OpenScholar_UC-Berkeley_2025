from openai import OpenAI
from uagents import Agent
from schema import Request
import dotenv
import os

dotenv.load_dotenv()


versionner = Agent("versionner",seed="versionner",port=8001,endpoint="http://localhost:8001/submit")

CHAT_MODEL = "gpt-4.1-nano"
PROMPT_TEMPLATE = "You are a good boy"
tools = [{
    "type": "function",
    "name": "get_weather",
    "description": "Get current temperature for a given location.",
    "parameters": {
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "City and country e.g. Bogotá, Colombia"
            }
        },
        "required": [
            "location"
        ],
        "additionalProperties": False
    }
}]
# will have to implement github functions with open ai chat functions?



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
    print("will have to do github versionning")


if __name__ == "__main__":
    print(query_openai_chat("give me the weather please!")[0].name)

    versionner.run()
