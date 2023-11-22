import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FACILYTS_BASE_URL } from "../Configs";
import Cookies from "js-cookie";
// SUPER ADMIN = 0
// ADMIN = 1
// REGIONAL MANAGERS = 2
// RIDERS = 3

export const AuthContext = createContext({
  authToken: undefined,
  signIn: () => {},
  signOut: () => {},
  userDetails: null,
  registerUser: (data) => {},
});

export default function AuthContextProvider({ children }) {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails")) ?? null
  );
  const navigate = useNavigate();

  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  console.log(authToken);
  useEffect(() => {
    console.log(authToken);
    if (authToken === undefined) {
      navigate("/login");
    } else {
      console.log("hii " + authToken);
      navigate("/");
    }
  }, [authToken]);

  const registerUser = async (data) => {
    try {
      const response = await axios.post(
        `${FACILYTS_BASE_URL}/auth/register`,
        data
      );
      Cookies.set("authToken", response.data.content.token);
      setAuthToken(response.data.content.token);
      localStorage.setItem(
        "userDetails",
        JSON.stringify(response.data.content.user)
      );
      setUserDetails(response.data.content.user);
    } catch (err) {
      console.log(err);
    }
  };
  const signIn = async (email, password) => {
    try {
      const response = await axios.post(`${FACILYTS_BASE_URL}/auth/login`, {
       numberOrEmail : email,
        password,
      });
      Cookies.set("authToken", response.data.content.token);
      setAuthToken(response.data.content.token);
      localStorage.setItem(
        "userDetails",
        JSON.stringify(response.data.content.user)
      );
      setUserDetails(response.data.content.user);
    } catch (err) {
      console.log(err);
    }
  };

  const signOut = async () => {
    try {
      // call to the log out api here..
      localStorage.removeItem("userDetails");
      Cookies.remove("authToken");
      setUserDetails(null);
      setAuthToken(undefined);
    } catch (err) {
      console.log(err);
    }
  };

  const contextValue = {
    authToken,
    signIn,
    signOut,
    userDetails,
    registerUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
