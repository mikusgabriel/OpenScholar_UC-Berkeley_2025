
import time
from uagents import Agent, Context

agent_addresses = {}

agent = Agent(name="Rest API", seed="ABCD", port=8000,
              endpoint=["http://localhost:8000/submit"])


@agent.on_rest_post("/rest/post", Request, Response)
async def handle_post(ctx: Context, req: Request) -> Response:
    return Response(
        timestamp=int(time.time()),
        text="This is a response to your request.",
        agent_address=ctx.agent_address
    )

if __name__ == "__main__":
    agent.run()

