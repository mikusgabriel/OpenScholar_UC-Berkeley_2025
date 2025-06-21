from uagents import Agent
from schema import Request

exporter = Agent("exporter",seed="exporter",port=8002,endpoint="http://localhost:8002/submit")

@exporter.on_message(model=Request)
async def handle_review(ctx, sender: str, msg):
    print("will have to export text to latex?")

if __name__ == "__main__":
    exporter.run()
