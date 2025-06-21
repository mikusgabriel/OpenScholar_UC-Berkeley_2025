
import time
from uagents import Agent, Context
from schema import Request, Response

agent_addresses = {"exporter": "agent1q053knjgqywahnys5vj4k0w967xxaay7rn7nmmvvxpjlxzdxht8xzemvcyy","versionner" : "agent1q0p929thm82psch2u6xpux4rtvqnxkpt7sd7p4awue3h470lm9sdqm5qyth", "orchestrator":" agent1qtkzseh60dl6pjjlx2ysg49pwfmyj4sjyluaukw4mazv8jfekcyrvyyghsk" }

orchestrator = Agent(name="orchestrator", seed="orchestrator", port=8000,
              endpoint=["http://localhost:8000/submit"])


@orchestrator.on_rest_post("/rest/post", Request, Response)
async def handle_post(ctx: Context, req: Request) -> Response:
    return Response(
        timestamp=int(time.time()),
        text="This is a response to your request '{}'".format(req.text),
        agent_address=ctx.agent_address
    )

if __name__ == "__main__":
    orchestrator.run()
