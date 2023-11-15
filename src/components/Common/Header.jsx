import { Box, Typography, Paper } from "@mui/material";
import React, { useContext } from "react";
import bike from "../../assets/bike.svg";
import { useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
const Header = () => {
  const [isWaving, setIsWaving] = useState(false);
  const {userDetails} = useContext(AuthContext);
  return (
    <Paper
      sx={{
        mt: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 4,
        borderRadius: "40px",
       
      }}
    >
      <Box sx={{textAlign:"center"}}>
        <Typography variant="h2">👋 Hi, {(userDetails!==null && userDetails.role===0)?"Super Admin":"Master"}</Typography>
        <Typography variant="subtitle1" sx={{color:"grey"}}>Welcome to the admin page</Typography>
      </Box>
      <Box sx={{ width: "400px" }}>
        <img
          src={bike}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt=""
        />
      </Box>
    </Paper>
  );
};

export default Header;
