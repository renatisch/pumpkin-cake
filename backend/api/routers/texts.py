from fastapi import APIRouter, HTTPException
from api.models.schemas import Schema_Create_Reponse, Schema_Get_Reponse
from api.serializers.schemas_serializer import list_schema_serializer, schema_serializer
from api.config.database import texts_collection
from api.models.texts import TextContent

texts_router = APIRouter(
    tags=["text schemas"],
    responses={
        404: {"description": "Not found"},
        200: {"description": "Success"},
    },
)

def find_text(name: str) -> str:
    text = texts_collection.find_one({"name": name})
    if text is None:
        raise HTTPException(status_code=404, detail=f"Text '{name}' not found")
    return text

# Get all texts
@texts_router.get("/")
async def get_texts() -> list:
    texts = list_schema_serializer(schemas=texts_collection.find(), type="text")
    return texts

# Create a new text
@texts_router.post("/")
async def create_text_content(text: TextContent):
    exists = texts_collection.find_one({"uri": text.uri})
    if exists:
        return Schema_Create_Reponse(
            created=False,
            description=f"Text from uri {text.uri} already exists. Please update instead.",
        )
    else:
        texts_collection.insert_one(text.model_dump())
        return Schema_Create_Reponse(created=True, description="Text created")

# Get a specific text by ID
@texts_router.get("/{name}")
def get_text(name: str):
    text = find_text(name=name)
    return schema_serializer(schema=text, type="text")

# Update a text by ID
@texts_router.put("/{name}")
def update_text(name: str, updated_text: TextContent):
    find_text(name=name)
    texts_collection.update_one({"name": name}, {"$set": updated_text.model_dump()})
    return {"message": "Text updated successfully"}

# Delete a text by ID
@texts_router.delete("/{name}")
def delete_text(name: str):
    find_text(name=name)
    texts_collection.delete_one({"name": name})
    return {"message": f"Text '{name}' deleted successfully"}
