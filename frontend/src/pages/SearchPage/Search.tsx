
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  Snippet, 
  Highlight
} from "react-instantsearch";
import searchClient from "./searchConfig";
import "./Search.css"

const HitView = (props: any) => {
    return (
      <div>
        <h2>
          <Highlight attribute="Feature" hit={props.hit} />
        </h2>
        <Snippet attribute="Summary" hit={props.hit} />
        <p>{props.hit.Release}</p>
        <p>{props.hit.Product}</p>
        <p>{props.hit.Type}</p>
        <p>{props.hit.Tags}</p>
        <p>{props.hit.Deprecations}</p>
      </div>
    );
  };

const SearchPage = () => {
  // elastic search index name passed as env. variable via docker.
  const { REACT_APP_ES_INDEX } = process.env;

  return (
    <InstantSearch indexName={REACT_APP_ES_INDEX} searchClient={searchClient}>
      <SearchBox className="searchBox" />
      <div style={{ display: "flex" }}>
        <RefinementList
          attribute="Release"
          style={{ width: "20%", marginTop: "20px", paddingLeft: "20px" }}
        />
        <Hits
          hitComponent={HitView}
          style={{ width: "100%" }}
          title="Releases"
        />
      </div>
    </InstantSearch>
  );
};

export default SearchPage;
