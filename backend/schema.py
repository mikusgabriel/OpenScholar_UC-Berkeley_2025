# schema.py
from uagents import Model


class Request(Model):
    request: str
    content: object | str
    agent_address: str


class Exporter_Response(Model):
    content: str

# to modify


class Versionner_Response(Model):
    content: str


class Reviewer_Response(Model):
    content: str


class Orchestrator_Response(Model):
    timestamp: int
    type: str
    content: Exporter_Response | Reviewer_Response | Versionner_Response
    agent_address: str
