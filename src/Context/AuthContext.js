import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  signIn: () => {},
  signOut: () => {},
  userDetails: null,
});

export default function AuthContextProvider({ children }) {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails")) ?? null
  );
  const navigate = useNavigate();

  useEffect(()=> {
    if(userDetails===null || !userDetails.authState) {
        navigate("/login");
    }
    else {
      navigate("/")
    }
  },[userDetails])

  const signIn = async (email,password) => {
    try {
      // todo : call the auth api here and get the token+userdetails for the authentication
      // todo : save to details to localstorage/cookies for persistent auth
      const dummyUserDetails = {
        email: "admin#example.com",
        role: 0,
        authState: true,
        jwtToken: "",
      };
      localStorage.setItem("userDetails", JSON.stringify(dummyUserDetails));
      setUserDetails(dummyUserDetails);
    } catch (err) {
      console.log(err);
    }
  };

  const signOut = async () => {
    try {
      // call to the log out api here..
      localStorage.removeItem("userDetails");
      setUserDetails(null);
    } catch (err) {
      console.log(err);
    }
  };

  const contextValue = {
    signIn,
    signOut,
    userDetails,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
