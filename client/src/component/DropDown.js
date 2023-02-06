import React from "react";
import "./style.css";

import Select from "react-select";

export default function DropDown(props) {
  const originalStock = props.data[0];
  const enteredWord = props.data[1];
  let sectors = originalStock.map((stocksector) => {
    return stocksector.sector;
  });
  let uniquesector = [...new Set(sectors)];

  const setFilter = (event) => {
    const searchSector = event.value;
    let newFilter;
    if (searchSector === "all" && enteredWord === "") {
      newFilter = originalStock;
    } else if (searchSector === "all" && enteredWord !== "") {
      newFilter = originalStock.filter((value) => {
        return (
          value["symbol"].toLowerCase().includes(enteredWord.toLowerCase()) ||
          value["name"].toLowerCase().includes(enteredWord.toLowerCase())
        );
      });
    } else if (searchSector !== "all" && enteredWord === "") {
      newFilter = originalStock.filter((value) => {
        return value.sector.toLowerCase().includes(searchSector.toLowerCase());
      });
    } else {
      newFilter = originalStock.filter((value) => {
        return (
          (value.symbol.toLowerCase().includes(enteredWord.toLowerCase()) ||
            value.name.toLowerCase().includes(enteredWord.toLowerCase())) &&
          value.sector.toLowerCase().includes(searchSector.toLowerCase())
        );
      });
    }

    props.checkData([newFilter, searchSector]);
  };

  const options = [{ value: "all", label: "All sectors" }];
  uniquesector.map((sector) => {
    options.push({ value: sector, label: sector });
  });

  return (
    <div className="selectSector">
      <Select
        onChange={setFilter}
        placeholder={props.placeholder}
        options={options}
        isSearchable={true}
      />
    </div>
  );
}
