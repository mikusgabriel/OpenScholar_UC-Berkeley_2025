from uagents import Model

class Request(Model):
    text: str
    agent_address: str

class Response(Model):
    timestamp: int
    text: str
    agent_address: str