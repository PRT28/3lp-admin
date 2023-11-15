import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import Login from "./pages/Login";
import { Box } from "@mui/material";
import Sidebar from "./components/Common/Sidebar";
import CreateOrders from "./pages/CreateOrders";
import Orders from "./pages/Orders";
import Track from "./pages/Track";

function App() {
  const { userDetails } = useContext(AuthContext);

  let authState = false;
  if (userDetails !== null && userDetails.authState === true) {
    authState = true;
  }
  return (
    <Box sx={{ display: "flex", alignSelf: "flex-start" }}>
      {userDetails?.authState && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/createOrder" element={<CreateOrders />}></Route>
        <Route path="/track" element={<Track />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
      </Routes>
    </Box>
  );
}

export default App;
