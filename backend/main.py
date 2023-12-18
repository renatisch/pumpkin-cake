from fastapi import FastAPI
from api.routers import schemas
from api.config.database import ping_mongo, client
from api.routers import jobs, schemas, texts
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://localhost",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    ping_mongo()
    print("Pinged your Mongo. You're successfully connected to MongoDB!")
except Exception as e:
    print(e)


@app.get("/")
async def root():
    return {"status": "API is running!"}


app.include_router(jobs.job_router, prefix="/jobs")
app.include_router(schemas.agent_schema_router, prefix="/schemas")
app.include_router(schemas.loader_schema_router, prefix="/schemas")
app.include_router(schemas.llm_schema_router, prefix="/schemas")
app.include_router(texts.texts_router, prefix="/texts")
