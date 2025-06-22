import os
import time
from openai import OpenAI
from uagents import Agent, Context
from schema import Transferer_Request, Transferer_Response, Orchestrator_Response, Versionner_Response, Exporter_Response, Reviewer_Response, Reviewer_Request, Exporter_Request, Orchestrator_Request, Versionner_Request, Error_Response
import json
from globals import read_global_action_map
from dotenv import load_dotenv

load_dotenv()

agent_addresses = {"exporter": "agent1q053knjgqywahnys5vj4k0w967xxaay7rn7nmmvvxpjlxzdxht8xzemvcyy","bank":"agent1qvsyu94yd2efs3ya0yand5cdeef99gjvu8xfg6z7xjjf9pd4fh8m2hh27uc",
                   "versionner": "agent1q0p929thm82psch2u6xpux4rtvqnxkpt7sd7p4awue3h470lm9sdqm5qyth", "orchestrator": " agent1qtkzseh60dl6pjjlx2ysg49pwfmyj4sjyluaukw4mazv8jfekcyrvyyghsk", "transferrer": "agent1qvsyu94yd2efs3ya0yand5cdeef99gjvu8xfg6z7xjjf9pd4fh8m2hh27uc"}

orchestrator = Agent(name="orchestrator", seed="orchestrator", mailbox=True)

print(f"Your agent's address is: {orchestrator.address}")


CHAT_MODEL = "gpt-4.1-nano"
PROMPT_TEMPLATE = "Treat my query as a choice you should only give me a word as response no more like classify if my query is in relationship with github return versionner or if i need review give me reviewer or if i need to export give me exporter NO capital letters exactly these words."

tools = [
    {
        "type": "function",
        "function": {
            "name": "versionner",
            "description": "Control any of the github functions the user would like to use.",
            "parameters": {}
        }
    },
    {
        "type": "function",
        "function": {
            "name": "reviewer",
            "description": "Send your research paper so it can get reviewed by AI Reviewers.",
            "parameters": {}
        }
    },
    {
        "type": "function",
            "function": {
            "name": "exporter",
            "description": "Export the wanted markdown text research paper to latex",
            "parameters": {}
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
    return chat_completion.output[0].name

import requests
def query_asi(query: str) -> str:
    url = "https://api.asi1.ai/v1/chat/completions"
    payload = json.dumps({
        "model": "asi1-mini",
        "messages": [
            {
                "role": "system",
                "content": f"{PROMPT_TEMPLATE}"
            },
            {
                "role": "user",
                "content": f"{query}"
            }
        ],
        "tools": tools,
        "temperature": 0,
        "stream": False,
        "max_tokens": 0
    })
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': f'Bearer {os.getenv("ASI_API_KEY")}'
    }
    response = requests.post(url, headers=headers, data=payload)
    return response.json()

import re

@orchestrator.on_rest_post("/rest/post", Orchestrator_Request, Orchestrator_Response)
async def handle_post(ctx: Context, req: Orchestrator_Request) -> Orchestrator_Response:
    #result = query_openai_chat(req.request)
    #print(result)
    re_asi = query_asi(req.request)
    reg_asi = re_asi["choices"][0]["message"]["content"]
    print(reg_asi)
    # regex to check if the response is a word
    if re.match(r"^[a-zA-Z]+$", reg_asi):
        result = reg_asi
    else:
        return Orchestrator_Response(
            timestamp=int(time.time()),
            type="error",
            content={Error_Response(
                error="Invalid request type. Please use 'exporter', 'versionner', or 'reviewer'.")},
            agent_address=ctx.agent.address
        )
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
        ctx.logger.info(f"Reviewer request sent to {read_global_action_map(result)}")
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


@orchestrator.on_rest_post("/rest/transaction", Transferer_Request, Transferer_Response)
async def handle_post_transaction(ctx: Context, req: Transferer_Request) -> Transferer_Response:
    transferrer = "transferrer"

    await ctx.send(agent_addresses[transferrer], message=Exporter_Request(type=transferrer, content=req.content))
    print(read_global_action_map(transferrer))
    return Orchestrator_Response(
        timestamp=int(time.time()),
        type=transferrer,
        content=Exporter_Response(
            type=transferrer, content=read_global_action_map(transferrer)),
        agent_address=ctx.agent.address
    )

from supabase import create_client, Client
supabase: Client = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

@orchestrator.on_rest_post("/rest/post/complete", Orchestrator_Request, Orchestrator_Response)
async def handle_post_transaction(ctx: Context, req: Orchestrator_Request) -> Orchestrator_Response:
    id = req.type
    price = float(req.content)

    supabasekey = supabase.from_("keys_stuff").select("private").eq("name", id).execute().data[0]["private"]

    am = get_blame_hashmap(id, "main", "research.md")
    for key, value in am.items():
        amount = value * price
        user_query = supabase.schema("public").table("keys_stuff").select("*").eq("username", key).execute()
        if user_query.data:
            ctx.send(agent_addresses["bank"], message=Transferer_Request(type=id, content={price:amount, hex_priv: supabasekey, to_address: user_query}))    

    write_global_action_map("orchestrator", {"status": "sent la moula gars"})
    return Orchestrator_Response(
        timestamp=int(time.time()),
        type=transferrer,
        content=Exporter_Response(
            type=transferrer, content=read_global_action_map(transferrer)),
        agent_address=ctx.agent.address
    )

if __name__ == "__main__":
    orchestrator.run()
