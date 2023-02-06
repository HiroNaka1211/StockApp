import React from "react";
import { useState, useEffect } from "react";

const API_KEY = ""; //Input your API KEY

async function getStock(props) {
  if (props !== "" && props != undefined) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${props}&apikey=${API_KEY}`;
    let res = await fetch(url);
    let data = await res.json();
    let details = data["Time Series (Daily)"];
    //This is for Limit reached
    if ("Note" in data) {
      return "access restriction";
    } else {
      //This is for the case when the inputted symbol is invalid
      if ("Error Message" in data) {
        return "Not found";
      }
      return Object.keys(details).map((key) => {
        return {
          date: key,
          open: details[key]["1. open"],
          high: details[key]["2. high"],
          low: details[key]["3. low"],
          close: details[key]["4. close"],
          volume: details[key]["5. volume"],
        };
      });
    }
  }
}

export function useHistoryStock(props) {
  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setStock(await getStock(props));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, [props]);

  return { loading, stock, error };
}
