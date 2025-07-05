import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = React.createContext();

const DoctorContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = React.useState(
    localStorage.getItem("dToken") || null
  );
  const [profileData, setProfileData] = React.useState({});

  const [appointments, setAppointments] = React.useState([]);
  const [dashData, setDashData] = React.useState({});
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendurl}/api/doctor/appointments`,
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        }
      );
      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/doctor/complete-appointment`,
        {
          appointmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/doctor/cancel-appointment`,
        {
          appointmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/doctor/dashboard`, {
        headers: {
          Authorization: `Bearer ${dToken}`,
        },
      });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/doctor/profile`, {
        headers: {
          Authorization: `Bearer ${dToken}`,
        },
      });
      if (data.success) {
        setProfileData(data.profileData);
        console.log(data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    backendurl,
    dToken,
    setDToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    getDashData,
    profileData,
    getProfileData,
    setProfileData,
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;

//13.55 hr
