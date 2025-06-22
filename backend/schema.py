from uagents import Model
from typing import Union, Literal
from pydantic import BaseModel


class Exporter_Request(Model):
    type: Literal["exporter"]
    content: str


class Versionner_Request(Model):
    type: Literal["versionner"]
    content: str


class Reviewer_Request(Model):
    type: Literal["reviewer"]
    content: str


class Orchestrator_Request(Model):
    request: str
    content: str


class Exporter_Response(Model):
    type: Literal["exporter"]
    content: str


class Versionner_Response(Model):
    type: Literal["versionner"]
    content: str


class Reviewer_Response(Model):
    type: Literal["reviewer"]
    content: str


class Error_Response(Model):
    type: Literal["error"]
    error: str


class Orchestrator_Response(Model):
    timestamp: int
    type: Literal["exporter", "reviewer", "versionner", "error"]
    content: Union[Exporter_Response, Reviewer_Response,
                   Versionner_Response, Error_Response]
    agent_address: str
