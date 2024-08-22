"use client";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import styles from "./styles/header.module.css";
import { useState } from "react";
import useMobileView from "@/hooks/useMobileView";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMobileView();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className={styles.navbar}>
      Junior Full-stack Developer Exam
      <div className={styles["navbar-items"]}>
        {isMobile && !menuOpen && (
          <RxHamburgerMenu className={styles.icon} onClick={toggleMenu} />
        )}
        {isMobile && menuOpen && (
          <RxCross1 className={styles.icon} onClick={toggleMenu} />
        )}
        {!isMobile && (
          <div>
            <Link href={"/authentication"} className={styles.link}>
              Log In / Sign Up
            </Link>
          </div>
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
              <Link
                href="/"
                onClick={toggleMenu}
                className={styles["sidebar-link"]}
              >
                Log In / Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
