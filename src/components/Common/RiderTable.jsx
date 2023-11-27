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
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

export default function RiderTable() {
  const { riderList } = useContext(AdminContext);

  const { addRider, removeRider, check } = useContext(AdminContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
    console.log(checkout, checkin, date);
    if (!checkin || !checkout || !date) return;
    await check(checkin, checkout, date);
    handleCloseCal();
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ background: colors.primary[500], p: 2, borderRadius: "10px" }}
    >
      <Typography variant="h4" sx={{ fontWeight: 600, my: 2 }}>
        {" Rider's List"}
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ background: colors.primary[600] }}>
          <TableRow>
            <TableCell sx={{ fontSize: "1.125em" }}>Sr No</TableCell>
            <TableCell sx={{ fontSize: "1.125em" }}>Username</TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              Mobile Number
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              Checked In
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              Zip Code
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              User Role
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              Address
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              UpdatedAt
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="center">
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
                {row.username}
              </TableCell>
              <TableCell align="right">{row.mobile}</TableCell>
              <TableCell align="right">
                {row.checked_in ? "true" : "false"}
              </TableCell>
              <TableCell align="right">{row.zip_code}</TableCell>
              <TableCell align="right">{row.user_role}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="center">{row.updatedAt}</TableCell>
              <TableCell align="right" sx={{ display: "flex", gap: 2 }}>
                <Button
                  sx={{
                    backgroundColor: colors.redAccent[700],
                    "&:hover": { backgroundColor: colors.redAccent[800] },
                  }}
                  variant="contained"
                  onClick={() => removeRider(row.riderId)}
                >
                  Delete
                </Button>
                <Button
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    "&:hover": { backgroundColor: colors.blueAccent[800] },
                  }}
                  variant="contained"
                >
                  Edit
                </Button>
                <Button
                  onClick={handleOpenCal}
                  sx={{
                    backgroundColor: colors.greenAccent[700],
                    "&:hover": { backgroundColor: colors.greenAccent[800] },
                  }}
                  variant="contained"
                >
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
