// src/api/coingecko.js
import axios from "axios";

export const fetchCryptoPrices = async (currency = "usd") => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc`;
  const res = await axios.get(url);
  return res.data;
};
