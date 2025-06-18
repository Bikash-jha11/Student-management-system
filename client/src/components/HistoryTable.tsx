import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { FaAngleDoubleUp } from "react-icons/fa";
import { FaAngleDoubleDown } from "react-icons/fa";

interface History {
  contest: string;
  ranks: number;
  ratingChange: number;
  unsolvedProblem: number;
}

interface historyProps {
  rows: History[];
}

const HistoryTable: React.FC<historyProps> = ({ rows }) => {
  return (
   // <TableContainer component={Paper}>
      <Table
        sx={{ maxWidth: 700 }}
        size="small"
        aria-label="a dense table"
        style={{ marginLeft: "80px" }}
      >
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 800 }}>Contest</TableCell>
            <TableCell align="right" style={{ fontWeight: 800 }}>
              Rank
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 800 }}>
              Rating Change
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 800 }}>
              Unsolved
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: History) => (
            <TableRow
              key={row.contest}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.contest}
              </TableCell>
              <TableCell align="right">{row.ranks}</TableCell>
              <TableCell align="right">{row.ratingChange} {row.ratingChange > 0 && < FaAngleDoubleUp style={{'color':'orange','fontSize':'18px'}} />} {row.ratingChange < 0 && < FaAngleDoubleDown style={{'color':'red','fontSize':'18px'}} />} </TableCell>
              <TableCell align="right">{row.unsolvedProblem}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
   // </TableContainer>
  );
};

export default HistoryTable;
