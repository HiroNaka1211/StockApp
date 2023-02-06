import React from "react";
import { useParams } from "react-router-dom";
import { useStock } from "../component/ApiAlpha";
import { SearchBarBySymbol } from "../component/SearchBarBySymbol";
import "../component/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../component/style.css";

import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export default function Quote() {
  let params = useParams();
  let symbol = params.symbol;
  let nodata = "Not found";
  let restriction = "access restriction";

  const { loading, stock, error } = useStock(symbol);

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
      headerName: "Open",
      field: "open",
    },
    {
      headerName: "High",
      field: "high",
    },
    {
      headerName: "Low",
      field: "low",
    },
    {
      headerName: "Close",
      field: "close",
    },
    {
      headerName: "Volume",
      field: "volume",
    },
    {
      headerName: "Price",
      field: "price",
    },
    {
      headerName: "Change",
      field: "change",
    },
    {
      headerName: "Change Percent",
      field: "changePercent",
    },
  ];

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Quote</h1>
      <SearchBarBySymbol page={"quote"} />
      <div>
        {symbol !== undefined &&
        stock !== nodata &&
        stock !== undefined &&
        stock !== restriction ? (
          <div>
            <div className="history">
              <h3 style={{ marginRight: "20px" }}>Company symbol: {symbol} </h3>
              <h5>
                (Latest trading day:
                {stock[0].latestTrading})
              </h5>
            </div>
            <div
              className="ag-theme-balham"
              style={{ height: "120px", width: "90%" }}
            >
              <AgGridReact
                columnDefs={columns}
                rowData={stock}
                pagination={true}
              />
            </div>
            <div className="buttons" style={{ marginTop: "20px" }}>
              <div className="buttonCenter1">
                <Link to={`/stocks/`}>
                  <Button color="primary" outline>
                    Go back to Stock
                  </Button>
                </Link>
              </div>
              <div className="buttonCenter2">
                <Link to={`/history/symbol=${symbol}`}>
                  <Button color="primary" outline>
                    Go to History of {symbol}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : stock === nodata && symbol !== undefined ? (
          <div>
            <div className="centrePosition">
              <h4>No matched data found.</h4>
              <div>Please enter correct or other symbols</div>
            </div>
            <Link to={`/stocks/`}>
              <Button color="primary" outline>
                Go back to Stock
              </Button>
            </Link>
          </div>
        ) : stock === restriction && symbol !== undefined ? (
          <div div className="centrePosition">
            <h4>
              You cannot serach symbols now because of access restriction.
            </h4>
            <div>Please wait a little... Then please try again</div>
          </div>
        ) : (
          <div>
            <div className="centrePosition">
              <h4>You can search stock quote by symbol</h4>
            </div>
            <Link to={`/stocks/`}>
              <Button color="primary" outline>
                Go back to Stocks
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
