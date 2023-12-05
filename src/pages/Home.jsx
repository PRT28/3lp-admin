import React, { useState } from "react";
import Navbar from "../components/Common/Navbar";
import { Container, Paper } from "@mui/material";
import Header from "../components/Common/Header";
import RiderTable from "../components/Common/RiderTable";
import Footer from "../components/Common/Footer";
import SubHeader from "../components/Common/SubHeader";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import UserTable from "../components/Common/UserTable";

const Home = () => {
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Container>
      <Navbar />
      <Header />
      <Paper
        sx={{
          border: `1px solid ${colors.yellowAccent[500]}`,
          width: "fit-content",
          mx: "auto",
          mt: 3,
          display: "flex",
          borderRadius: "10px",
        }}
      >
        <Button
          sx={{
            display: "block",
            borderRadius: "10px",

            "&:hover": {
              backgroundColor: tab === 0 ? colors.yellowAccent[500] : "inherit",
            },
            px: 2,
            py: 1,
            background: tab === 0 ? colors.yellowAccent[500] : "inherit",
          }}
          variant="contained"
          onClick={() => setTab(0)}
        >
          {" "}
          <Typography variant="h5" sx={{}}>
            Rider List
          </Typography>
        </Button>
        <Button
          sx={{
            display: "block",
            borderRadius: "10px",

            "&:hover": {
              backgroundColor: tab === 1 ? colors.yellowAccent[500] : "inherit",
            },
            px: 2,
            py: 1,
            background: tab === 1 ? colors.yellowAccent[500] : "inherit",
          }}
          variant="contained"
          onClick={() => setTab(1)}
        >
          {" "}
          <Typography variant="h5" sx={{}}>
            User List
          </Typography>
        </Button>
      </Paper>
      {tab === 0 ? <RiderTable /> : <UserTable />}
      <Footer />
    </Container>
  );
};

export default Home;
