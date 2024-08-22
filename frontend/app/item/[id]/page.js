import ItemForm from "@/components/Forms/ItemForm";
import styles from "../../page.module.css";

export default function page({ params }) {
  console.log(params);
  return (
    <div className={styles.main}>
      <h1 style={{ marginBottom: "1rem" }}>Update Item</h1>
      <div className={"flex-item"}>
        <ItemForm itemId={params.id} />
      </div>
    </div>
  );
}
