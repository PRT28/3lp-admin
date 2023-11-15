import React from "react";
import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const routes = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "Orders",
    route: "/orders",
  },
  {
    name: "Create Order",
    route: "/createOrder",
  },
  {
    name: "Track Shipment",
    route: "/track",
  },
  
];
const Sidebar = () => {
    const location = useLocation();
   
  return (
    <Box
      sx={{
        position: "sticky",

        flexBasis: "15%",
        height: "100vh",
        top: 0,
        display: "flex",
        flexDirection: "column",
        pt: 5,
        background: "#F3EEEA",
      }}
    >
      <Typography
        sx={{
          color: "#6C63FF",
          fontWeight: 600,
          textAlign: "left",
          mb: 5,
          ml: 2,
        }}
        variant="h4"
      >
        RidoTech
      </Typography>
      {routes.map((route, index) => (
        <Link
          key={index}
          style={{
            displLinky: "block",
            width: "100%",
            textAlign: "center",
            fontSize: "1.5em",
            textDecoration: location.pathname===route.route?"underline":"none",
            margin: 15,
            textAlign: "left",
            color: "black",
          }}
          to={route.route}
        >
          {route.name}
        </Link>
      ))}
    </Box>
  );
};

export default Sidebar;
