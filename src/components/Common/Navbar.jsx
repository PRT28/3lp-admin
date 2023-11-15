import React, { useContext } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { AuthContext } from "../../Context/AuthContext";
const Navbar = () => {
  const { signOut, userDetails } = useContext(AuthContext);
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
          >
            {" "}
            + Add Rider
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
