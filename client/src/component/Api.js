import { useState, useEffect } from "react";

const API_KEY = ""; //Input your API KEY

async function getCompanyInfo() {
  const url = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${API_KEY}`;
  let res = await fetch(url);
  let data = await res.json();

  //This is for Limit reached
  if ("Error Message" in data) {
    return "access restriction";
  }

  return data;
}

export function useStockInfo() {
  const [loading, setLoading] = useState(true);
  const [stocks, setStocks] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setStocks(await getCompanyInfo());
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, []);

  return { loading, stocks, error };
}
