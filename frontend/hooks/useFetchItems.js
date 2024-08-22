import { useState, useEffect } from "react";

const useFetchItems = (itemId = null) => {
  const API_URL = process.env.NEXT_PUBLIC_URL;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchUrl = `${API_URL}api/items`;
        if (itemId) {
          fetchUrl = `${API_URL}api/items/${itemId}`;
        }
        const response = await fetch(fetchUrl, { method: "GET" });
        if (!response.ok) {
          throw new Error("Item not found");
        }
        const data = await response.json();
        setItems(itemId ? data : data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

  return { items, loading, error };
};

export default useFetchItems;
