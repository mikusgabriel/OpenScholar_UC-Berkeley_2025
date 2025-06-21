import asyncio
from exporter import exporter as exporter
from versionner import versionner as versionner
from orchestrator import orchestrator as orchestrator


async def main():
    await asyncio.gather(
        exporter.run_async(),
        versionner.run_async(),
        orchestrator.run_async()
    )

if __name__ == "__main__":
    asyncio.run(main())
