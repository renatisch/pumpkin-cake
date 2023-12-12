from fastapi import APIRouter
from api.models.schemas import (
    Location,
    LLM_Schema,
    Loader_Schema,
    Agent_Schema,
    Update_Schema,
    Schema_Create_Reponse,
    Schema_Delete_Reponse,
    Schema_Update_Reponse,
    Schema_Get_Reponse,
)
from api.config.database import (
    agent_schemas_collection,
    loader_schemas_collection,
    llm_schemas_collection,
)
from api.serializers.schemas_serializer import list_schema_serializer
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from uuid import uuid4


agent_schema_router = APIRouter(
    prefix="/webagent",
    tags=["webagent schemas"],
    responses={
        404: {"description": "Not found"},
        200: {"description": "Success"},
    },
)

loader_schema_router = APIRouter(
    prefix="/loader",
    tags=["loader schemas"],
    responses={
        404: {"description": "Not found"},
        200: {"description": "Success"},
    },
)

llm_schema_router = APIRouter(
    prefix="/llm",
    tags=["llm schemas"],
    responses={
        404: {"description": "Not found"},
        200: {"description": "Success"},
    },
)



# LLM Schemas CRUD implementation
@llm_schema_router.get("/")
async def get_llm_schemas() -> list:
    llm_schemas = list_schema_serializer(
        schemas=llm_schemas_collection.find(), type="llm"
    )
    return llm_schemas


@llm_schema_router.post("/")
async def create_llm_schema(llm_schema: LLM_Schema):
    # converting service.name to lowercase for consistency
    record_exists = llm_schemas_collection.find_one({"name": llm_schema.name.lower()})
    # If record exists, we return a message saying record exists. Otherwise, we create a record
    if record_exists:
        return Schema_Create_Reponse(
            created=False,
            description=f"Schema with name {llm_schema.name} already exists. Please update instead.",
        )
    else:
        llm_schema.name = llm_schema.name.lower()
        llm_schemas_collection.insert_one(llm_schema.model_dump())
        return Schema_Create_Reponse(created=True, description="Schema created")


@llm_schema_router.get("/{id}")
async def get_llm_schema(id: str):
    try:
        llm_schema = llm_schemas_collection.find_one({"_id": ObjectId(id)})
        if llm_schema is None:
            return Schema_Get_Reponse(
                record_found=False, description="Schema not found."
            ).model_dump(include={"record_found", "description"})
        else:
            return Schema_Get_Reponse(record_found=True, data=llm_schema).model_dump(
                include={"data", "record_found"}
            )
    except Exception as e:
        return Schema_Get_Reponse(record_found=False, description=str(e)).model_dump(
            include={"record_found", "description"}
        )


@llm_schema_router.delete("/{id}")
async def delete_llm_schema(id: str):
    try:
        response = llm_schemas_collection.find_one_and_delete({"_id": ObjectId(id)})
        if response is None:
            return {
                "detail": Schema_Delete_Reponse(
                    deleted=False,
                    description="Schema not found",
                )
            }
        else:
            return {
                "detail": Schema_Delete_Reponse(
                    deleted=True,
                    description="Schema deleted",
                )
            }
    except Exception as e:
        return {
            "detail": Schema_Delete_Reponse(
                deleted=False,
                description=str(e),
            )
        }


# Loader Schemas CRUD implementation
@loader_schema_router.get("/")
async def get_loader_schemas() -> list:
    loader_schemas = list_schema_serializer(
        schemas=loader_schemas_collection.find(), type="loader"
    )
    return loader_schemas


@loader_schema_router.post("/")
async def create_loader_schema(loader: Loader_Schema):
    # converting service.name to lowercase for consistency
    record_exists = loader_schemas_collection.find_one({"name": loader.name.lower()})
    # If record exists, we return a message saying record exists. Otherwise, we create a record
    if record_exists:
        return Schema_Create_Reponse(
            created=False,
            description=f"Schema with name {loader.name} already exists. Please update instead.",
        )
    else:
        loader.name = loader.name.lower()
        loader_schemas_collection.insert_one(loader.model_dump())
        return Schema_Create_Reponse(created=True, description="Schema created")


@loader_schema_router.get("/{id}")
async def get_loader_schema(id: str):
    try:
        loader_schema = loader_schemas_collection.find_one({"_id": ObjectId(id)})
        if loader_schema is None:
            return Schema_Get_Reponse(
                record_found=False, description="Schema not found."
            ).model_dump(include={"record_found", "description"})
        else:
            return Schema_Get_Reponse(record_found=True, data=loader_schema).model_dump(
                include={"data", "record_found"}
            )
    except Exception as e:
        return Schema_Get_Reponse(record_found=False, description=str(e)).model_dump(
            include={"record_found", "description"}
        )


@loader_schema_router.delete("/{id}")
async def delete_loader_schema(id: str):
    try:
        response = loader_schemas_collection.find_one_and_delete({"_id": ObjectId(id)})
        if response is None:
            return {
                "detail": Schema_Delete_Reponse(
                    deleted=False,
                    description="Schema not found",
                )
            }
        else:
            return {
                "detail": Schema_Delete_Reponse(
                    deleted=True,
                    description="Schema deleted",
                )
            }
    except Exception as e:
        return {
            "detail": Schema_Delete_Reponse(
                deleted=False,
                description=str(e),
            )
        }


@loader_schema_router.put("/{id}")
async def update_loader_schema(id: str, loader: Loader_Schema):
    try:
        loader.name = loader.name.lower()
        response = loader_schemas_collection.find_and_modify(
            query={"_id": ObjectId(id)}, update=loader.model_dump()
        )
        if response is None:
            return {
                "detail": Schema_Update_Reponse(
                    updated=False,
                    description="Schema not found",
                )
            }
        else:
            return {
                "detail": Schema_Update_Reponse(
                    updated=True,
                    description="Schema updated",
                )
            }
    except Exception as e:
        return {
            "detail": Schema_Update_Reponse(
                updated=False,
                description=str(e),
            )
        }


# Agent Schemas CRUD implementation
@agent_schema_router.get("/")
async def get_agent_schemas() -> list:
    [print(each) for each in agent_schemas_collection.find()]
    schemas = list_schema_serializer(
        schemas=agent_schemas_collection.find(), type="agent"
    )
    return schemas


@agent_schema_router.post("/")
async def create_agent_schema(agent: Agent_Schema):
    # converting service.name to lowercase for consistency
    record_exists = agent_schemas_collection.find_one({"name": agent.name.lower()})
    # If record exists, we return a message saying record exists. Otherwise, we create a record
    if record_exists:
        return Schema_Create_Reponse(
            created=False,
            description=f"Schema with name {agent.name} already exists. Please update instead.",
        )
    else:
        # converting service.name to lowercase for consistency
        agent.name = agent.name.lower()
        schema_model = agent.model_dump()
        # Adding unique ids to locations to search by the id
        for each in schema_model["locations"]:
            each["id"] = str(uuid4())
        agent_schemas_collection.insert_one(schema_model)
        return Schema_Create_Reponse(created=True, description="Schema created")


@agent_schema_router.get("/{id}")
async def get_agent_schema(id: str):
    try:
        agent_schema = agent_schemas_collection.find_one({"_id": ObjectId(id)})
        print(agent_schema)
        if agent_schema is None:
            return Schema_Get_Reponse(
                record_found=False, description="Schema not found."
            ).model_dump(include={"record_found", "description"})
        else:
            return Schema_Get_Reponse(record_found=True, data=agent_schema).model_dump(
                include={"data", "record_found"}
            )
    except Exception as e:
        return Schema_Get_Reponse(record_found=False, description=str(e)).model_dump(
            include={"record_found", "description"}
        )


@agent_schema_router.delete("/{id}")
async def delete_agent_schema(id: str):
    try:
        response = agent_schemas_collection.find_one_and_delete({"_id": ObjectId(id)})
        if response is None:
            return {
                "detail": Schema_Delete_Reponse(
                    deleted=False,
                    description="Schema not found",
                )
            }
        else:
            return {
                "detail": Schema_Delete_Reponse(
                    deleted=True,
                    description="Schema deleted",
                )
            }
    except Exception as e:
        return {
            "detail": Schema_Delete_Reponse(
                deleted=False,
                description=str(e),
            )
        }


@agent_schema_router.put("/{id}")
async def update_agent_schema(id: str, agent: Update_Schema):
    try:
        agent.name = agent.name.lower()
        response = agent_schemas_collection.find_and_modify(
            query={"_id": ObjectId(id)}, update=agent.model_dump()
        )
        if response is None:
            return {
                "detail": Schema_Update_Reponse(
                    updated=False,
                    description="Schema not found",
                )
            }
        else:
            return {
                "detail": Schema_Update_Reponse(
                    updated=True,
                    description="Schema updated",
                )
            }
    except Exception as e:
        return {
            "detail": Schema_Update_Reponse(
                updated=False,
                description=str(e),
            )
        }


@agent_schema_router.post("/{id}/location")
async def add_agent_schema_location(id: str, agent: Location):
    try:
        response = agent_schemas_collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {
                "$push": {
                    "locations": {
                        "url": agent.url,
                        "meta": agent.meta,
                        "id": str(uuid4()),
                    }
                }
            },
            return_document=ReturnDocument.AFTER,
        )
        if response is None:
            return {
                "detail": Schema_Update_Reponse(
                    updated=False,
                    description="Schema not found",
                )
            }
        else:
            return {
                "detail": Schema_Update_Reponse(
                    updated=True,
                    description="Schema updated",
                )
            }
    except Exception as e:
        return {
            "detail": Schema_Update_Reponse(
                updated=False,
                description=str(e),
            )
        }


@agent_schema_router.delete("/{id}/location")
async def delete_agent_schema_location(id: str, location_id: str):
    try:
        response = agent_schemas_collection.find_one_and_update(
            {"_id": ObjectId(id)}, {"$pull": {"locations": {"id": location_id}}}
        )
        print(response)
        if response is None:
            return {
                "detail": Schema_Update_Reponse(
                    updated=False,
                    description="Schema not found",
                )
            }
        else:
            return {
                "detail": Schema_Update_Reponse(
                    updated=True,
                    description="Schema updated",
                )
            }
    except Exception as e:
        return {
            "detail": Schema_Update_Reponse(
                updated=False,
                description=str(e),
            )
        }
