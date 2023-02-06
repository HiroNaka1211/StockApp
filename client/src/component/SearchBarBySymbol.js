import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export function SearchBarBySymbol(props) {
  const [innerSearch, setInnerSearch] = useState("");

  return (
    <div className="searchSymbol">
      <input
        placeholder="Enter company symbol..."
        arial-aria-labelledby="search-button"
        name="search"
        id="search"
        type="search"
        value={innerSearch}
        onChange={(e) => setInnerSearch(e.target.value)}
        style={{ width: 200 }}
      />

      {/*When there are any words in the input box, the URL will be chnaged, that is, the page will change.
      When there is no word in the input box, the page won't change*/}

      {innerSearch !== "" ? (
        <Link to={`/${props.page}/symbol=${innerSearch}`}>
          <button id="search-button" type="button">
            Search
          </button>
        </Link>
      ) : (
        <button id="search-button" type="button">
          Search
        </button>
      )}
    </div>
  );
}
