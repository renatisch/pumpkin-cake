# agent schema serializers
def schema_serializer(schema: dict, type: str) -> dict:
    if type == "agent":
        return {
            "id": str(schema["_id"]),
            "name": schema["name"],
            "meta": schema["meta"],
            "locations": schema["locations"],
        }
    elif type == "loader":
        return {
            "id": str(schema["_id"]),
            "name": schema["name"],
            "start": schema["start"],
            "end": schema["end"],
        }
    elif type == "llm":
        return {
            "id": str(schema["_id"]),
            "name": schema["name"],
            "type": schema["type"],
            "description": schema["description"],
            "attributes": schema["attributes"],
            "examples": schema["examples"],
            "many": schema["many"],
        }
    elif type == "text":
        return {
            "name": schema["name"],
            "uri": schema["uri"],
            "content": schema["content"],
        }


def list_schema_serializer(schemas: list, type: str) -> list:
    return [schema_serializer(schema=schema, type=type) for schema in schemas]
