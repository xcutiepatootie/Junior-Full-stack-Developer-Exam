"use client";
import React, { useState, useEffect } from "react";

export default function Item({ params }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:5000/api/items/${params.id}`;
        const response = await fetch(url, { method: "GET" });
        const data = await response.json();
        console.log(data);
        setItem(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);
  return (
    <div>
      id:{params.id}
      {item ? (
        <>
          {item.name}
          {item.description}
          {item.price}
        </>
      ) : (
        <>No item found</>
      )}
    </div>
  );
}
