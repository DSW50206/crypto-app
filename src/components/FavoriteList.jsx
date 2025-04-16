// src/components/FavoriteList.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    const favCollection = await getDocs(collection(db, "favorites"));
    const favs = favCollection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFavorites(favs);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "favorites", id));
    getFavorites(); // odśwież listę
  };

  useEffect(() => {
    getFavorites();
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
              onClick={() => handleDelete(coin.id)}
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
