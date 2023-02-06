import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { useHistoryStock } from "../component/ApiHistory";
import { SearchBarBySymbol } from "../component/SearchBarBySymbol";
import SearchEndDate from "../component/SearchEndDate";
import LineChart from "../component/LineChart";
import SearchByStartDate from "../component/SearchByStartDate";
import "../component/style.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "../component/style.css";

export default function History() {
  let params = useParams();
  let symbol = params.symbol;
  let nodata = "Not found";
  let restriction = "access restriction";
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { loading, stock, error } = useHistoryStock(symbol);

  const [sortedStock, setSortedStock] = useState(stock);

  useEffect(() => {
    setSortedStock(stock);
  }, [stock]);

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
    { headerName: "Date", field: "date", filter: true, sortable: true },
    { headerName: "Open", field: "open", filter: true, sortable: true },
    { headerName: "High", field: "high", filter: true, sortable: true },
    { headerName: "Low", field: "low", filter: true, sortable: true },
    { headerName: "Close", field: "close", filter: true, sortable: true },
    { headerName: "Volume", field: "volume", filter: true, sortable: true },
  ];

  //.When start date of hitory, in this function, sort will be sorted, and setted start date will be stored in useState.

  function getStartTime(props) {
    setStartDate(props);

    let settedStartDate = props;
    let data;

    const stockdata = Object.create(stock);
    if (settedStartDate !== "" && endDate !== "") {
      data = stockdata.filter((stock) => {
        return (
          new Date(endDate) >= new Date(stock.date) &&
          new Date(stock.date) >= new Date(settedStartDate)
        );
      });
    } else if (settedStartDate !== "" && endDate === "") {
      data = stockdata.filter(
        (stock) => new Date(stock.date) >= new Date(settedStartDate)
      );
    } else if (settedStartDate === "" && endDate !== "") {
      data = stockdata.filter(
        (stock) => new Date(endDate) >= new Date(stock.date)
      );
    } else {
      data = startDate;
    }
    setSortedStock(data);
  }

  // //When end date of hitory, in this function, sort will be sorted, and setted end date will be stored in useState.

  function getEndTime(props) {
    setEndDate(props);

    let settedEndDate = props;
    let data;

    const stockdata = Object.create(stock);
    if (startDate !== "" && settedEndDate !== "") {
      data = stockdata.filter((stock) => {
        return (
          new Date(settedEndDate) >= new Date(stock.date) &&
          new Date(stock.date) >= new Date(startDate)
        );
      });
    } else if (startDate !== "" && settedEndDate === "") {
      data = stockdata.filter(
        (stock) => new Date(stock.date) >= new Date(startDate)
      );
    } else if (startDate === "" && settedEndDate !== "") {
      data = stockdata.filter(
        (stock) => new Date(settedEndDate) >= new Date(stock.date)
      );
    } else {
      data = startDate;
    }
    setSortedStock(data);
  }

  return (
    <div className="container">
      <div className="wordCenter">
        <h1>History</h1>
      </div>
      <div className="historySearch">
        <SearchBarBySymbol page={"history"} />
      </div>
      {symbol !== undefined &&
      stock !== undefined &&
      stock !== nodata &&
      stock !== restriction &&
      sortedStock !== undefined ? (
        <div>
          <h3 style={{ textAlign: "center" }}>Company symbol: {symbol}</h3>
          <div className="searchBars">
            <SearchByStartDate
              getTime={getStartTime}
              data={[stock, startDate, endDate, "Pick Start Date"]}
            />
            <SearchEndDate
              getTime={getEndTime}
              data={[stock, startDate, endDate, "Pick End Date"]}
            />
            <div style={{ marginTop: "20px" }}>
              <Link to={`/quote/symbol=${symbol}`}>
                <Button color="primary" outline>
                  Go to Quote of {symbol}
                </Button>
              </Link>
            </div>
          </div>

          <div>{sortedStock.length} found result(s)</div>
          <div
            className="ag-theme-balham"
            style={{ height: "300px", width: "95%" }}
          >
            <AgGridReact
              columnDefs={columns}
              rowData={sortedStock}
              pagination={true}
              paginationPageSize={8}
            />
          </div>
          <h4 className="graphPosition">Line Graph</h4>
          <LineChart data={[stock, startDate, endDate]} />
        </div>
      ) : stock === nodata && symbol !== undefined ? (
        <div className="centrePosition">
          <h4>No matched data found.</h4>
          <div>Please enter correct or other symbols</div>
        </div>
      ) : stock === restriction && symbol !== undefined ? (
        <div div className="centrePosition">
          <h4>You cannot serach symbols now because of access restriction.</h4>
          <div>Please wait a little... Then please try again</div>
        </div>
      ) : (
        <div className="centrePosition">
          <h4>You can search stock history by symbol</h4>
        </div>
      )}
      <div className="historyTOStocks" style={{ marginTop: "15px" }}>
        <Link to={`/stocks/`}>
          <Button color="primary" outline>
            Go back to Stocks
          </Button>
        </Link>
      </div>
    </div>
  );
}
