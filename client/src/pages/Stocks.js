import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../component/style.css";
import { Link } from "react-router-dom";
import { useStockInfo } from "../component/Api";
import { useEffect, useState } from "react";
import SearchBar from "../component/SearchBar";
import DropDown from "../component/DropDown";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export default function Stocks() {
  let restriction = "access restriction";
  const { loading, stocks, error } = useStockInfo();
  let [stock, setStock] = useState([]);
  let [searchedByWord, setSearchedByWord] = useState([]);
  let [sector, setSector] = useState("all");
  let [word, setWord] = useState("");
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    setStock(stocks);
    setSearchedByWord(stocks);
  }, [stocks]);

  if (loading) {
    return (
      <div className="container">
        <div className="loadscreen">
          <div className="verticalset">
            <div className="loader"></div>
            <p>Now loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error != null) {
    return <p>{error}</p>;
  }

  const columns = [
    {
      headerName: "Symbol",
      field: "symbol",
      cellRendererFramework: (params) => (
        <div>
          <Link to={`/quote/symbol=${params.data.symbol}`}>
            {params.data.symbol}
          </Link>
        </div>
      ),
      filter: true,
      sortable: true,
    },
    { headerName: "Name", field: "name", filter: true, sortable: true },
    { headerName: "Sector", field: "sector", filter: true, sortable: true },
    {
      headerName: "Head Quarter",
      field: "headQuarter",
      filter: true,
      sortable: true,
    },
    {
      headerName: "Action",
      field: "symbol",
      cellRendererFramework: (params) => (
        <div style={{ textAlign: "center" }}>
          <Link to={`/quote/symbol=${params.data.symbol}`}>
            <button style={{ marginRight: "20px" }}>Quote</button>
          </Link>
          <Link to={`/history/symbol=${params.data.symbol}`}>
            <button>History</button>
          </Link>
        </div>
      ),
    },
  ];

  function getRowData(props) {
    setStock(props[0]);
    setWord(props[1]);
  }

  function checkData(props) {
    setStock(props[0]);
    setSector(props[1]);
  }

  const onSizeChanged = (event) => {
    let element = event.target.value;
    setPageSize(element);
  };

  return (
    <div className="container">
      <h1 className="stockTitle">List of Nasdaq 100 companies</h1>
      <div className="rowbars">
        <SearchBar
          getRowData={getRowData}
          placeholder="Enter company symbol or name..."
          data={[stocks, sector]}
        />
        <span class="dropdownsize">
          <DropDown
            checkData={checkData}
            placeholder="Select a sector to search..."
            data={[stocks, word]}
          />
        </span>
      </div>
      {stock !== restriction && stock.length !== 0 ? (
        <div>
          <div>
            <div style={{ marginBottom: "5px" }}>
              Page Size:
              <select onChange={onSizeChanged}>
                <option value="8" selected={true}>
                  8
                </option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value={stock.length}>{stock.length}</option>
              </select>
            </div>
            <div>{stock.length} found result(s)</div>
            <div
              className="ag-theme-balham"
              style={{ height: "300px", width: "95%" }}
            >
              <AgGridReact
                columnDefs={columns}
                rowData={stock}
                pagination={true}
                paginationPageSize={pageSize}
              />
            </div>
          </div>
          <div style={{ maxWidth: "90%", margin: "15px auto 0 auto" }}>
            Note: If you click <b>symbol name</b> or <b>Quote button</b>, you
            can go to the quote page of the company symbol. If you click{" "}
            <b>History button</b>, you can go to the history page of the company
            symbol, and you can check the history of stock price
          </div>
        </div>
      ) : stock.length === 0 ? (
        <div>
          <h4 className="centrePosition">No stocks could be found</h4>
        </div>
      ) : (
        <div div className="centrePosition">
          <h4>You cannot view stocks now because of access restriction.</h4>
          <div>Please wait one day until the restriction is lifted</div>
        </div>
      )}
    </div>
  );
}
