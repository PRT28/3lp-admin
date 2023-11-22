import React from "react";
import Navbar from "../components/Common/Navbar";
import { Container } from "@mui/material";
import Header from "../components/Common/Header";
import RiderTable from "../components/Common/RiderTable";
import Footer from "../components/Common/Footer";
import SubHeader from "../components/Common/SubHeader";
import OrdersTable from "../components/Common/OrdersTable";
import {Typography} from "@mui/material";

const Orders = () => {
  return (
    <Container>
      <Navbar />
      <Header />{" "}
      <Typography variant="h4" sx={{ fontWeight: 600, mt: 5 }}>
        {" Order's List"}
      </Typography>
      <OrdersTable />
      <Footer />
    </Container>
  );
};

export default Orders;
