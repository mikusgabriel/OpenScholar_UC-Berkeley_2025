
import os
import time
from openai import OpenAI
from uagents import Agent, Context
from schema import Request, Orchestrator_Response, Versionner_Response, Exporter_Response, Reviewer_Response
import json
from globals import read_global_action_map
agent_addresses = {"exporter": "agent1q053knjgqywahnys5vj4k0w967xxaay7rn7nmmvvxpjlxzdxht8xzemvcyy",
                   "versionner": "agent1q0p929thm82psch2u6xpux4rtvqnxkpt7sd7p4awue3h470lm9sdqm5qyth", "orchestrator": " agent1qtkzseh60dl6pjjlx2ysg49pwfmyj4sjyluaukw4mazv8jfekcyrvyyghsk"}

orchestrator = Agent(name="orchestrator", seed="orchestrator", port=8000,
                     endpoint=["http://localhost:8000/submit"])

CHAT_MODEL = "gpt-4.1-nano"
PROMPT_TEMPLATE = "You are a good boy"

tools = [
    {
        "type": "function",
        "name": "versionner",
        "description": "Control any of the github functions the user would like to use.",
    },
    {
        "type": "function",
        "name": "reviewer",
        "description": "Send your research paper so it can get reviewed by AI Reviewers.",
    },
    {
        "type": "function",
        "name": "exporter",
        "description": "Export the wanted markdown text research paper to latex",
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


@orchestrator.on_rest_post("/rest/post", Request, Orchestrator_Response)
async def handle_post(ctx: Context, req: Request) -> Orchestrator_Response:
    result = query_openai_chat(req)
    if (result == "exporter"):
        await ctx.send(agent_addresses["exporter"], req.content)
        return Orchestrator_Response(
            timestamp=int(time.time()),
            type="exporter",
            content=Exporter_Response(json.dumps(
                read_global_action_map("exporter"))),
            agent_address=ctx.agent_address
        )
    elif (result == "versionner"):
        await ctx.send(agent_addresses["versionner"], req.content)

        return Orchestrator_Response(
            timestamp=int(time.time()),
            type="versionner",
            content=Versionner_Response(json.dumps(
                read_global_action_map("versionner"))),
            agent_address=ctx.agent_address
        )

    elif (result == "reviewer"):
        await ctx.send(agent_addresses["reviewer"], req.content)

        return Orchestrator_Response(
            timestamp=int(time.time()),
            type="reviewer",
            content=Reviewer_Response(
                json.dumps(read_global_action_map("reviewer"))
            ),
            agent_address=ctx.agent_address
        )

    return Orchestrator_Response(
        timestamp=int(time.time()),
        type="error",
        content={},
        agent_address=ctx.agent_address
    )

if __name__ == "__main__":
    orchestrator.run()
