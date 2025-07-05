import React from "react";
import { createContext } from "react";
import { doctors } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = React.useState([]);

  const [token, setToken] = React.useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );

  const [userData, setUserData] = React.useState(false);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/user/get-profile`, {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    doctors,
    getDoctorsData,
    setDoctors,
    token,
    setToken,
    backendurl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  React.useEffect(() => {
    getDoctorsData();
  }, []);

  React.useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
