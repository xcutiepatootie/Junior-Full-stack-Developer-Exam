"use client";
import React from "react";
import styles from "./styles/card.module.css";
import useFetchItems from "@/hooks/useFetchItems";
import Avatar from "boring-avatars";
import { useRouter } from "next/navigation";
import useMobileView from "@/hooks/useMobileView";

const CardGrid = () => {
  const router = useRouter();
  const { items, error, loading } = useFetchItems(
    "http://localhost:5000/api/items"
  );
  const isMobile = useMobileView();

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Something went wrong: {error.message}</h2>;
  return (
    <div>
      {isMobile && (
        <button
          className={styles["add-item"]}
          onClick={() => {
            router.push("/create-item");
          }}
        >
          Add new Item
        </button>
      )}

      <div className={styles["card-container"]}>
        {items.map((item) => (
          <div key={item.id} className={styles.card}>
            <Avatar
              name={`${item.name}`}
              colors={["#fb6900", "#f63700", "#004853", "#007e80", "#00b9bd"]}
              square
              size={55}
            />
            <p className={styles["card-title"]}>{item.name}</p>
            <p className={styles["card-description"]}>{item.description}</p>
            <p className={styles["card-price"]}>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
