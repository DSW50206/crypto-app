// src/components/CryptoList.jsx
import { useEffect, useState } from "react";
import { PaginatedList } from "./PaginatedList";
import { fetchCryptos, getFavorites, handleAddFavorite } from "../actions/actions";
import { onLog } from "firebase/app";

const CurrencyType = {
  USD: 'usd',
  EUR: 'eur',
  PLN: 'pln',
}

const CryptoList = () => {
  const [cryptos, setCryptos] = useState(JSON.parse(localStorage.getItem('cryptoState')) || []);
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || CurrencyType.USD);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [cryptosPerPage] = useState(10);
  const indexOfLastPage = currentPage * cryptosPerPage;
  const indexOfFirstPage = indexOfLastPage - cryptosPerPage;
  const currentCryptos = cryptos.filter((coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase())
          ).slice(indexOfFirstPage, indexOfLastPage);

  const updateCryptoData = () => {
      fetchCryptos(setIsLoading, currency, setCryptos);
  }

  useEffect(() => {
    if (localStorage.getItem('currency') !== currency || JSON.parse(localStorage.getItem('cryptoState')) == []) {
      fetchCryptos(setIsLoading, currency, setCryptos);
      localStorage.setItem('currency', currency)
    }
  }, [currency]);

  return (
    <div>
      <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h2>Aktualne kursy kryptowalut</h2>
        <button
        style={{
          padding: '16px',
          height: '50%',
        }}
          onClick={() => {
            updateCryptoData();
          }}
        >
          Uaktualnij dane
        </button>
      </div>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option value={CurrencyType.USD}>USD</option>
        <option value={CurrencyType.EUR}>EUR</option>
        <option value={CurrencyType.PLN}>PLN</option>
      </select>
      <input
        type="text"
        placeholder="Wyszukaj kryptowalutę..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {isLoading ? <p>Loading...</p> : <ul style={{
        width: '75vw',
        margin: '1rem auto',
      }}>
        {currentCryptos
          .filter((coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((coin) => (
            <li key={coin.id} 
            style={{
              backgroundColor: 'gray',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '15px',
              transition: 'box-shadow 0.3s ease',
            }}
            >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <div>
              <img src={coin.image} alt={coin.name} width="25" />
              <strong> {coin.name} </strong> – {coin.current_price}{" "}
              {currency.toUpperCase()}</div>
              <button
              style={{
                marginLeft: '1rem',
                textAlign: 'right',
              }}
                onClick={() => 
                {
                  handleAddFavorite(coin);
                }}
              >
                ❤️ Dodaj do ulubionych"
              </button>
            </div>
            </li>
          ))}
        </ul>
      }
      <PaginatedList
        cryptosPerPage={cryptosPerPage}
        totalCryptos={cryptos.filter((coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase())
          ).length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default CryptoList;
