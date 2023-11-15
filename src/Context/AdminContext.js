import { createContext, useContext, useEffect, useState } from "react";
import { deliveryEntries } from "../mockdata/data";
import { AuthContext } from "./AuthContext";
import { ordersArray } from "../mockdata/data";

export const AdminContext = createContext({
  riderList: [],
  ordersList: [],
  addRider: async () => {},
  removeRider: async() => {},
  createOrder:async (
    pickupAddress,
    pickupPhone,
    deliveryAddress,
    deliveryPhone,
    packageType,
    parcelValue,
    userId,
    pickupCoordinatesX,
    pickupCoordinatesY,
    deliveryCoordinatesX,
    deliveryCoordinatesY,
    typeOfVehicle
  ) => {},
  assignOrders:async (riderId) => {},
  check : async (checkIn,checkOut,date)=> {}
});

export default function AdminContextProvider({ children }) {
  const [riderList, setRiderList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const { userDetails } = useContext(AuthContext);
  useEffect(() => {
    fetchRiders();
    fetchOrders();
  }, []);
  const fetchRiders = async () => {
    try {
      // call api to fetch riders
      setRiderList(deliveryEntries);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchOrders = async () => {
    // call api
    setOrdersList(ordersArray);
  };
  const addRider = async (name) => {
    try {
      console.log(name, userDetails);
      if (userDetails === null || userDetails.role !== 0) return;
      // call the api here for the rider

      setRiderList((prev) => [
        {
          index: riderList.length,
          riderId: Math.random() * 10,
          orderPending: null,
          riderName: name,
          checkInTime: null,
          checkOutTime: null,
        },
        ...prev,
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const removeRider = async (riderId) => {
    try {
      if (userDetails === null || userDetails.role !== 0) return;
      console.log("hii");
      //call the api
      setRiderList((prev) => prev.filter((rider) => rider.riderId !== riderId));
    } catch (err) {
      console.log(err);
    }
  };

  const check = async (checkIn, checkOut, date) => {
    console.log("you checked in");
  };

  async function createOrder(
    pickupAddress,
    pickupPhone,
    deliveryAddress,
    deliveryPhone,
    packageType,
    parcelValue,
    userId,
    pickupCoordinatesX,
    pickupCoordinatesY,
    deliveryCoordinatesX,
    deliveryCoordinatesY,
    typeOfVehicle
  ) {
    const order = {
      pickupPoint_address: pickupAddress,
      pickupPoint_phone: pickupPhone,
      deliveryPoint_address: deliveryAddress,
      deliveryPoint_phone: deliveryPhone,
      package_type: packageType,
      parcel_value: parcelValue,
      userId: userId,
      pickupCoordinatesX: pickupCoordinatesX,
      pickupCoordinatesY: pickupCoordinatesY,
      deliveryCoordinatesX: deliveryCoordinatesX,
      deliveryCoordinatesY: deliveryCoordinatesY,
      typeOfVehicle: typeOfVehicle,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setOrdersList([order, ...ordersList]);

    return order;
  }

  const assignOrders = async (riderId) => {
    try {
      //call the api here
      console.log("orderAssigned");
    } catch (err) {
      console.log(err);
    }
  };
  const val = {
    riderList,
    ordersList,
    addRider,
    removeRider,
    createOrder,
    assignOrders,
    check,
  };
  return <AdminContext.Provider value={val}>{children}</AdminContext.Provider>;
}
