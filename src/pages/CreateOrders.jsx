import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AdminContext } from "../Context/AdminContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import DynamicMapEmbed from "../components/Common/DynamicEmbed";
import Autocomplete from "react-google-autocomplete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";

const CreateOrders = () => {
  setDefaults({
    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Your API key here.
    language: "en", // Default language for responses.
    region: "es", // Default region for responses.
  });

  const [orderData, setOrderData] = useState({
    pickupPoint_address: "",
    pickupPoint_number: "",
    delivery_address: "",
    delivery_number: "",
    package_type: "",
    parcel_value: "",
    pickupCoordinatesX: "",
    pickupCoordinatesY: "",
    deliveryCoordinatesX: "",
    deliveryCoordinatesY: "",
    typeOfVehicle: "",
  });

  const { createOrder } = useContext(AdminContext);
  const navigate = useNavigate();
  // console.log("DSDS",process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
  const handleOrderCreation = async () => {
    if (
      orderData.pickupCoordinatesX === "" ||
      orderData.pickupCoordinatesX === "" ||
      orderData.pickupCoordinatesY === "" ||
      orderData.deliveryCoordinatesX === "" ||
      orderData.deliveryCoordinatesY === ""
    )
      return;
    console.log(orderData);
    await createOrder(orderData);
    // navigate("/orders");
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const genLatAndLong = async (address) => {
    // generating random lat and long
    const response = await fromAddress(address);
    console.log(response);

    return { lat: Math.random() * 100, long: Math.random() * 100 };
  };
  const handlePickupAddress = async (address) => {
    try {
      if (address === "") return;
      console.log(address.formatted_address);
      const response = await fromAddress(address.formatted_address);
      const { lat, lng } = response.results[0].geometry.location;

      setOrderData((orderData) => {
        return {
          ...orderData,
          pickupPoint_address: address.formatted_address,
          pickupCoordinatesX: lat,
          pickupCoordinatesY: lng,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeliveryCoordinates = async (address) => {
    try {
      if (address === "") return;
      console.log(address.formatted_address);
      console.log("dsadasdad", orderData);
      const response = await fromAddress(address.formatted_address);
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);

      setOrderData((orderData) => {
        return {
          ...orderData,
          delivery_address: address.formatted_address,
          deliveryCoordinatesX: lat,
          deliveryCoordinatesY: lng,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handlePackageType = (event) => {
    setOrderData({ ...orderData, package_type: event.target.value });
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
        variant="h2"
        sx={{ my: 5, textAlign: "center", color: "white", fontWeight: 600 }}
      >
        Create a New Order
      </Typography>

      <Autocomplete
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        placeholder="Pickup Address"
        onPlaceSelected={(place) => handlePickupAddress(place)}
        style={{
          backgroundColor: "transparent",
          color: "grey",
          padding: 20,
          borderRadius: "10px",
        }}
      />

      {orderData?.pickupCoordinatesX !== "" &&
        orderData?.pickupCoordinatesY !== "" && (
          <DynamicMapEmbed
            latitude={orderData.pickupCoordinatesX}
            longitude={orderData.pickupCoordinatesY}
          />
        )}
      <TextField
        onChange={(e) =>
          setOrderData({ ...orderData, pickupPoint_number: e.target.value })
        }
        placeholder="Pickup Phone"
        variant="outlined"
        sx={{ border: `1px solid ${colors.grey[400]}`, borderRadius: "5px" }}
        required
      />

      <Autocomplete
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        placeholder="Delivery Address"
        onPlaceSelected={(place) => handleDeliveryCoordinates(place)}
        style={{
          backgroundColor: "transparent",
          color: "grey",
          padding: 10,
          borderRadius: "10px",
          padding: 20,
        }}
      />

      {orderData?.deliveryCoordinatesX !== "" &&
        orderData?.deliveryCoordinatesY !== "" && (
          <DynamicMapEmbed
            latitude={orderData.deliveryCoordinatesX}
            longitude={orderData.deliveryCoordinatesY}
          />
        )}
      <TextField
        onChange={(e) =>
          setOrderData({ ...orderData, delivery_number: e.target.value })
        }
        placeholder="Delivery Phone"
        variant="outlined"
        sx={{ border: `1px solid ${colors.grey[400]}`, borderRadius: "5px" }}
        required
      />
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ flexBasis: "50%" }}>
          <FormControl fullWidth variant="filled">
            <InputLabel id="demo-simple-select-label">Package Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={orderData.package_type}
              label="Package Type"
              onChange={handlePackageType}
              required
            >
              <MenuItem value={"Document"}>Document</MenuItem>
              <MenuItem value={"Food"}>Food</MenuItem>
              <MenuItem value={"Cloth"}>Cloth</MenuItem>
              <MenuItem value={"Groceries"}>Groceries</MenuItem>
              <MenuItem value={"Flower"}>Flower</MenuItem>
              <MenuItem value={"Cake"}>Cake</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          onChange={(e) =>
            setOrderData({ ...orderData, parcel_value: e.target.value })
          }
          placeholder="Parcel Value"
          variant="outlined"
          sx={{
            border: `1px solid ${colors.grey[400]}`,
            borderRadius: "5px",
            flexBasis: "50%",
          }}
          type="number"
          required
        />
      </Box>

      <TextField
        onChange={(e) =>
          setOrderData({ ...orderData, typeOfVehicle: e.target.value })
        }
        placeholder="Type of Vehicle"
        variant="outlined"
        sx={{ border: `1px solid ${colors.grey[400]}`, borderRadius: "5px" }}
        required
      />

      <Button
        sx={{
          display: "block",
          borderRadius: "5px",
          border: `1px solid ${colors.yellowAccent[500]}`,
          "&:hover": {
            border: `1px solid ${colors.yellowAccent[500]}`,
            backgroundColor: colors.yellowAccent[500],
          },
          px: 2,
          py: 1,
          background: colors.yellowAccent[500],
        }}
        onClick={handleOrderCreation}
        variant="contained"
      >
        {" "}
        <Typography variant="h5" sx={{}}>
          Create Order
        </Typography>
      </Button>

      {/* Assuming DynamicMapEmbed is a component that accepts latitude and longitude props */}
    </Box>
  );
};

export default CreateOrders;
