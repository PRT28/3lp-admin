import React, { useContext, useState } from "react";
import { Box, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { AuthContext } from "../Context/AuthContext";
import login from "../assets/login.svg";
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function isValidPassword(password) {
  return password.length >= 8;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(false);
  const [password, setPassword] = useState("");
  const [loginStage, setLoginStage] = useState(0);
  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      setErr(true);
      return;
    }
    if (!isValidPassword(password)) {
      return;
    }
    setLoginStage(1);
    await signIn(email, password);
    setLoginStage(2);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          mx: "auto",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{ my: 5, textAlign: "center", color: "#6C63FF", fontWeight: 600 }}
        >
          Login Here 👇..
        </Typography>

        <img src={login} alt="" />
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="outlined"
          type="email"
          error={err}
          helperText={err && "*Enter a valid email address"}
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          variant="outlined"
          error={password.length !== 0 && password.length <= 8}
          helperText={
            password.length !== 0 &&
            password.length <= 8 &&
            "*Password length must be greater than 8 letters"
          }
        />
        <Button
          onClick={handleLogin}
          variant="contained"
          disabled={loginStage === 1}
        >
          Sign In
        </Button>
      </Box>
    </>
  );
};

export default Login;
