import React, { useContext, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { AuthContext } from "../../Context/AuthContext";
import { Modal } from "@mui/material";
import { AdminContext } from "../../Context/AdminContext";
import { TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LOGO from "../../assets/LOGO.svg";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import AddUser from "../AddUser";
import { Snackbar, Alert } from "@mui/material";

const Navbar = () => {
  const { signOut, userDetails } = useContext(AuthContext);
  const { addRider } = useContext(AdminContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleAddRider = async () => {
    await addRider(name);
    handleClose();
  };

  const location = useLocation();
  const navigate = useNavigate();

  //

  const [openSnack, setOpenSnack] = useState(false);

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const handleAddition = () => {
    setOpen(false);
    setOpenSnack(true);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mt: 3,
        alignItems: "center",
      }}
    >
      <img
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
        src={LOGO}
        alt=""
      />
      <Box sx={{ display: "flex", gap: 3 }}>
        <Button
          sx={{
            display: "block",
            borderRadius: "10px",
            border: `1px solid ${colors.yellowAccent[500]}`,
            "&:hover": { border: `1px solid ${colors.yellowAccent[500]}` },
            px: 2,
            py: 1,
          }}
          variant="outlined"
          onClick={signOut}
        >
          <Typography variant="h5" sx={{ color: colors.yellowAccent[500] }}>
            Logout
          </Typography>
        </Button>
        {location.pathname === "/" && (
          <Button
            sx={{
              display: "block",
              borderRadius: "10px",
              border: `1px solid ${colors.yellowAccent[500]}`,
              "&:hover": {
                border: `1px solid ${colors.yellowAccent[500]}`,
                backgroundColor: colors.yellowAccent[500],
              },
              px: 2,
              py: 1,
              background: colors.yellowAccent[500],
            }}
            variant="contained"
            onClick={handleOpen}
          >
            {" "}
            <Typography variant="h5" sx={{}}>
              + Add User
            </Typography>
          </Button>
        )}
      </Box>
      <Modal open={open} onClose={handleClose}>
        <AddUser handleAddition={handleAddition} />
      </Modal>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: "100%" }}
        >
          <Typography variant="h5">User added successfully!</Typography>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Navbar;
