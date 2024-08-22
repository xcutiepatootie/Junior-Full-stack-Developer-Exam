"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles/form.module.css";
import useForm from "@/hooks/useForm";
import useFetchItems from "@/hooks/useFetchItems";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

const ItemForm = ({ itemId }) => {
  const [initialValue, setInitialValue] = useState(null);
  const router = useRouter();
  const { showToast } = useToast();
  const { items, loading, error } = useFetchItems(itemId);

  useEffect(() => {
    if (items) {
      setInitialValue({
        name: items.name || "",
        description: items.description || "",
        price: items.price || "",
      });
    }
  }, [items]);

  const submitForm = async (formData) => {
    const url = itemId
      ? `${process.env.NEXT_PUBLIC_URL}api/items/${itemId}`
      : `${process.env.NEXT_PUBLIC_URL}api/items`;
    const method = itemId ? "PUT" : "POST";

    console.log(JSON.stringify(formData));

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      const key = Object.keys(result);
      console.log(result);

      showToast(result[`${key[0]}`], key[0]);
    }
  };

  const { formData, handleChange, handleSubmit, isSubmitting } = useForm(
    initialValue || { name: "", description: "", price: "" },
    submitForm
  );

  const handleDelete = async (itemId) => {
    if (!itemId) return;
    try {
      const url = `${process.env.NEXT_PUBLIC_URL}api/items/${itemId}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`Item with ID ${itemId} deleted successfully.`);
        showToast("Item deleted successfully.", "warning");
        router.push("/");
      } else {
        console.error("Failed to delete item.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading || !initialValue) return <p>Loading...</p>;
  /* if (error) return <p>Error: {error.message}</p>; */

  return (
    <form onSubmit={handleSubmit} className={styles["item-form"]}>
      {itemId && <h2>Item id: {itemId}</h2>}
      <div>
        <label htmlFor="name">Item Name:</label>
        <input
          type="text"
          onChange={handleChange}
          id="name"
          name="name"
          value={formData.name}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Item Description:</label>
        <textarea
          onChange={handleChange}
          name="description"
          id="description"
          value={formData.description}
        />
      </div>
      <div>
        <label htmlFor="price">Item Price:</label>
        <input
          type="number"
          min={0}
          onChange={handleChange}
          id="price"
          name="price"
          value={formData.price}
        />
      </div>
      <button
        className={styles.submitBtn}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            Submitting
            <span className={styles.spinner}></span>
          </>
        ) : (
          "Submit"
        )}
      </button>

      {itemId && (
        <button
          onClick={() => handleDelete(itemId)}
          className={styles.deleteBtn}
          type="button"
        >
          Delete
        </button>
      )}
    </form>
  );
};

export default ItemForm;
