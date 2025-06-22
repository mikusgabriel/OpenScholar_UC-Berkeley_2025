from uagents import Model
from typing import Union, Literal
from pydantic import BaseModel


class Exporter_Request(Model):
    type: Literal["exporter"]
    content:  Union[str, dict, object    ]


class Versionner_Request(Model):
    type: Literal["versionner"]
    content:  Union[str, dict, object    ]


class Reviewer_Request(Model):
    type: Literal["reviewer"]
    content:  Union[str, dict, object    ]


class Orchestrator_Request(Model):
    request: str
    content: Union[str, dict, object    ]


class Exporter_Response(Model):
    type: Literal["exporter"]
    content:  Union[str, dict, object    ]


class Versionner_Response(Model):
    type: Literal["versionner"]
    content:  Union[str, dict, object    ]


class Reviewer_Response(Model):
    type: Literal["reviewer"]
    content:  Union[str, dict, object    ]


class Error_Response(Model):
    type: Literal["error"]
    error:  Union[str, dict, object    ]


class Orchestrator_Response(Model):
    timestamp: int
    type: Literal["exporter", "reviewer", "versionner", "error"]
    content: Union[Exporter_Response, Reviewer_Response,
                   Versionner_Response, Error_Response]
    agent_address: str
