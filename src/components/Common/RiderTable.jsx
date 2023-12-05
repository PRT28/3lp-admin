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
import CalenderModal from "../CalenderModal";
import { AuthContext } from "../../Context/AuthContext";
import { useState } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import EditRider from "../EditRider";
import axios from "axios";
import { FACILYTS_BASE_URL } from "../../Configs";

export default function RiderTable() {
  const { riderList } = useContext(AdminContext);
  const { userDetails, authToken } = useContext(AuthContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [currRider, setcurrRider] = useState("");

  //handle edit modal
  const [openCalender, setopenCalender] = useState(false);
  const [calenderData, setCalenderData] = useState([]);

  const handleSelectRider = async (id) => {
    await fetchCalender(id);
    setopenCalender(true);
  };

  const fetchCalender = async (riderId) => {
    try {
      const response = await axios.get(
        `${FACILYTS_BASE_URL}/attendence/calender/${riderId}`,
        { headers: { Authorization: authToken } }
      );
      console.log(response.data.content.data);
    } catch (err) {
      alert("Calender Info is not available for this rider!");
    }
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
                  onClick={() => alert("This feature is on hold")}
                >
                  Delete
                </Button>
                <Button
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    "&:hover": { backgroundColor: colors.blueAccent[800] },
                  }}
                  variant="contained"
                  onClick={() => alert("This feature is on hold")}
                >
                  Edit
                </Button>
                <Button
                  sx={{
                    backgroundColor: colors.greenAccent[700],
                    "&:hover": { backgroundColor: colors.greenAccent[800] },
                  }}
                  variant="contained"
                  onClick={() => handleSelectRider(row._id)}
                >
                  Calender
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Modal open={openCalender} onClose={() => setopenCalender(false)}>
        <CalenderModal calenderData={calenderData} />
      </Modal>
    </TableContainer>
  );
}
