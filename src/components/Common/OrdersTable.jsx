import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";
import { Button } from "@mui/material";
import { Modal, Typography, TextField, Box } from "@mui/material";
import { useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import {useTheme} from "@mui/material";
import { tokens } from "../../theme";

export default function OrdersTable() {
  const { ordersList } = useContext(AdminContext);
  const { signOut, userDetails } = useContext(AuthContext);
  const { addRider ,assignOrders} = useContext(AdminContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Id, setId] = useState("");

  const handleAssignOrder = async () => {
    await assignOrders(Id);
    handleClose();
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <TableContainer component={Paper} sx={{ mt: 2, background: colors.primary[500]}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead  sx={{ background: colors.primary[600] }}>
          <TableRow>
            <TableCell sx={{ fontSize: "24px" }}>Sr No</TableCell>
            <TableCell sx={{ fontSize: "24px" }}>Order ID</TableCell>
            <TableCell sx={{ fontSize: "24px" }} align="right">
              Pickup Address
            </TableCell>
            <TableCell sx={{ fontSize: "24px" }} align="right">
              Pickup Phone
            </TableCell>
            <TableCell sx={{ fontSize: "24px" }} align="right">
              Delivery Address
            </TableCell>
            <TableCell sx={{ fontSize: "24px" }} align="right">
              Delivery Phone
            </TableCell>
            <TableCell sx={{ fontSize: "24px" }} align="right">
              Package Type
            </TableCell>
            <TableCell sx={{ fontSize: "24px" }} align="right">
              Parcel Value
            </TableCell>
            <TableCell sx={{ fontSize: "24px" }} align="right">
              User ID
            </TableCell>
            <TableCell sx={{ fontSize: "24px" }} align="right">
              Pickup Coordinates (X)
            </TableCell>
            <TableCell sx={{ fontSize: "24px" }} align="right">
              Pickup Coordinates (Y)
            </TableCell>
            <TableCell sx={{ fontSize: "24px" }} align="right">
              Delivery Coordinates (X)
            </TableCell>
            <TableCell sx={{ fontSize: "24px" }} align="right">
              Delivery Coordinates (Y)
            </TableCell>
            <TableCell sx={{ fontSize: "24px" }} align="right">
              Type of Vehicle
            </TableCell>
            <TableCell sx={{ fontSize: "24px" }} align="right">
              Created At
            </TableCell>
            <TableCell sx={{ fontSize: "24px" }} align="right">
              Updated At
            </TableCell>
            <TableCell sx={{ fontSize: "24px" }} align="right">
              Assign Order
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersList.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{row.orderId ?? "--"}</TableCell>
              <TableCell align="right">{row.pickupPoint_address}</TableCell>
              <TableCell align="right">{row.pickupPoint_phone}</TableCell>
              <TableCell align="right">{row.deliveryPoint_address}</TableCell>
              <TableCell align="right">{row.deliveryPoint_phone}</TableCell>
              <TableCell align="right">{row.package_type}</TableCell>
              <TableCell align="right">{row.parcel_value}</TableCell>
              <TableCell align="right">{row.userId}</TableCell>
              <TableCell align="right">{row.pickupCoordinatesX}</TableCell>
              <TableCell align="right">{row.pickupCoordinatesY}</TableCell>
              <TableCell align="right">{row.deliveryCoordinatesX}</TableCell>
              <TableCell align="right">{row.deliveryCoordinatesY}</TableCell>
              <TableCell align="right">{row.typeOfVehicle}</TableCell>
              <TableCell align="right">
                {row.createdAt?.toString() ?? "--"}
              </TableCell>
              <TableCell align="right">
                {row.updatedAt?.toString() ?? "--"}
              </TableCell>
              <TableCell align="right">
              <Button
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    "&:hover": { backgroundColor: colors.blueAccent[800] },
                  }}
                  variant="contained"
                >
                  Assign Order
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            p: 5,
            background: "white",
            width: "fit-content",
            mx: "auto",
            my: 10,
            borderRadius: "30px",
          }}
        >
          <Typography sx={{ color: "#6C63FF", fontWeight: 600 }} variant="h4">
            Enter the id of Rider
          </Typography>
          <TextField
            onChange={(e) => setId(e.target.value)}
            label="Rider's id"
            variant="outlined"
            type="text"
            sx={{ width: "100%" }}
          />
          <Button
            sx={{ display: "block", mx: "auto", width: "100%", mt: 2 }}
            variant="contained"
            onClick={handleAssignOrder}
          >
            {" "}
             Assign Order to Rider
          </Button>
        </Box>
      </Modal>
    </TableContainer>
  );
}
