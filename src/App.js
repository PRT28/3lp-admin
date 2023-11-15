import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import Login from "./pages/Login";

function App() {
  const { userDetails } = useContext(AuthContext);

  let authState = false;
  if (userDetails !== null && userDetails.authState === true) {
    authState = true;
  }
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
