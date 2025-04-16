// src/components/CryptoList.jsx
import { useEffect, useState } from "react";
import { fetchCryptoPrices } from "../api/coingecko";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("usd");

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCryptoPrices(currency);
      setCryptos(data);
    };
    getData();
  }, [currency]);

  const handleAddFavorite = async (coin) => {
    try {
      await addDoc(collection(db, "favorites"), {
        name: coin.name,
        symbol: coin.symbol,
        price: coin.current_price,
        image: coin.image,
      });
      alert(`${coin.name} dodany do ulubionych!`);
    } catch (error) {
      console.error("Błąd zapisu:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Aktualne kursy kryptowalut</h2>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        style={{
          padding: "0.5rem",
          marginBottom: "1rem",
          marginTop: "1rem",
          borderRadius: "5px",
        }}
      >
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="pln">PLN</option>
      </select>
      <input
        type="text"
        placeholder="Wyszukaj kryptowalutę..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "0.5rem",
          margin: "1rem 0",
          width: "100%",
          maxWidth: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <ul>
        {cryptos
          .filter((coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((coin) => (
            <li key={coin.id} style={{ marginBottom: "1rem" }}>
              <img src={coin.image} alt={coin.name} width="25" />
              <strong> {coin.name} </strong> – {coin.current_price}{" "}
              {currency.toUpperCase()}
              <button
                style={{ marginLeft: "1rem" }}
                onClick={() => handleAddFavorite(coin)}
              >
                ❤️ Dodaj do ulubionych
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CryptoList;
