"use client";
import CardGrid from "@/components/CardGrid";
import Items_List from "@/components/ItemsList";
import useMobileView from "@/hooks/useMobileView";
import styles from "./page.module.css";

export default function Home() {
  const isMobile = useMobileView();
  return (
    <main className={styles.main}>
      <div className="grid-container">
        {!isMobile && (
          <div className="grid-item">
            <Items_List />
          </div>
        )}

        <div className="grid-item">
          <CardGrid />
        </div>
      </div>
    </main>
  );
}
