from uagents import Model
from typing import Union


class Exporter_Request(Model):
    content: str


class Versionner_Request(Model):
    content: str


class Reviewer_Request(Model):
    content: str


class Orchestrator_Request(Model):
    request: str
    content: str


class Exporter_Response(Model):
    content: str


class Versionner_Response(Model):
    content: str


class Reviewer_Response(Model):
    content: str

class Error_Response(Model):
    error: str

class Orchestrator_Response(Model):
    timestamp: int
    type: str
    content: Union[Exporter_Response, Reviewer_Response, Versionner_Response, Error_Response]
    agent_address: str
