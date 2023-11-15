import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";


export default function RiderTable() {
  const {riderList} = useContext(AdminContext)

  
  return (
    <TableContainer component={Paper} sx={{mt:2}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Sr No</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Rider Id</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">
              Orders Pending
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">
              Rider name
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">
              Check In time
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">
              Checkout time
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {riderList.map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.riderId}
              </TableCell>
              <TableCell align="right">{row.orderPending?"true":"false"}</TableCell>
              <TableCell align="right">{row.riderName}</TableCell>
              <TableCell align="right">{row.checkInTime?.toString()??"--"}</TableCell>
              <TableCell align="right">{row.checkOutTime?.toString()??"--"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
