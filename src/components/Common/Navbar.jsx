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
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mt: 3,
        alignItems: "center",
      }}
    >
      <img onClick={()=>navigate("/")} style={{cursor:"pointer"}} src={LOGO} alt="" />
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
    </Box>
  );
};

export default Navbar;
