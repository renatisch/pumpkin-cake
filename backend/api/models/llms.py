from kor.nodes import Object, Text
from kor import create_extraction_chain

from .schemas import LLM_Schema, LLM_Attribute, LLM_Example, LLM_AtributeExample

def generate_llm_attributes(attributes_: list[LLM_Attribute]) -> list:
    return [Text(id=attribute.id, description=attribute.description) for attribute in attributes_]    

def generate_llms_examples(examples: LLM_Example) -> list: 
    result = []
    for ex in examples:
        result.append(
            (
                ex.input,
                [
                    {item.id: item.value for item in ex.desired_attributes}
                ]
            )
        )
    return result

def generate_llm_schema(schema_: LLM_Schema) -> Object:    
    attributes = generate_llm_attributes(schema_.attributes)
    examples = generate_llms_examples(schema_.examples)
    #examples = [(example.text, example.output) for example in schema_['examples']]

    return Object(
        id=schema_.name,
        attributes=attributes,
        examples=examples,
        many=schema_.many
        )