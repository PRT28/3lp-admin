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
import {
  Modal,
  Typography,
  Button,
  TextField,
  Box,
  colors,
} from "@mui/material";
import AuthContext from "../../Context/AuthContext";
import { useState } from "react";

export default function RiderTable() {
  const { riderList } = useContext(AdminContext);

  const { addRider, removeRider,check } = useContext(AdminContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");

  //calender modal
  const [openCal, setOpenCal] = useState(false);
  const handleOpenCal = () => setOpenCal(true);
  const handleCloseCal = () => setOpenCal(false);

  const [checkin, setcheckin] = useState();
  const [checkout, setcheckout] = useState();
  const [date, setdate] = useState();

  const handleAddRider = async () => {
    await addRider(name);
    handleClose();
  };

  const handleCheck = async () => {
    console.log(checkout,checkin,date)
    if(!checkin || !checkout || !date) return;
    await check(checkin,checkout,date)
    handleCloseCal();
  };
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
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
            <TableCell sx={{ fontWeight: 600 }} align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {riderList.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.riderId}
              </TableCell>
              <TableCell align="right">
                {row.orderPending ? "true" : "false"}
              </TableCell>
              <TableCell align="right">{row.riderName}</TableCell>
              <TableCell align="right">
                {row.checkInTime?.toString() ?? "--"}
              </TableCell>
              <TableCell align="right">
                {row.checkOutTime?.toString() ?? "--"}
              </TableCell>
              <TableCell align="right" sx={{ display: "flex" }}>
                <Button
                  sx={{ color: "red" }}
                  onClick={() => removeRider(row.riderId)}
                >
                  Delete
                </Button>
                <Button>Edit</Button>
                <Button onClick={handleOpenCal} sx={{ color: "green" }}>
                  Calender
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            p: 5,
            background: "white",
            width: "fit-content",
            mx: "auto",
            my: 10,
            borderRadius: "30px",
          }}
        >
          <Typography sx={{ color: "#6C63FF", fontWeight: 600 }} variant="h4">
            Enter the name of Rider
          </Typography>
          <TextField
            onChange={(e) => setName(e.target.value)}
            label="Rider's name"
            variant="outlined"
            type="text"
            sx={{ width: "100%" }}
          />
          <Button
            sx={{ display: "block", mx: "auto", width: "100%", mt: 2 }}
            variant="contained"
            onClick={handleAddRider}
          >
            {" "}
            + Add Rider
          </Button>
        </Box>
      </Modal>

      {/* //calender modal */}
      <Modal open={openCal} onClose={handleCloseCal}>
        <Box
          sx={{
            p: 5,
            background: "white",
            width: "fit-content",
            mx: "auto",
            my: 10,
            borderRadius: "30px",
          }}
        >
          <Typography sx={{ color: "#6C63FF", fontWeight: 600 }} variant="h6">
            Enter Checkin Time
          </Typography>
          <input
            onChange={(e) => setcheckin(e.target.value)}
            type="time"
            sx={{ width: "100%", padding: "10px", display: "block" }}
          />
          <Typography sx={{ color: "#6C63FF", fontWeight: 600 }} variant="h6">
            Enter Checkin Out Time
          </Typography>
          <input
            onChange={(e) => setcheckout(e.target.value)}
            type="time"
            sx={{ width: "100%", padding: "10px", display: "block" }}
          />
          <Typography sx={{ color: "#6C63FF", fontWeight: 600 }} variant="h6">
            Enter Date
          </Typography>
          <input
            onChange={(e) => setdate(e.target.value)}
            type="date"
            sx={{ width: "100%", padding: "10px", display: "block" }}
          />
          <Button
            sx={{ display: "block", mx: "auto", width: "100%", mt: 2 }}
            variant="contained"
            onClick={handleCheck}
          >
            {" "}
            Check In
          </Button>
        </Box>
      </Modal>
    </TableContainer>
  );
}
