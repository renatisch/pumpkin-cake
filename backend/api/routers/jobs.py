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

job_router = APIRouter(
    tags=["jobs"],
    responses={
        404: {"description": "Not found"},
        200: {"description": "Success"},
    },
)


# Function placeholder to execute
def get_web_data(agent: JobItem, description: str) -> None:
    print(agent)
    return "hello"


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
        args=(jobItem,),
        kwargs={"description": job_description},
        on_success=report_success,
        on_failure=report_failure,
    )
    qued_job = jobs_queue.enqueue_job(job=job_item)
    qued_job.enqueued_at
    temp_job = JobItem(name="Alteryx", type="fetch", schema_name="Alteryx")
    return temp_job


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
