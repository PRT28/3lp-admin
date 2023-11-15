import { createContext, useContext, useEffect, useState } from "react";
import { deliveryEntries } from "../mockdata/data";
import { AuthContext } from "./AuthContext";

export const AdminContext = createContext({
  riderList: [],
  addRider: () => {},
  removeRider: () => {},
});

export default function AdminContextProvider({ children }) {
  const [riderList, setRiderList] = useState([]);
  const {userDetails} = useContext(AuthContext);
  useEffect(() => {
    fetchRiders();
  }, []);
  const fetchRiders = async () => {
    try {
      // call api to fetch riders
      setRiderList(deliveryEntries);
    } catch (err) {
      console.log(err);
    }
  };
  const addRider = async (name) => {
    try {
        console.log(name,userDetails)
      if(userDetails===null || userDetails.role!==0) return;
      // call the api here for the rider
  
      setRiderList((prev) => [
        ...prev,
        {
          index: riderList.length,
          riderId: Math.random() * 10,
          orderPending: null,
          riderName: name,
          checkInTime: null,
          checkOutTime: null,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const removeRider = async (riderId) => {
    try {
      if(userDetails===null || userDetails.role!==0) return;
      //call the api
      setRiderList((prev) => prev.filter((rider) => rider.id !== riderId));
    } catch (err) {
      console.log(err);
    }
  };
  const val = { riderList, addRider, removeRider };
  return <AdminContext.Provider value={val}>{children}</AdminContext.Provider>;
}
