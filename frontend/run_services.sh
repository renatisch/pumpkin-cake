# !/bin/bash 
until curl -sS "http://elasticsearchai:9200/_cat/health?h=status" | grep -q "green\|yellow"; do
          sleep 1
        done
            curl -X PUT "http://elasticsearchai:9200/$REACT_APP_ES_INDEX" -H "Content-Type: application/json" -d'
                    {
                    "settings": {
                        "number_of_shards": 1
                    },
                    "mappings": {
                        "properties": {
                            "Feature": { "type": "text" },
                            "Summary": { "type": "text" },
                            "Tags":{ "type": "keyword" },
                            "Release":{ "type": "keyword" },
                            "Product":{ "type": "keyword" },
                            "Type":{ "type": "keyword" },
                            "Deprecations":{ "type": "keyword" }
                        }
                    }
                }' &
             echo "Elastic index $REACT_APP_ES_INDEX has been created."
             npm start