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
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { FACILYTS_BASE_URL } from "../../Configs";
import axios from "axios";

export default function OrdersTable() {
  const { ordersList } = useContext(AdminContext);
  const { authToken } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [Id, setId] = useState("");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [riders, setRiders] = useState(undefined);
  const assignOrders = async (orderId) => {
    try {
      setOpen(true);
      setRiders([]);
      const response = await axios.get(
        `${FACILYTS_BASE_URL}/assign/getrider?orderId=${orderId}`,
        {
          headers: { Authorization: authToken },
        }
      );
      setRiders(response.data.content.riderdetails);
    } catch (err) {
      console.log(err);
      setRiders(undefined);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setRiders(undefined);
  };
  const handleAssignOrder = async () => {
    await assignOrders(Id);
    handleClose();
  };

  console.log(riders);
  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 2, background: colors.primary[500] }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ background: colors.primary[600] }}>
          <TableRow>
            <TableCell sx={{ fontSize: "1.125em" }}>Sr No</TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              Pickup Address
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              Pickup Phone
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              Delivery Address
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              Delivery Phone
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              Package Type
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              Parcel Value
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              User ID
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              Pickup Coordinates (X)
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              Pickup Coordinates (Y)
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              Delivery Coordinates (X)
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              Delivery Coordinates (Y)
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              Type of Vehicle
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              Created At
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
              Updated At
            </TableCell>
            <TableCell sx={{ fontSize: "1.125em" }} align="right">
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

              <TableCell align="right">{row.pickupPoint_address}</TableCell>
              <TableCell align="right">{row.pickupPoint_number}</TableCell>
              <TableCell align="right">{row.delivery_address}</TableCell>
              <TableCell align="right">{row.delivery_number}</TableCell>
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
                  onClick={() => assignOrders(row._id)}
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
            background: colors.primary[500],
            width: "fit-content",
            mx: "auto",
            my: 10,
            borderRadius: "30px",
          }}
        >
          <Typography
            sx={{ fontWeight: 600, color: colors.yellowAccent[500], mb: 2 }}
            variant="h2"
          >
            Available Riders
          </Typography>
          <Box sx={{ my: 2,textAlign:"center" }}>
            {!riders && " No riders are available :("}
            {riders && riders.length==0 && "Loading.."} 
            {riders?.map((rider, index) => {
              return (
                <Paper sx={{background:colors.primary[600],p:1,cursor:"pointer"}} key={index}>
                  <Typography sx={{textAlign:"center"}} variant="h3">{rider.username}</Typography>
                </Paper>
              );
            })}
          </Box>
         
        </Box>
      </Modal>
    </TableContainer>
  );
}
