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
import { AdminContext } from "../Context/AdminContext";

const EditUser = ({ handleAddition, userData }) => {
  const { userDetails } = useContext(AuthContext);
  const { addUsers } = useContext(AdminContext);
  console.log(userDetails);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(
    userData ?? {
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
    }
  );
  const handleAddUser = async () => {
    // if (formData && formData.user_role < userDetails.user_role) return;
    // setLoading(true);
    //  await addUsers(formData);
    // handleAddition();
    // setLoading(false);
    alert("This feature is yet to come !");
  };
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
        <TextField
          label="Username"
          variant="filled"
          value={formData.username}
          onChange={handleChange("username")}
          required
        />

        <TextField
          label="Address"
          variant="filled"
          value={formData.address}
          onChange={handleChange("address")}
          required
        />
        <Box sx={{ display: "flex", gap: 3 }}>
          {" "}
          <TextField
            label="Mobile"
            variant="filled"
            value={formData.mobile}
            onChange={handleChange("mobile")}
            required
          />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            value={formData.password}
            onChange={handleChange("password")}
            required
          />
        </Box>

        <TextField
          label="Email"
          variant="filled"
          type="email"
          value={formData.email}
          onChange={handleChange("email")}
          required
        />

        <TextField
          label="Zip Code"
          variant="filled"
          value={formData.zip_code}
          onChange={handleChange("zip_code")}
          required
        />
        <Box sx={{ display: "flex", gap: 3 }}>
          <TextField
            label="User Role"
            variant="filled"
            type="number"
            value={formData.user_role}
            onChange={handleChange("user_role")}
            required
          />

          <TextField
            label="Account Type"
            variant="filled"
            type="number"
            value={formData.account_type}
            onChange={handleChange("account_type")}
            required
          />
        </Box>
        <Box sx={{ display: "flex", gap: 3 }}>
          <TextField
            label="Type of Vehicle"
            variant="filled"
            value={formData.typeOfVehicle}
            onChange={handleChange("typeOfVehicle")}
            required
          />

          <TextField
            label="Gender"
            variant="filled"
            value={formData.gender}
            onChange={handleChange("gender")}
            required
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
          onClick={() => handleAddUser(formData)}
          disabled={loading}
        >
          {" "}
          <Typography variant="h5" sx={{}}>
            + Edit User
          </Typography>
        </Button>
      </Paper>
    </>
  );
};

export default EditUser;
