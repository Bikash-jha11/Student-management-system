import React, { useState } from "react";
import styles from "../styles/Header.module.css";
import { IoAddCircle } from "react-icons/io5";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";


import { postDataApi } from "../fetch";

function Header() {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    codeforcehandle: "",
  });

  const { name, email, phone, codeforcehandle } = data;


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault;
    const {name,value} = e.target;
    //@ts-ignore
    setData({...data,[name]:value})
    console.log(data)
  }

  const handleSubmit = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
       e.preventDefault();
         async function postData(){
          try {
              const response = await postDataApi('addStudent',data);
            console.log(response)
          } catch (error) {
             console.log(error)
          }
          
         }    
         
         postData();
         setShowForm(false);
  }

    const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "http://localhost:3000/export-csv"; // adjust base URL as needed
    link.setAttribute("download", "students.csv");
    link.click();
    }

  return (
    <div className={styles.header}>
      <Link to="/">
        <FaArrowCircleLeft style={{ fontSize: "2rem", color: "#FF5733" }} />
      </Link>
      <div className={styles.icons}>
        <IoAddCircle
          style={{ fontSize: "2rem", color: "#FF5733" }}
          onClick={() => setShowForm(!showForm)}
        />

        {showForm && (
          <form className={styles.form}>
            <input placeholder="Name" name="name" value={name} onChange = {handleChange} required />
            <input placeholder="Email" name="email" value={email} onChange = {handleChange} required />
            <input placeholder="Phone" name="phone" value={phone} onChange = {handleChange} required />
            <input
              placeholder="Codeforces Handle"
              name="codeforcehandle"
              value={codeforcehandle}
              onChange = {handleChange}
              required
            />
            <button  type = "button" className={styles.btn}  onClick ={handleSubmit} >
              Submit
            </button>
          </form>
        )}

       <FaCloudDownloadAlt style={{ fontSize: "2rem", color: "#FF5733" }} onClick={handleDownload} />
      </div>
    </div>
  );
}


export default Header;
