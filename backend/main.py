from fastapi import FastAPI
from api.routers import schemas
from api.config.database import ping_mongo, client
from api.routers import jobs

app = FastAPI()
try:
    ping_mongo()
    print("Pinged your Mongo. You're successfully connected to MongoDB!")
except Exception as e:
    print(e)


@app.get("/")
async def root():
    return {"status": "API is running"}


app.include_router(jobs.job_router, prefix="/jobs")
app.include_router(schemas.agent_schema_router, prefix="/schemas")
app.include_router(schemas.loader_schema_router, prefix="/schemas")
app.include_router(schemas.llm_schema_router, prefix="/schemas")
