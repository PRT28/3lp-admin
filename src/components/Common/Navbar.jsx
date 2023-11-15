import React, { useContext, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { AuthContext } from "../../Context/AuthContext";
import { Modal } from "@mui/material";
import { AdminContext } from "../../Context/AdminContext";
import { TextField } from "@mui/material";

const Navbar = () => {
  const { signOut, userDetails } = useContext(AuthContext);
  const { addRider } = useContext(AdminContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");

  const handleAddRider = async () => {
       await addRider(name)
       handleClose();
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mt: 5,
        alignItems: "center",
      }}
    >
      <Typography sx={{ color: "#6C63FF", fontWeight: 600 }} variant="h4">
        RidoTech
      </Typography>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Button
          sx={{ display: "block", borderRadius: "30px" }}
          variant="contained"
          onClick={signOut}
        >
          Logout
        </Button>
        {userDetails !== null && userDetails.role === 0 && (
          <Button
            sx={{ display: "block", borderRadius: "30px" }}
            variant="contained"
            onClick={handleOpen}
          >
            {" "}
            + Add Rider
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
            sx = {{width:"100%"}}
          />
          <Button
            sx={{ display: "block", mx:"auto",width:"100%",mt:2 }}
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
