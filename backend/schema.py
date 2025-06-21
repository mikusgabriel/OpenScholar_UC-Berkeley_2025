from uagents import Model
from pydantic import BaseModel

class Request(BaseModel):
    text: str
    agent_address: str

class Response(BaseModel):
    timestamp: int
    text: str
    agent_address: str
