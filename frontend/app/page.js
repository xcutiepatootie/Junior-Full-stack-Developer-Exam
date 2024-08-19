import Image from "next/image";
import styles from "./page.module.css";
import Items_List from "@/components/ItemsList";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="grid-container">
        <div className="grid-item">
          <Items_List />
        </div>
        <div className="grid-item"></div>
      </div>
    </main>
  );
}
