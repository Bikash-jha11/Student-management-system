import React from "react";
import StudentTable from "../components/StudentTable";
import  styles from "../styles/Student.module.css";

function Student() {
  return (
    <div className={styles.main}>
      <StudentTable />
    </div>
  );
}

export default Student;
