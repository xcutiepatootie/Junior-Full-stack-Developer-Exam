"use client";
import { useAuth } from "@/providers/AuthContext";
import { useState } from "react";
import styles from "./styles/form.module.css";

const AuthForm = ({ itemId }) => {
  const { login, register, loading, isSubmitting } = useAuth();
  const [name, setName] = useState("");
  const [username, setUserame] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      login({ email, password });
    } else {
      register({ name, username, email, password });
    }
   /*  setName("");
    setUserame("");
    setEmail("");
    setPassword(""); */
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "login" ? "register" : "login"));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className={styles["item-form"]}>
      {mode == "register" && (
        <>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              id="name"
              name="name"
              value={name}
              required
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              onChange={(e) => setUserame(e.target.value)}
              id="username"
              name="username"
              value={username}
              required
            />
          </div>
        </>
      )}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
          value={email}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
          value={password}
        />
      </div>
      <button
        className={styles.submitBtn}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            {mode === "login" ? "Logging In" : "Creating Account"}
            <span className={styles.spinner}></span>
          </>
        ) : mode === "login" ? (
          "Login"
        ) : (
          "Register"
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

      <button
        onClick={toggleMode}
        className={styles.modeBtn}
        type="button"
        disabled={isSubmitting}
      >
        {mode === "login"
          ? "Don't have an account yet? Click Me!"
          : "Already have an account? Click Me!"}
      </button>
    </form>
  );
};

export default AuthForm;
