// src/components/FavoriteList.jsx
import { useEffect, useState } from "react";
import { getFavorites, handleDelete } from "../actions/actions";

const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites(setFavorites);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Ulubione kryptowaluty 💖</h2>
      {favorites.length === 0 && <p>Brak ulubionych 😢</p>}
      <ul>
        {favorites.map((coin) => (
          <li key={coin.id} style={{ marginBottom: "1rem" }}>
            <img src={coin.image} alt={coin.name} width="25" />
            <strong> {coin.name} </strong> – {coin.price} USD
            <button
              style={{ marginLeft: "1rem" }}
              onClick={() => handleDelete(coin.id, setFavorites)}
            >
              ❌ Usuń
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteList;
