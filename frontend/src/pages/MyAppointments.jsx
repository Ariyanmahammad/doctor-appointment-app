import React from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendurl, token, getDoctorsData } = React.useContext(AppContext);
  const [appointments, setAppointments] = React.useState([]);
  const navigate = useNavigate();

  const getUsersAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointments = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUsersAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const verifyBody = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          const { data } = await axios.post(
            `${backendurl}/api/user/verifyRazorpay`,
            verifyBody,
            { headers: { token } }
          );

          if (data.success) {
            toast.success(data.message);
            getUsersAppointments();
            navigate("/my-appointments");
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    if (token) {
      getUsersAppointments();
      getDoctorsData();
    }
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-blue-800 mb-10 text-center">
        My Appointments
      </h1>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments yet.</p>
      ) : (
        <div className="grid gap-6">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-sm rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-6 p-6 transition-all hover:shadow-md"
            >
              {/* Doctor Image */}
              <div className="w-24 h-24 rounded-full overflow-hidden border">
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Doctor Info */}
              <div className="flex-1 space-y-1">
                <p className="text-xl font-bold text-gray-800">
                  {item.docData.name}
                </p>
                <p className="text-sm text-gray-500">
                  {item.docData.speciality}
                </p>
                <p className="text-sm text-gray-500">
                  {item.docData.address.line1}, {item.docData.address.line2}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">
                    Date & Time:
                  </span>{" "}
                  {item.slotDate} at {item.slotTime}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 mt-4 md:mt-0">
                {item.cancelled ? (
                  <span className="bg-gray-400 text-white text-sm px-4 py-2 rounded-full text-center font-medium">
                    Cancelled
                  </span>
                ) : item.payment ? (
                  <span className="bg-green-500 text-white text-sm px-4 py-2 rounded-full text-center font-medium">
                    Paid
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => appointmentRazorpay(item._id)}
                      className="px-4 py-2 bg-blue-600 text-white cursor-pointer text-sm rounded-full hover:bg-blue-700 transition"
                    >
                      Pay Online
                    </button>
                    <button
                      onClick={() => cancelAppointments(item._id)}
                      className="px-4 py-2 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 cursor-pointer transition"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
