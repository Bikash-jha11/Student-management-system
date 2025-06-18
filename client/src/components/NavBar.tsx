import React from "react";
import styles from "../styles/Navbar.module.css";
import { ReactSVG } from "react-svg";
import Logo from "../assets/logo.svg";

function NavBar() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.left_section}>
          <img src={Logo} width={"25px"} height={"25px"}></img>
          <p>TLE Eliminators</p>
        </div>
        <div className={styles.middle_section}>
          <p>Home</p>
          <p>Courses</p>
          <p>CP-31 Sheet</p>
          <p>FAQs</p>
          <p>Our Mentors</p>
        </div>
        <div className={styles.right_section}>
          <button>Login/Register</button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
