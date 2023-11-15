import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AdminContext } from "../Context/AdminContext";
import { useNavigate } from "react-router-dom";


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
        variant="h4"
        sx={{ my: 5, textAlign: "center", color: "#6C63FF", fontWeight: 600 }}
      >
        Create New Order 👇..
      </Typography>

      {/* Add more fields as needed based on the OrderSchema */}
      <TextField
        onChange={(e) => setPickupAddress(e.target.value)}
        label="Pickup Address"
        variant="outlined"
        required
      />
      <TextField
        onChange={(e) => setPickupPhone(e.target.value)}
        label="Pickup Phone"
        variant="outlined"
        required
      />
      <TextField
        onChange={(e) => setDeliveryAddress(e.target.value)}
        label="Delivery Address"
        variant="outlined"
        required
      />
      <TextField
        onChange={(e) => setDeliveryPhone(e.target.value)}
        label="Delivery Phone"
        variant="outlined"
        required
      />
      <TextField
        onChange={(e) => setPackageType(e.target.value)}
        label="Package Type"
        variant="outlined"
        required
      />
      <TextField
        onChange={(e) => setParcelValue(e.target.value)}
        label="Parcel Value"
        variant="outlined"
        type="number"
        required
      />
      <TextField
        onChange={(e) => setUserId(e.target.value)}
        label="User ID"
        variant="outlined"
        required
      />
      <TextField
        onChange={(e) => setPickupCoordinatesX(e.target.value)}
        label="Pickup Coordinates (X)"
        variant="outlined"
        type="number"
        required
      />
      <TextField
        onChange={(e) => setPickupCoordinatesY(e.target.value)}
        label="Pickup Coordinates (Y)"
        variant="outlined"
        type="number"
        required
      />
      <TextField
        onChange={(e) => setDeliveryCoordinatesX(e.target.value)}
        label="Delivery Coordinates (X)"
        variant="outlined"
        type="number"
        required
      />
      <TextField
        onChange={(e) => setDeliveryCoordinatesY(e.target.value)}
        label="Delivery Coordinates (Y)"
        variant="outlined"
        type="number"
        required
      />
      <TextField
        onChange={(e) => setTypeOfVehicle(e.target.value)}
        label="Type of Vehicle"
        variant="outlined"
        required
      />

      <Button onClick={handleOrderCreation} variant="contained">
        Create Order
      </Button>
    </Box>
  );
};

export default CreateOrders;
