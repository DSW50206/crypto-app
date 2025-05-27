import { fetchCryptoPrices } from "../api/coingecko";
import { db } from "../api/firebase";
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";

export const fetchCryptos = async (setIsLoading, currency, setCryptos) => {
    setIsLoading(true);
    const getData = async () => {
      const data = await fetchCryptoPrices(currency);
      setCryptos(data);
      localStorage.setItem('cryptoState', JSON.stringify(data))
    };
    getData();
    setIsLoading(false);
};

export const handleAddFavorite = async (coin) => {
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
  
export const getFavorites = async (setFavorites) => {
    const favCollection = await getDocs(collection(db, "favorites"));
    const favs = favCollection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    await setFavorites(favs);
  };

export const handleDelete = async (id, setFavorites) => {
    await deleteDoc(doc(db, "favorites", id));
    getFavorites(setFavorites); // odśwież listę
};