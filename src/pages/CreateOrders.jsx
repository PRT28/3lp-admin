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

setDefaults({
  key: "xxxxx", // Your API key here.
  language: "en", // Default language for responses.
  region: "es", // Default region for responses.
});

const CreateOrders = () => {
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

  const handleOrderCreation = async () => {
    if (
      orderData.pickupCoordinatesX === "" ||
      orderData.pickupCoordinatesX === "" ||
      orderData.pickupCoordinatesY === "" ||
      orderData.deliveryCoordinatesX === "" ||
      orderData.deliveryCoordinatesY === ""
    )
      return;
      console.log(orderData)
    await createOrder(orderData);
    // navigate("/orders");
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const genLatAndLong = async (address) => {
    // generating random lat and long
    return { lat: Math.random() * 100, long: Math.random() * 100 };
  };
  const handlePickupAddress = async (address) => {
    if (orderData.pickupPoint_address === "") return;
    const coordinates = await genLatAndLong(address);
    setOrderData({
      ...orderData,
      pickupCoordinatesX: coordinates.lat,
      pickupCoordinatesY: coordinates.long,
    });
  };

  const handleDeliveryCoordinates = async (address) => {
    if (orderData.delivery_address === "") return;
    const coordinates = await genLatAndLong(address);
    setOrderData({
      ...orderData,
      deliveryCoordinatesX: coordinates.lat,
      deliveryCoordinatesY: coordinates.long,
    });
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
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          onChange={(e) =>
            setOrderData({ ...orderData, pickupPoint_address: e.target.value })
          }
          placeholder="Pickup Address"
          variant="outlined"
          sx={{
            border: `1px solid ${colors.grey[400]}`,
            borderRadius: "5px",
            flexBasis: "80%",
          }}
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

            background: colors.yellowAccent[500],
          }}
          onClick={handlePickupAddress}
          variant="contained"
        >
          {" "}
          <Typography variant="h6" sx={{ textTransform: "none" }}>
            Generate Coordinates
          </Typography>
        </Button>
      </Box>
      {orderData.pickupCoordinatesX !== "" &&
        orderData.pickupCoordinatesY !== "" && (
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
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          onChange={(e) =>
            setOrderData({ ...orderData, delivery_address: e.target.value })
          }
          placeholder="Delivery Address"
          variant="outlined"
          sx={{
            border: `1px solid ${colors.grey[400]}`,
            borderRadius: "5px",
            flexBasis: "90%",
          }}
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

            background: colors.yellowAccent[500],
          }}
          onClick={handleDeliveryCoordinates}
          variant="contained"
        >
          {" "}
          <Typography variant="h6" sx={{ textTransform: "none" }}>
            Generate Coordinates
          </Typography>
        </Button>
      </Box>
      {orderData.deliveryCoordinatesX !== "" &&
        orderData.deliveryCoordinatesY !== "" && (
          <DynamicMapEmbed
            latitude={orderData.pickupCoordinatesX}
            longitude={orderData.pickupCoordinatesY}
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
      <TextField
        onChange={(e) =>
          setOrderData({ ...orderData, package_type: e.target.value })
        }
        placeholder="Package Type"
        variant="outlined"
        sx={{ border: `1px solid ${colors.grey[400]}`, borderRadius: "5px" }}
        required
      />
      <TextField
        onChange={(e) =>
          setOrderData({ ...orderData, parcel_value: e.target.value })
        }
        placeholder="Parcel Value"
        variant="outlined"
        sx={{ border: `1px solid ${colors.grey[400]}`, borderRadius: "5px" }}
        type="number"
        required
      />
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
