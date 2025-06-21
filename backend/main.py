import asyncio
from exporter import exporter as agent1
from versionner import versionner as agent2
from orchestrator import orchestrator as orchestrator

async def main():
    await asyncio.gather(
        agent1.run_async(),
        agent2.run_async(),
        orchestrator.run_async()
    )

if __name__ == "__main__":
    asyncio.run(main())
