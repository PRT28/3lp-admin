import React from "react";
import Navbar from "../components/Common/Navbar";
import { Container } from "@mui/material";
import Header from "../components/Common/Header";
import RiderTable from "../components/Common/RiderTable";
import Footer from "../components/Common/Footer";
import SubHeader from "../components/Common/SubHeader";
const Home = () => {
  return (
    <Container>
      <Navbar />
      <Header />
      <SubHeader/>
      <RiderTable />
      <Footer/>
    </Container>
  );
};

export default Home;
