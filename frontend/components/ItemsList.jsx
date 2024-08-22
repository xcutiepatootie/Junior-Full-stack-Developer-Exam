"use client";
import useFetchItems from "@/hooks/useFetchItems";
import { useRouter } from "next/navigation";
import styles from "./styles/items-table.module.css";
import useMobileView from "@/hooks/useMobileView";

const ItemsList = () => {
  const isMobile = useMobileView();
  const { items, error, loading } = useFetchItems();
  const router = useRouter();

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Something went wrong: {error.message}</h2>;

  return !isMobile ? (
    <div>
      <div className={styles["table-container"]}>
        {items.length > 0 ? (
          <table className={styles["items-table"]}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="item">
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      onClick={() => {
                        router.push(`/item/${item.id}`);
                      }}
                    >
                      Go To Item
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No items found.</p>
        )}
      </div>
      <button
        className={styles["add-item"]}
        onClick={() => {
          router.push("/create-item");
        }}
      >
        Add new Item
      </button>
    </div>
  ) : null;
};

export default ItemsList;
