"use client";
import useMobileView from "@/hooks/useMobileView";
import { useAuth } from "@/providers/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import styles from "./styles/header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const isMobile = useMobileView();

  console.log(user);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className={styles.navbar}>
      <Link className={styles.link} href={"/"}>
        Junior Full-stack Developer Exam
      </Link>

      <div className={styles["navbar-items"]}>
        {isMobile && !menuOpen && (
          <RxHamburgerMenu className={styles.icon} onClick={toggleMenu} />
        )}
        {isMobile && menuOpen && (
          <RxCross1 className={styles.icon} onClick={toggleMenu} />
        )}
        {!isMobile && (
          <>
            <div>
              <Link href={"/"} className={styles.link}>
                Home
              </Link>
            </div>
            <div>
              <Link href={"/create-item"} className={styles.link}>
                Add New Item
              </Link>
            </div>
            {user ? (
              <div>
                <Link href="/" onClick={logout} className={styles.link}>
                  Log out
                </Link>
              </div>
            ) : (
              <div>
                <Link href={"/authentication"} className={styles.link}>
                  Log In / Sign Up
                </Link>
              </div>
            )}
          </>
        )}
      </div>
      {/* Sidebar */}
      {isMobile && (
        <div
          className={`${styles.sidebar} ${
            menuOpen ? styles.sidebarOpen : styles.sidebarClosed
          }`}
        >
          <ul>
            <li>
              <Link href={"/"} className={styles["sidebar-link"]}>
                Home
              </Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link href={"/create-item"} className={styles["sidebar-link"]}>
                Add New Item
              </Link>
            </li>
          </ul>

          <ul>
            <li>
              {user ? (
                <Link
                  href="/"
                  onClick={logout}
                  className={styles["sidebar-link"]}
                >
                  Log out
                </Link>
              ) : (
                <Link
                  href="/"
                  onClick={toggleMenu}
                  className={styles["sidebar-link"]}
                >
                  Log In / Sign Up
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
