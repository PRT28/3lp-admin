import { createContext, useContext, useEffect, useState } from "react";
import { deliveryEntries } from "../mockdata/data";
import { AuthContext } from "./AuthContext";
import { ordersArray } from "../mockdata/data";
import axios from "axios";
import { FACILYTS_BASE_URL } from "../Configs";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext({
  riderList: [],
  ordersList: [],
  userList: [],
  editRider: async (riderId, data) => {},
  removeRider: async () => {},
  createOrder: async (orderData) => {},
  assignOrders: async (riderId) => {},
  check: async (checkIn, checkOut, date) => {},
  addUsers: async (data) => {},
});

export default function AdminContextProvider({ children }) {
  const [riderList, setRiderList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const { userDetails, authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) return;
    fetchRiders();
    fetchOrders();
    fetchUsers();
  }, [authToken]);

  const fetchRiders = async () => {
    try {
      // call api to fetch riders
      const response = await axios.get(`${FACILYTS_BASE_URL}/auth?role=3`, {
        headers: { Authorization: `${authToken}` },
      });
      setRiderList(response.data.content.riders);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const admins = (
        await axios.get(`${FACILYTS_BASE_URL}/auth?role=1`, {
          headers: { Authorization: `${authToken}` },
        })
      ).data;
      const regionalManagers = (
        await axios.get(`${FACILYTS_BASE_URL}/auth?role=2`, {
          headers: { Authorization: `${authToken}` },
        })
      ).data;
      const superAdmins = (
        await axios.get(`${FACILYTS_BASE_URL}/auth?role=0`, {
          headers: { Authorization: `${authToken}` },
        })
      ).data;
      setUserList([
        ...admins.content.riders,
        ...regionalManagers.content.riders,
        ...superAdmins.content.riders,
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchOrders = async () => {
    const response = await axios.get(`${FACILYTS_BASE_URL}/order`, {
      headers: { Authorization: `${authToken}` },
    });
    setOrdersList(response.data.content.orders);
  };
  const editRider = async (id, data) => {
    try {
      // if (userDetails === null || userDetails.role !== 0) return;
      // // call the api here for the rider
      const response = await axios.post(
        `${FACILYTS_BASE_URL}/auth/rider/updateDetails/${id}`,
        {
          headers: { Authorization: `${authToken}` },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const addUsers = async (data) => {
    try {
      const response = await axios.post(
        `${FACILYTS_BASE_URL}/auth/register`,
        data
      );
      await fetchUsers();
      await fetchRiders();
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  };

  const removeRider = async (riderId) => {
    try {
      if (userDetails === null || userDetails.role !== 0) return;
      //call the api
      setRiderList((prev) => prev.filter((rider) => rider.riderId !== riderId));
    } catch (err) {
      console.log(err);
    }
  };

  const check = async (checkIn, checkOut, date) => {
    console.log("you checked in");
  };

  async function createOrder(orderData) {
    try {
      const response = await axios.post(
        `${FACILYTS_BASE_URL}/order/newOrder`,
        orderData,
        {
          headers: { Authorization: `${authToken}` },
        }
      );
      navigate("/orders");
      await fetchOrders();
    } catch (err) {
      console.log(err);
    }
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
    userList,
    editRider,
    removeRider,
    createOrder,
    assignOrders,
    check,
    addUsers,
  };
  return <AdminContext.Provider value={val}>{children}</AdminContext.Provider>;
}
