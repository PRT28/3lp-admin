import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AdminContext } from "../Context/AdminContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

const CreateOrders = () => {

  const [pickupAddress, setPickupAddress] = useState("");
  const [pickupPhone, setPickupPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [packageType, setPackageType] = useState("");
  const [parcelValue, setParcelValue] = useState("");
  const [userId, setUserId] = useState("");
  const [pickupCoordinatesX, setPickupCoordinatesX] = useState("");
  const [pickupCoordinatesY, setPickupCoordinatesY] = useState("");
  const [deliveryCoordinatesX, setDeliveryCoordinatesX] = useState("");
  const [deliveryCoordinatesY, setDeliveryCoordinatesY] = useState("");
  const [typeOfVehicle, setTypeOfVehicle] = useState("");

  const { createOrder } = useContext(AdminContext);
  const navigate = useNavigate();
  const handleOrderCreation = async () => {
    await createOrder(
      pickupAddress,
      pickupPhone,
      deliveryAddress,
      deliveryPhone,
      packageType,
      parseInt(parcelValue), 
      userId,
      parseFloat(pickupCoordinatesX),
      parseFloat(pickupCoordinatesY),
      parseFloat(deliveryCoordinatesX),
      parseFloat(deliveryCoordinatesY),
      typeOfVehicle
    );
    navigate("/orders")
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "40%",
        mx: "auto",
        gap: 2,
        my: 3,
      }}
    >
      <Typography
        variant="h2"
        sx={{ my: 5, textAlign: "center", color: "white", fontWeight: 600 }}
      >
        Create a New Order 
      </Typography>

      {/* Add more fields as needed based on the OrderSchema */}
      <TextField
        onChange={(e) => setPickupAddress(e.target.value)}
        placeholder="Pickup Address"
        variant="outlined"
        sx={{border:`1px solid ${colors.grey[400]}`,borderRadius:"10px"}}
        required
      />
      <TextField
        onChange={(e) => setPickupPhone(e.target.value)}
        placeholder="Pickup Phone"
        variant="outlined"
        sx={{border:`1px solid ${colors.grey[400]}`,borderRadius:"10px"}}
        required
      />
      <TextField
        onChange={(e) => setDeliveryAddress(e.target.value)}
        placeholder="Delivery Address"
        variant="outlined"
        sx={{border:`1px solid ${colors.grey[400]}`,borderRadius:"10px"}}
        required
      />
      <TextField
        onChange={(e) => setDeliveryPhone(e.target.value)}
        placeholder="Delivery Phone"
        variant="outlined"
        sx={{border:`1px solid ${colors.grey[400]}`,borderRadius:"10px"}}
        required
      />
      <TextField
        onChange={(e) => setPackageType(e.target.value)}
        placeholder="Package Type"
        variant="outlined"
        sx={{border:`1px solid ${colors.grey[400]}`,borderRadius:"10px"}}
        required
      />
      <TextField
        onChange={(e) => setParcelValue(e.target.value)}
        placeholder="Parcel Value"
        variant="outlined"
        sx={{border:`1px solid ${colors.grey[400]}`,borderRadius:"10px"}}
        type="number"
        required
      />
      <TextField
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
        variant="outlined"
        sx={{border:`1px solid ${colors.grey[400]}`,borderRadius:"10px"}}
        required
      />
      <TextField
        onChange={(e) => setPickupCoordinatesX(e.target.value)}
        placeholder="Pickup Coordinates (X)"
        variant="outlined"
        sx={{border:`1px solid ${colors.grey[400]}`,borderRadius:"10px"}}
        type="number"
        required
      />
      <TextField
        onChange={(e) => setPickupCoordinatesY(e.target.value)}
        placeholder="Pickup Coordinates (Y)"
        variant="outlined"
        sx={{border:`1px solid ${colors.grey[400]}`,borderRadius:"10px"}}
        type="number"
        required
      />
      <TextField
        onChange={(e) => setDeliveryCoordinatesX(e.target.value)}
        placeholder="Delivery Coordinates (X)"
        variant="outlined"
        sx={{border:`1px solid ${colors.grey[400]}`,borderRadius:"10px"}}
        type="number"
        required
      />
      <TextField
        onChange={(e) => setDeliveryCoordinatesY(e.target.value)}
        placeholder="Delivery Coordinates (Y)"
        variant="outlined"
        sx={{border:`1px solid ${colors.grey[400]}`,borderRadius:"10px"}}
        type="number"
        required
      />
      <TextField
        onChange={(e) => setTypeOfVehicle(e.target.value)}
        placeholder="Type of Vehicle"
        variant="outlined"
        sx={{border:`1px solid ${colors.grey[400]}`,borderRadius:"10px"}}
        required
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
            onClick={handleOrderCreation} variant="contained"
          >
            {" "}
            <Typography variant="h5" sx={{}}>
              Create Order
            </Typography>
          </Button>
  
    </Box>
  );
};

export default CreateOrders;
