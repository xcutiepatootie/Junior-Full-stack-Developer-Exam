import ItemForm from "@/components/Forms/ItemForm";
import styles from "../page.module.css";

export default function create_item() {
  return (
    <div className={styles.main}>
      <h1 style={{ marginBottom: "1rem" }}>Create New Item</h1>
      <div className={"flex-item"}>
        <ItemForm />
      </div>
      
    </div>
  );
}
