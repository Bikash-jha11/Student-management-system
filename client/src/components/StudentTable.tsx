import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Header from "../components/Header";

import { IoAddCircle } from "react-icons/io5";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";

import { getDataApi } from "../fetch";

import { Link } from "react-router-dom";

import styles from "../styles/StudentTable.module.css";

interface Student {
  name: string;
  email: string;
  phone: number;
  cfHandle: string;
  currentRating: number;
  maxRating: number;
}

export default function StudentTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getDataApi("getdetail");
      setData(response.data.result);
    }
    fetchData();

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval); 
     
  }, []);

  

  return (
    <>
      <div className={styles.main}>
        <Header />
        <div className={styles.container}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 950, maxHeight: 500 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">CF Handle</TableCell>
                <TableCell align="right">Current Rating</TableCell>
                <TableCell align="right">Max Rating</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: Student) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">{row.cfHandle}</TableCell>
                  <TableCell align="right">{row.currentRating}</TableCell>
                  <TableCell align="right">{row.maxRating}</TableCell>
                  <TableCell align="right">
                    <Link to={`/analytics/${row.cfHandle}`}>View</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </div>
    </>
  );
}
