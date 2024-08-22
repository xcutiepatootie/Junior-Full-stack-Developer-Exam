import React from "react";
import styles from "../page.module.css";
import AuthForm from "@/components/Forms/AuthForm";

export default function page() {
  return (
    <div className={styles["flex-container"]}>
      <div className={styles["flex-item"]}>
        <AuthForm />
      </div>
    </div>
  );
}
