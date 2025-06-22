
import os
import time
from openai import OpenAI
from uagents import Agent, Context
from schema import Orchestrator_Response, Versionner_Response, Exporter_Response, Reviewer_Response, Reviewer_Request, Exporter_Request, Orchestrator_Request, Versionner_Request, Error_Response
import json
from globals import read_global_action_map
from dotenv import load_dotenv

load_dotenv()

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
    return chat_completion.output[0].name


@orchestrator.on_rest_post("/rest/post", Orchestrator_Request, Orchestrator_Response)
async def handle_post(ctx: Context, req: Orchestrator_Request) -> Orchestrator_Response:
    result = query_openai_chat(req.request)
    if (result == "exporter"):
        print(req.content, agent_addresses[result])
        await ctx.send(agent_addresses[result], message=Exporter_Request(type=result, content=req.content))
        print(read_global_action_map(result))
        return Orchestrator_Response(
            timestamp=int(time.time()),
            type=result,
            content=Exporter_Response(
                type="exporter", content=read_global_action_map(result)),
            agent_address=ctx.agent.address
        )
    elif (result == "versionner"):
        await ctx.send(agent_addresses[result], message=Versionner_Request(type=result, content=req.content))

        return Orchestrator_Response(
            timestamp=int(time.time()),
            type=result,
            content=Versionner_Response(
                type="versionner", content=read_global_action_map(result)),
            agent_address=ctx.agent.address
        )

    elif (result == "reviewer"):
        await ctx.send(agent_addresses[result], message=Reviewer_Request(type=result, content=req.content))

        return Orchestrator_Response(
            timestamp=int(time.time()),
            type=result,
            content=Reviewer_Response(type="reviewer",
                                      content=read_global_action_map(result)),
            agent_address=ctx.agent.address
        )

    return Orchestrator_Response(
        timestamp=int(time.time()),
        type="error",
        content={Error_Response(
            error="Invalid request type. Please use 'exporter', 'versionner', or 'reviewer'.")},
        agent_address=ctx.agent.address
    )


@orchestrator.on_rest_post("/rest/transaction", Transaction_Request, Transaction_Response)
if __name__ == "__main__":
    orchestrator.run()
