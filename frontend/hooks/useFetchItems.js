import { useState, useEffect } from "react";

const useFetchItems = (url, itemId = null) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchUrl = url;
        if (itemId) {
          fetchUrl = `${url}/${itemId}`;
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
  }, [url, itemId]);

  return { items, loading, error };
};

export default useFetchItems;
