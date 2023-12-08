from redis import Redis
from rq import Queue
from rq.job import Job
from api.config.database import jobs_collection
from api.models.jobs import JobLog

# cache is the name of docker container with mongo_db, therefore docker will resolve the url
redis_conn = Redis(host="cache", port="6379")
jobs_queue = Queue(connection=redis_conn, name="jobs")


def report_success(job: Job, connection, result, *args, **kwargs):
    print("Successful job goes here: ")
    current_job = JobLog(
        job_id=job.id,
        enqued_at=job.enqueued_at,
        started_at=job.started_at,
        is_scheduled=job.is_scheduled,
        completed=True,
        type=job.kwargs["description"],
    )
    jobs_collection.insert_one(current_job.model_dump())
    print("result is here", result)


def report_failure(job, connection, type, value, traceback):
    job_type = job.kwargs["description"]
    current_job = JobLog(
        job_id=job.id,
        enqued_at=job.enqueued_at,
        started_at=job.started_at,
        is_scheduled=job.is_scheduled,
        completed=False,
        type=job_type,
        error=str(value),
    )
    jobs_collection.insert_one(current_job.model_dump())
