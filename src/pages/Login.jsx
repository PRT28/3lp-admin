import React, { useContext, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { AuthContext } from "../Context/AuthContext";
import login from "../assets/login.svg";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import logo from "../assets/LOGO.svg";
import { Link } from "react-router-dom";

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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          mx: "auto",
          gap: 2,
          mt: 10,
          p: 5,
          borderRadius: "20px",
          pb: 4,
          backgroundColor: colors.primary[600],
        }}
      >
        <img src={logo} alt="" />
        <Typography
          variant="h1"
          sx={{
            my: 5,
            textAlign: "center",
            color: colors.yellowAccent[500],
            fontWeight: 600,
          }}
        >
          Login
        </Typography>

        <TextField
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="filled"
          type="email"
          error={err}
          helperText={err && "*Enter a valid email address"}
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          variant="filled"
          error={password.length !== 0 && password.length <= 8}
          helperText={
            password.length !== 0 &&
            password.length <= 8 &&
            "*Password length must be greater than 8 letters"
          }
        />
        <Button
          sx={{
            display: "block",
            borderRadius: "10px",
            border: `1px solid ${colors.yellowAccent[500]}`,
            "&:hover": {
              border: `1px solid ${colors.yellowAccent[500]}`,
              backgroundColor: colors.yellowAccent[500],
            },
            px: 2,
            py: 1,
            background: colors.yellowAccent[500],
          }}
          variant="contained"
          onClick={handleLogin}
          disabled={loginStage === 1}
        >
          {" "}
          <Typography variant="h5" sx={{}}>
            Login
          </Typography>
        </Button>
        <Box>
          <Typography variant="h4" sx={{ color: colors.grey[500], mt: 2 }}>
            {"Don't"} have an account?{" "}
            <Link
              style={{
                color: colors.yellowAccent[500],
                cursor: "pointer",
                textDecoration: "none",
              }}
              to="/register"
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default Login;
