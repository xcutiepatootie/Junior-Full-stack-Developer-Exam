"use client";
import { useEffect, useState } from "react";

const ItemsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:5000/api/items";
        const response = await fetch(url, { method: "GET" });
        const data = await response.json();
        console.log(data);
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item.id} className="item">
            <h1>{item.name}</h1>
            <p>{item.description}</p>
            <p>{item.price}</p>
          </div>
        ))
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
};

export default ItemsList;
