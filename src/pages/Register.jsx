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

const Register = () => {
  const { registerUser } = useContext(AuthContext);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    password: "",
    address: "",
    email: "",
    zip_code: "",
    user_role: "",
    account_type: "",
    typeOfVehicle: "",
    gender: "",
  });
  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

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
            my: 2,
            textAlign: "center",
            color: colors.yellowAccent[500],
            fontWeight: 600,
          }}
        >
          Register
        </Typography>
        <TextField
          label="Username"
          variant="filled"
          value={formData.username}
          onChange={handleChange("username")}
        />

        <TextField
          label="Address"
          variant="filled"
          value={formData.address}
          onChange={handleChange("address")}
        />
        <Box sx={{ display: "flex", gap: 3 }}>
          {" "}
          <TextField
            label="Mobile"
            variant="filled"
            value={formData.mobile}
            onChange={handleChange("mobile")}
          />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            value={formData.password}
            onChange={handleChange("password")}
          />
        </Box>

        <TextField
          label="Email"
          variant="filled"
          type="email"
          value={formData.email}
          onChange={handleChange("email")}
        />

        <TextField
          label="Zip Code"
          variant="filled"
          value={formData.zip_code}
          onChange={handleChange("zip_code")}
        />
        <Box sx={{ display: "flex", gap: 3 }}>
          <TextField
            label="User Role"
            variant="filled"
            type="number"
            value={formData.user_role}
            onChange={handleChange("user_role")}
          />

          <TextField
            label="Account Type"
            variant="filled"
            type="number"
            value={formData.account_type}
            onChange={handleChange("account_type")}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 3 }}>
          <TextField
            label="Type of Vehicle"
            variant="filled"
            value={formData.typeOfVehicle}
            onChange={handleChange("typeOfVehicle")}
          />

          <TextField
            label="Gender"
            variant="filled"
            value={formData.gender}
            onChange={handleChange("gender")}
          />
        </Box>

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
          onClick={() => registerUser(formData)}
        >
          {" "}
          <Typography variant="h5" sx={{}}>
            Register
          </Typography>
        </Button>
        <Box>
          <Typography variant="h4" sx={{ color: colors.grey[500], mt: 2 }}>
            Already have an account?{" "}
            <Link
              style={{
                color: colors.yellowAccent[500],
                cursor: "pointer",
                textDecoration: "none",
              }}
              to="/login"
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default Register;
