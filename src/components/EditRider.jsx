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

const EditRider = ({ handleEditRider,currRider }) => {
  const { userDetails } = useContext(AuthContext);
  const { editRider } = useContext(AdminContext);
  console.log(userDetails);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    idprooftype: "",
    typeOfVeichle: "",
    idNumber: "",
    deliveryPref: "",
    workPref: "",
    zipCode: "",
    riderId: "",
  });
  const handleAddUser = async () => {
    if (formData && formData.deliveryPref < userDetails.deliveryPref) return;
    setLoading(true);
    await editRider(currRider,formData);
    handleEditRider();
    setLoading(false);
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
          label="AccountNumber"
          variant="filled"
          value={formData.accountNumber}
          onChange={handleChange("accountNumber")}
          required
        />

        <TextField
          label="IdProofType"
          variant="filled"
          value={formData.idprooftype}
          onChange={handleChange("idprooftype")}
          required
        />
        <Box sx={{ display: "flex", gap: 3 }}>
          {" "}
          <TextField
            label="BankName"
            variant="filled"
            value={formData.bankName}
            onChange={handleChange("bankName")}
            required
          />
          <TextField
            label="IFSC-Code"
            variant="filled"
            type="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange("ifscCode")}
            required
          />
        </Box>

        <TextField
          label="TypeOfVeichle"
          variant="filled"
          type="typeOfVeichle"
          value={formData.typeOfVeichle}
          onChange={handleChange("typeOfVeichle")}
          required
        />

        <TextField
          label="Id. No."
          variant="filled"
          value={formData.idNumber}
          onChange={handleChange("idNumber")}
          required
        />
        <Box sx={{ display: "flex", gap: 3 }}>
          <TextField
            label="Delivery Prefrence"
            variant="filled"
            type="number"
            value={formData.deliveryPref}
            onChange={handleChange("deliveryPref")}
            required
          />

          <TextField
            label="Work Prefrence"
            variant="filled"
            type="number"
            value={formData.workPref}
            onChange={handleChange("workPref")}
            required
          />
        </Box>
        <Box sx={{ display: "flex", gap: 3 }}>
          <TextField
            label="Zip-Code"
            variant="filled"
            value={formData.zipCode}
            onChange={handleChange("zipCode")}
            required
          />

          <TextField
            label="Rider Id"
            variant="filled"
            value={formData.riderId}
            onChange={handleChange("riderId")}
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
            + Add User
          </Typography>
        </Button>
      </Paper>
    </>
  );
};

export default EditRider;
