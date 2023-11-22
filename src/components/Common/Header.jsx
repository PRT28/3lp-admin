import { Box, Typography, Paper } from "@mui/material";
import React, { useContext, useEffect } from "react";
import bike from "../../assets/bike.svg";
import { useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import axios from "axios";
import admin from "../../assets/HIIlOGO.svg";

const Header = () => {
  const [isWaving, setIsWaving] = useState(false);
  const { userDetails } = useContext(AuthContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 
  return (
    <Paper
      sx={{
        mt: 4,
        display: "flex",
        alignItems: "center",
        p: 4,
        borderRadius: "40px",
        background: colors.primary[600],
        gap:3
      }}
    >
      <Box sx={{ width: "200px" }}>
        <img
          src={admin}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt=""
        />
      </Box>
      <Box sx={{ textAlign: "center" }} >
        <Typography variant="h1" sx={{ fontSize: "64px" }}>
          Hi,{" "}
          {userDetails?.username}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "grey", fontSize: "24px" }}
        >
          Welcome to the admin page
        </Typography>
      </Box>
    </Paper>
  );
};

export default Header;
