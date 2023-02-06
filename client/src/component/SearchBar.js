import React from "react";
import "./style.css";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import "./style.css";

export default function SearchBar(props) {
  const originalStock = props.data[0];
  const sector = props.data[1];
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    let newFilter;

    if (sector === "all" && searchWord === "") {
      newFilter = originalStock;
    } else if (sector === "all" && searchWord !== "") {
      newFilter = originalStock.filter((value) => {
        return (
          value["symbol"].toLowerCase().includes(searchWord.toLowerCase()) ||
          value["name"].toLowerCase().includes(searchWord.toLowerCase())
        );
      });
    } else if (sector !== "all" && searchWord === "") {
      newFilter = originalStock.filter((value) => {
        return value.sector.toLowerCase().includes(sector.toLowerCase());
      });
    } else {
      newFilter = originalStock.filter((value) => {
        return (
          (value.symbol.toLowerCase().includes(searchWord.toLowerCase()) ||
            value.name.toLowerCase().includes(searchWord.toLowerCase())) &&
          value.sector.toLowerCase().includes(sector.toLowerCase())
        );
      });
    }

    setFilteredData(newFilter);

    props.getRowData([newFilter, searchWord]);
  };

  const deleteWord = () => {
    let newFilter;
    const searchWord = "";
    setWordEntered(searchWord);
    if (sector === "all" && searchWord === "") {
      newFilter = originalStock;
    } else if (sector === "all" && searchWord !== "") {
      newFilter = originalStock.filter((value) => {
        return (
          value["symbol"].toLowerCase().includes(searchWord.toLowerCase()) ||
          value["name"].toLowerCase().includes(searchWord.toLowerCase())
        );
      });
    } else if (sector !== "all" && searchWord === "") {
      newFilter = originalStock.filter((value) => {
        return value.sector.toLowerCase().includes(sector.toLowerCase());
      });
    } else {
      newFilter = originalStock.filter((value) => {
        return (
          (value.symbol.toLowerCase().includes(searchWord.toLowerCase()) ||
            value.name.toLowerCase().includes(searchWord.toLowerCase())) &&
          value.sector.toLowerCase().includes(sector.toLowerCase())
        );
      });
    }
    props.getRowData([newFilter, searchWord]);
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          className="inputSize"
          type="text"
          placeholder={props["placeholder"]}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="clear">
          {wordEntered.length === 0 ? null : (
            <ClearIcon className="clearword" onClick={deleteWord} />
          )}
        </div>
      </div>
    </div>
  );
}
