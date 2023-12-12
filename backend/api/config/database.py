from pymongo.mongo_client import MongoClient

# mongo is the name of docker container with mongo_db, therefore docker will resolve the url
URL = "mongo"
PORT = 27017

client = MongoClient(
    host=[str(URL) + ":" + str(PORT)],
    serverSelectionTimeoutMS=3000,
    username="admin",
    password="admin",
)

db = client.fast_db
# schema collections
agent_schemas_collection = db["agent_schemas"]
loader_schemas_collection = db["loader_schemas"]
llm_schemas_collection = db["llm_schemas"]

# jobs
jobs_collection = db["jobs"]

# text data
texts_collection = db["texts"]

def ping_mongo():
    respose = client.db_name.command("ping")
    print(respose)
