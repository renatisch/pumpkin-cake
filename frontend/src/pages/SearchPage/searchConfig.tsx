import Client from "@searchkit/instantsearch-client";
import Searchkit from "searchkit";

// Create a Searchkit client
// This is the configuration for Searchkit, specifying the fields to attributes used for search, facets, etc.
const sk = new Searchkit({
  connection: {
    host: "http://localhost:9200",
    // cloud_id: "my-cloud-id" // if using Elastic Cloud
    // if you're authenticating with username/password
    // https://www.searchkit.co/docs/guides/setup-elasticsearch#connecting-with-usernamepassword
    //auth: {
    //  username: "elastic",
    //  password: "changeme"
    //},
    // if you're authenticating with api key
    // https://www.searchkit.co/docs/guides/setup-elasticsearch#connecting-with-api-key
    // apiKey: "######"
  },
  search_settings: {
    search_attributes: ["Feature", "Summary"],
    result_attributes: [
      "Feature",
      "Summary",
      "Tags",
      "Release",
      "Product",
      "Type",
      "Deprecations",
    ],
    highlight_attributes: ["Feature", "Summary"],
    snippet_attributes: ["Summary", "Release"],
    facet_attributes: [
      { attribute: "Release", field: "Release", type: "string" },
    ],
  },
});

const searchClient = Client(sk);

export default searchClient;
