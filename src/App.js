import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import Login from "./pages/Login";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "./components/Common/Sidebar";
import CreateOrders from "./pages/CreateOrders";
import Orders from "./pages/Orders";
import Track from "./pages/Track";
import { ColorModeContext, useMode } from "./theme";
import Register from "./pages/Register";

function App() {
  const { userDetails,authToken } = useContext(AuthContext);
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "flex", alignSelf: "flex-start" }}>
          {authToken !==undefined && <Sidebar />}
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/createOrder" element={<CreateOrders />}></Route>
            <Route path="/track" element={<Track />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
