import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import logo from "../../assets/LOGO.svg";

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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
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
        backgroundColor: colors.primary[800],
        pl: 2,
      }}
    >
      <Box sx={{ height: "36px", width: "158.542px" }}>
        <img
          src={logo}
          style={{
            objectFit: "contain",
            height: "100%",
            width: "100%",
            cursor: "pointer",
          }}
          onClick={()=>navigate("/")}
          alt=""
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 10,
          justifyContent: "left",
          width: "fit-content",
        }}
      >
        {routes.map((route, index) => (
          <Link
            key={index}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              fontSize: "1.5em",
              color:
                location.pathname === route.route
                  ? colors.yellowAccent[500]
                  : "white",
              margin: 15,
              textDecoration: "none",
            }}
            to={route.route}
          >
            {route.name}
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
