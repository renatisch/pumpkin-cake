from pydantic import BaseModel
from enum import Enum


# Response example models
class Alteryx_LLM_Example_Response_Model(BaseModel):
    input_example: str
    Feature: str
    Summary: str
    Tags: str
    Deprecations: str | None = None


#  LLM schema models
class Type_Enum(str, Enum):
    Text = "Text"
    Integer = "Integer"


class LLM_Attribute(BaseModel):
    id: str
    type: Type_Enum = Type_Enum.Text
    description: str


class LLM_Schema(BaseModel):
    name: str
    type: str
    description: str
    attributes: list[LLM_Attribute]
    examples: list[Alteryx_LLM_Example_Response_Model]
    many: bool


# Loader schema models
class Loader_Schema(BaseModel):
    name: str
    start: str
    end: str


# Agent schema models
class Update_Location(BaseModel):
    id: str
    url: str
    meta: str


class Update_Schema(BaseModel):
    name: str
    meta: str
    locations: list[Update_Location]


class Location(BaseModel):
    url: str
    meta: str


class Agent_Schema(BaseModel):
    name: str
    meta: str
    locations: list[Location]


# Reusable Response Models


class Schema_Delete_Reponse(BaseModel):
    deleted: bool
    description: str


class Schema_Create_Reponse(BaseModel):
    created: bool
    description: str


class Schema_Update_Reponse(BaseModel):
    updated: bool
    description: str


class Schema_Get_Reponse(BaseModel):
    record_found: bool
    data: Update_Schema | Loader_Schema | LLM_Schema | None = None
    description: str | None = None
