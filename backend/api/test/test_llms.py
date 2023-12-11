from ..models.legacy.llms import generate_llm_schema as legacy_generate_llm_schema
from ..models.llms import generate_llm_schema

from ..models.schemas import LLM_Schema

# The json format of the test llm schema that is expected to generate the same kor.Object 
# as the legacy hardcoded schema generating function
alteryx_notes_schema = {
    'name': 'update',
    'type': 'arbitrary',
    'description': '',
    'attributes': [
        {
            'id': 'Feature',
            'description': 'Name of feature that has been updated.' 
        },
        {
            'id': 'Summary',
            'description': 'Short summary of the update.'
        },
        {
            'id': 'Tags',
            'description': "List of features mentioned inside the text separated by ',' separator."
        },
        {
            'id': 'Deprecations',
            'description': "List of no longer supported features mentioned inside the text separated by ',' separator."
        }                
    ],
    'examples': [
        {
            'input': "We have deprecated these connectors: Dynamics CRM Input and Output, Google Sheets Input and Output, Salesforce Wave Output. For more information, go to Data Sources or visit the Community article.",
            'desired_attributes': [
                {
                    'id': "Feature",
                    'value': "Deprecation of connectors"
                },
                {
                    'id': "Summary",
                    'value': "We have deprecated these connectors: Dynamics CRM Input and Output, Google Sheets Input and Output, Salesforce Wave Output."
                },
                {
                    'id': "Tags",
                    'value': ""
                },
                {
                    'id': "Deprecations",
                    'value': "Dynamics CRM Input and Output, Google Sheets Input and Output, Salesforce Wave Output"
                }
            ]
        },        
        {
            'input': "Alteryx Designer version 2023.1 offers separate GA and FIPS 140-2 capable products. For more information about FIPS, go to the NIST FIPS FAQ page.",
            'desired_attributes': [
                {
                    'id': "Feature",
                    'value': "Alteryx Designer version 2023.1"
                },
                {
                    'id': "Summary",
                    'value': "Alteryx Designer version 2023.1 offers separate GA and FIPS 140-2 capable products."
                },
                {
                    'id': "Tags",
                    'value': "Alteryx Designer"
                },
                {
                    'id': "Deprecations",
                    'value': ""
                }
            ]
        },
        {
            'input': "The 2023.1 release brings Okta authentication support, single sign-on (SSO), for SAP Hana. You can now authenticate to SAP Hana Cloud with Okta accounts from Alteryx Designer.",
            'desired_attributes': [
                {
                    'id': "Feature",
                    'value': "Okta authentication support for SAP Hana"
                },
                {
                    'id': "Summary",
                    'value': "You can now authenticate to SAP Hana Cloud with Okta accounts."
                },
                {
                    'id': "Tags",
                    'value': "Alteryx Designer"
                },
                {
                    'id': "Deprecations",
                    'value': ""
                }
            ]
        },
        {
            'input': "We've made a change to the Alteryx Intelligence Suite (2023.1) installer due to a compiling issue in Build 2023.1.17039. Please download and reinstall the latest Alteryx Intelligence Suite Build 2023.1.0.17033 from the license portal.",
            'desired_attributes': [
                {
                    'id': "Feature",
                    'value': "Alteryx Intelligence Suite"
                },
                {
                    'id': "Summary",
                    'value': "We've made a change to the Alteryx Intelligence Suite (2023.1) installer due to a compiling issue in Build 2023.1.17039."
                },
                {
                    'id': "Tags",
                    'value': "Alteryx Intelligence Suite"
                }
            ]
        },
        {
            'input': "Cloud Execution for Desktop is now available for Designer version 2023.1 (included in the 2023.1.1.200 Patch 1 release). Schedule and run your Designer Desktop-built workflows in the cloud. Cloud Execution for Desktop lets you link your Alteryx Designer Desktop instance to an Alteryx Analytics Cloud Platform (AACP) workspace and then save your desktop-built workflows to the AACP library (which belongs to your AACP workspace). Once saved to the library, you can navigate to AACP and schedule those workflows to run.",
            'desired_attributes': [
                {
                    'id': "Feature",
                    'value': "Cloud Execution for Desktop"
                },
                {
                    'id': "Summary",
                    'value': "Cloud Execution for Desktop is now available for Designer version 2023.1 (included in the 2023.1.1.200 Patch 1 release). Schedule and run your Designer Desktop-built workflows in the cloud. Cloud Execution for Desktop lets you link your Alteryx Designer Desktop instance to an Alteryx Analytics Cloud Platform (AACP) workspace and then save your desktop-built workflows to the AACP library (which belongs to your AACP workspace). Once saved to the library, you can navigate to AACP and schedule those workflows to run."
                },
                {
                    'id': "Tags",
                    'value': "Alteryx Analytics Cloud Platform (AACP)"
                }
            ]
        }
    ],
    'many': False
}


def test_llm_schema_generation():

    '''
        The aim of this test is to ensure that the schema based kor.Object generation 
        creates the same object as the original code
    '''

    legacy_llm_schema = legacy_generate_llm_schema("alteryx_notes")

    test_llm_schema_definition = LLM_Schema(**alteryx_notes_schema)
    test_llm_schema = generate_llm_schema(test_llm_schema_definition)

    # match the structure of the kor.Object 
    # TODO: can this be done in a simpler manner?
    assert(legacy_llm_schema.id == test_llm_schema.id)
    assert(legacy_llm_schema.many == test_llm_schema.many)

    for attr in legacy_llm_schema.attributes:
        match_attr = next(x for x in test_llm_schema.attributes if x.id == attr.id)
        assert(match_attr)
        assert(attr.description == match_attr.description)

    for ex in legacy_llm_schema.examples:
        match_ex = next((x for x in test_llm_schema.examples if x[0] == ex[0]), None)
        assert(match_ex)
        N = len(ex[1])
        assert(len(match_ex[1]) == N)
        for i in range(0,N):
            for k, v in ex[1][i].items():
                assert(k in match_ex[1][i] and match_ex[1][i][k] == ex[1][i][k])    

    
