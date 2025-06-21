from uagents import Agent

exporter = Agent("exporter")

@exporter.on_message(model={})
async def handle_review(ctx, sender: str, msg):
    print("will have to export text to latex?")
