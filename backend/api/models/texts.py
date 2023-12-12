from pydantic import BaseModel
from bson.objectid import ObjectId

class TextContent(BaseModel):
    uri: str
    name: str
    content: str

