import React from "react";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Typography } from "@mui/material";

const bookingsArray = [
  {
    checkin_time: new Date("2023-01-01T12:00:00Z"),
    checkout_time: new Date("2023-01-03T10:00:00Z"),
    userId: "yourUserId1", // Replace with an actual user ID
    date: new Date("2023-01-01"),
  },
  {
    checkin_time: new Date("2023-02-01T14:00:00Z"),
    userId: "yourUserId2", // Replace with an actual user ID
    date: new Date("2023-02-01"),
  },
  {
    checkin_time: new Date("2023-03-01T15:30:00Z"),
    userId: "yourUserId3", // Replace with an actual user ID
    date: new Date("2023-03-01"),
    // checkout_time is not specified, so it will be null
    checkout_time: null,
  },
  // Add more objects as needed
];

const CalenderModal = ({ calenderData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  if (!calenderData || calenderData.length === 0) {
    return (
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          mt: 10,
          background: colors.primary[500],
          width: "fit-content",
          mx: "auto",
          p: 5,
          color: colors.yellowAccent[400],
          borderRadius: "20px",
        }}
      >
        No info Available for this rider
      </Typography>
    );
  }
  return (
    <Paper
      sx={{
        mx: "auto",
        mt: 10,
        borderRadius: "20px",
        width: "50%",
        p: 3,
        background: colors.primary[500],
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          mb: 2,
          fontWeight: 600,
          color: colors.yellowAccent[500],
        }}
      >
        CHECKIN DETAILS
      </Typography>
      <Table component={Paper} sx={{}} aria-label="simple table">
        <TableHead sx={{ background: colors.primary[600], width: "100%" }}>
          <TableRow>
            <TableCell sx={{ fontSize: "1.125em" }}>Sr No</TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="center">
              Checkin Time
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="center">
              Checkout Time
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="center">
              UserId
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="center">
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookingsArray.map((row, index) => (
            <TableRow
              key={index}
              sx={{ border: 0, background: colors.primary[500] }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>

              <TableCell align="center">
                {row.checkin_time.toLocaleString()}
              </TableCell>
              <TableCell align="center">
                {row.checkout_time?.toLocaleString() ?? "---"}
              </TableCell>
              <TableCell align="center">{row.userId}</TableCell>
              <TableCell align="center">{row.date.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default CalenderModal;
