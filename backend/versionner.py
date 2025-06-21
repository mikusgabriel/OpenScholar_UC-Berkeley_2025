from uagents import Agent
from schema import Request

versionner = Agent("versionner",seed="versionner",port=8001,endpoint="http://localhost:8001/submit")

@versionner.on_message(model=Request)
async def handle_review(ctx, sender: str, msg):
    print("will have to do github versionning")


if __name__ == "__main__":
    versionner.run()
