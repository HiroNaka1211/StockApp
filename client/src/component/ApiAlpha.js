import { useState, useEffect } from "react";

const API_KEY = ""; //Input your API KEY

async function getStock(props) {
  if (props !== "" && props != undefined) {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${props}&apikey=${API_KEY}`;

    let res = await fetch(url);
    let data = await res.json();
    let datainfo = data["Global Quote"];
    //This is for Limit reached
    if ("Note" in data) {
      return "access restriction";
    } else {
      //This is for the case when the inputted symbol is invalid
      if (Object.keys(data["Global Quote"]).length === 0) {
        return "Not found";
      }
      return [
        {
          latestTrading: datainfo["07. latest trading day"],
          open: datainfo["02. open"],
          close: datainfo["08. previous close"],
          high: datainfo["03. high"],
          low: datainfo["04. low"],
          price: datainfo["05. price"],
          volume: datainfo["06. volume"],
          change: datainfo["09. change"],
          changePercent: datainfo["10. change percent"],
        },
      ];
    }
  }
}

export function useStock(props) {
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
