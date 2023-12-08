from pydantic import BaseModel
from bson.objectid import ObjectId
from typing import Optional
from enum import Enum
from datetime import datetime


class JobType(str, Enum):
    fetch = "fetch"
    load = "load"


class JobItem(BaseModel):
    name: str
    type: JobType = JobType.fetch
    schema_name: str


class JobLog(BaseModel):
    _id: ObjectId
    job_id: str
    enqued_at: datetime
    started_at: datetime
    ended_at: Optional[datetime] | None = None
    is_scheduled: bool
    type: str
    completed: bool
    error: Optional[str] | None = None


class JobLogs(BaseModel):
    jobs: list[JobLog]


class API_Delete_Reponse(BaseModel):
    deleted: bool
    description: str
