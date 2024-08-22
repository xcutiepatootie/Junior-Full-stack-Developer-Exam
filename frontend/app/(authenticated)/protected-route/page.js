import React from "react";
import styles from "./styles/protectedroute.module.css";
import { cookies } from "next/headers";

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  return new Intl.DateTimeFormat(navigator.language, options).format(date);
};
export default async function page() {
  const accessToken = cookies().get("access_token");
  const userInfo = await fetch(
    `${process.env.NEXT_PUBLIC_URL}auth/decode-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: accessToken.value }),
    }
  );

  const data = await userInfo.json();
  const user = data["decoded-user"];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Protected Route</h1>
        <h2>
          The user can&apos;t access this page if the user doesn&apos;t have an
          access_token (JWT) in their cookies
        </h2>
        <br />
        <h1>This is the information stored in JWT</h1>
        <h3>User ID: {user.userId}</h3>
        <h3>Username: {user.username}</h3>
        <h3>Name: {user.name}</h3>
        <h3>Email: {user.email}</h3>
        <h3>Issued At: {formatDate(user.iat)}</h3>
        <h3>Expiring At: {formatDate(user.exp)}</h3>
      </div>
    </div>
  );
}
