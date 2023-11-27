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
import { IconButton } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Menu, MenuItem } from "@mui/material";

export default function UserTable() {
  const { userList } = useContext(AdminContext);

  const { addRider, removeRider, check } = useContext(AdminContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAddRider = async () => {
    await addRider(name);
    handleClose();
  };

  const [userType, setUserType] = useState(4);

  const handleMenuOptions = (val) => {
    setUserType(val);
    handleCloseMenu();
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ background: colors.primary[500], p: 2, borderRadius: "10px" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, my: 2 }}>
          {" User's List"}
        </Typography>
        <Button
          sx={{
            display: "block",
            borderRadius: "10px",
            border: `1px solid ${colors.yellowAccent[500]}`,
            "&:hover": { border: `1px solid ${colors.yellowAccent[500]}` },
            px: 2,
            py: 1,
          }}
          onClick={handleClick}
          variant="outlined"
        >
          <Typography variant="h5" sx={{ color: colors.yellowAccent[500] }}>
            <FilterAltIcon sx={{ position: "relative", top: "5px" }} /> Filter
          </Typography>
        </Button>
      </Box>

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
            {/* <TableCell sx={{ fontSize: "1.125em" }} align="center">
              Actions
            </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {userList
            .filter((p) => (userType === 4 ? true : p.user_role === userType))
            .map((row, index) => (
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
                {/* <TableCell align="right" sx={{ display: "flex", gap: 2 }}>
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
                </TableCell> */}
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
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
      >
        <MenuItem
          sx={{ color: userType === 4 ? colors.yellowAccent[500] : "white" }}
          onClick={() => handleMenuOptions(4)}
        >
          All
        </MenuItem>
        <MenuItem
          sx={{ color: userType === 1 ? colors.yellowAccent[500] : "white" }}
          onClick={() => handleMenuOptions(1)}
        >
          Admins
        </MenuItem>
        <MenuItem
          sx={{ color: userType === 0 ? colors.yellowAccent[500] : "white" }}
          onClick={() => handleMenuOptions(0)}
        >
          Super Admins
        </MenuItem>
        <MenuItem
          sx={{ color: userType === 2 ? colors.yellowAccent[500] : "white" }}
          onClick={() => handleMenuOptions(2)}
        >
          Regional Managers
        </MenuItem>
      </Menu>
    </TableContainer>
  );
}
