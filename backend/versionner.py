from uagents import Agent

exporter = Agent("versionner",seed="versionner",port=8001,endpoint="http://localhost:8001/submit")

@exporter.on_message(model={})
async def handle_review(ctx, sender: str, msg):
    print("will have to export text to latex?")
