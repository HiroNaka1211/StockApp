import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import "../component/style.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart(props) {
  let originalstockdata = props.data[0];
  let stocks;
  const stockdata = Object.create(originalstockdata);
  stockdata.sort(function (a, b) {
    if (a.date > b.date) return 1;
    if (b.date > a.date) return -1;

    return 0;
  });
  stocks = stockdata;

  if (props.data[1] !== "" && props.data[2] !== "") {
    stocks = stockdata.filter((stock) => {
      return (
        new Date(props.data[2]) >= new Date(stock.date) &&
        new Date(stock.date) >= new Date(props.data[1])
      );
    });
  } else if (props.data[1] !== "" && props.data[2] === "") {
    stocks = stockdata.filter(
      (stock) => new Date(stock.date) >= new Date(props.data[1])
    );
  } else if (props.data[1] === "" && props.data[2] !== "") {
    stocks = stockdata.filter(
      (stock) => new Date(props.data[2]) >= new Date(stock.date)
    );
  } else {
    stocks = stockdata;
  }

  let date = stocks.map((stock) => {
    return stock.date;
  });
  let high = stocks.map((stock) => {
    return stock.high;
  });
  let low = stocks.map((stock) => {
    return stock.low;
  });
  let open = stocks.map((stock) => {
    return stock.open;
  });
  let close = stocks.map((stock) => {
    return stock.close;
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "High and Low chart",
      },
    },
  };

  const labels = date;

  const data = {
    labels,
    datasets: [
      {
        label: "High",
        data: high,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Low",
        data: low,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Open",
        data: open,
        borderColor: "rgba(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.5)",
      },
      {
        label: "Close",
        data: close,
        borderColor: "rgba(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    <div>
      {data.labels.length === 0 ? (
        <h4 className="noLineData">
          Sorry, but there is no matched data for the line chart
        </h4>
      ) : (
        <div className="canvas-container">
          <Line data={data} options={options} responsive={true} />
        </div>
      )}
    </div>
  );
}
