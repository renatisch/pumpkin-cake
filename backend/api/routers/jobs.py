from api.services.background_jobs import (
    redis_conn,
    jobs_queue,
    report_failure,
    report_success,
)
from api.config.database import jobs_collection
from api.models.jobs import JobLogs, JobItem, API_Delete_Reponse
from fastapi import APIRouter
from rq.job import Job

from api.models.schemas import Agent_Schema
from api.agents.agents import agents_scrapers
from api.config.database import agent_schemas_collection

from bson.objectid import ObjectId
from api.config.database import texts_collection

job_router = APIRouter(
    tags=["jobs"],
    responses={
        404: {"description": "Not found"},
        200: {"description": "Success"},
    },
)


# Function placeholder to execute


async def get_web_data(schema_name: str, description: str) -> None:
    agent_schema = agent_schemas_collection.find_one({"name": schema_name})
    if agent_schema is not None and schema_name in agents_scrapers.keys():
        print(agent_schema)
        for location in agent_schema["locations"]:
            print(location["url"])
            exists = texts_collection.find_one({"uri": location["url"]})
            if not exists:
                await agents_scrapers[agent_schema["name"]](
                    location["url"], location["meta"]
                )
            else:
                print(
                    f"Text from uri {location['url']} already exists. Please update instead."
                )
    else:
        raise Exception(f"Schema {schema_name} has no scraper.")


# JOBS CRUD operations
@job_router.get("/")
async def get_jobs():
    jobs = jobs_collection.find({})
    return JobLogs(jobs=jobs).model_dump(exclude_none=True)


@job_router.post("/")
async def create_job(jobItem: JobItem) -> JobItem:
    if jobItem.type == "fetch":
        job_description = "Getting data from the web."
    elif jobItem.type == "load":
        job_description = "Loading data with a loader."
    job_item = Job.create(
        connection=redis_conn,
        func=get_web_data,
        args=[jobItem.schema_name],
        kwargs={
            "description": job_description,
            "type": jobItem.type,
            "name": jobItem.name,
        },
        on_success=report_success,
        on_failure=report_failure,
    )
    qued_job = jobs_queue.enqueue_job(job=job_item)
    qued_job.enqueued_at
    return jobItem


@job_router.delete("/{id}")
async def delete_job(id: str) -> None:
    try:
        jobs = jobs_collection.delete_one({"job_id": id})
        if jobs.deleted_count == 0:
            return API_Delete_Reponse(
                deleted=False, description=f"Job with {id} not found."
            )
        return API_Delete_Reponse(
            deleted=True, description=f"Job with {id} has been succesffully deleted."
        )
    except Exception as e:
        return API_Delete_Reponse(deleted=False, description=e)


@job_router.delete("/")
async def delete_all_jobs() -> None:
    try:
        jobs = jobs_collection.delete_many(
            {"$or": [{"completed": False}, {"completed": True}]}
        )
        if jobs.deleted_count == 0:
            return API_Delete_Reponse(
                deleted=False, description=f"Jobs were not deleted."
            )
        return API_Delete_Reponse(deleted=True, description=f"All jobs deleted.")
    except Exception as e:
        return API_Delete_Reponse(deleted=False, description=e)
