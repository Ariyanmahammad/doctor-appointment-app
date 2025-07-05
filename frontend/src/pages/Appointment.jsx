import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, getDoctorsData, backendurl, token } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState({});
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info);
    if (info && info._id) {
      getAvailableSlots(info);
    }
  };

  const getAvailableSlots = async (doc = docInfo) => {
    const today = new Date();
    const slotsByDay = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);

      const pad = (n) => (n < 10 ? "0" + n : n);
      const dayNum = pad(day.getDate());
      const month = pad(day.getMonth() + 1);
      const year = day.getFullYear();
      const slotDate = `${dayNum}-${month}-${year}`;

      const dateLabel = {
        day: day.toLocaleDateString("en-US", { weekday: "short" }),
        date: day.getDate(),
        month: month,
      };

      const startTime = new Date(day.setHours(10, 0, 0, 0));
      const endTime = new Date(day.setHours(21, 0, 0, 0));

      let current = new Date(startTime);
      const timeSlots = [];

      while (current < endTime) {
        const formattedTime = current.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).toLowerCase();

        const isSlotBooked = doc?.slots_booked?.[slotDate]?.includes(formattedTime);
        if (!isSlotBooked) timeSlots.push(formattedTime);
        current.setMinutes(current.getMinutes() + 30);
      }

      slotsByDay.push({ date: dateLabel, slots: timeSlots });
    }

    setDocSlots(slotsByDay);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book an appointment");
      return navigate("/login");
    }

    try {
      const today = new Date();
      today.setDate(today.getDate() + slotIndex);
      const pad = (n) => (n < 10 ? "0" + n : n);
      const slotDate = `${pad(today.getDate())}-${pad(today.getMonth() + 1)}-${today.getFullYear()}`;

      const { data } = await axios.post(
        `${backendurl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo?._id) getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    if (docSlots.length > 0 && docSlots[slotIndex]) {
      setSlotTime(docSlots[slotIndex].slots[0]);
    }
  }, [docSlots, slotIndex]);

  if (!docInfo) return null;

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-lg border border-gray-200 space-y-8 my-10">
      {/* Doctor Info Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="w-40 h-40 rounded-xl overflow-hidden border shadow-sm">
          <img src={docInfo.image} alt={docInfo.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            {docInfo.name}
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-11-1v5h2v-5h-2zm0-4v2h2V7h-2z" />
            </svg>
          </h2>
          <p className="text-base text-gray-700">
            {docInfo.degree} — {docInfo.speciality}
          </p>
          <p className="text-sm text-gray-500 italic">{docInfo.experience}</p>
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0a12 12 0 1 0 0 24A12 12 0 0 0 12 0zM11 10h2v7h-2v-7zm0-4h2v2h-2V6z" />
              </svg>
              About
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{docInfo.about}</p>
          </div>
          <p className="text-sm font-semibold text-gray-800">
            Appointment Fee: <span className="text-blue-600 font-bold">₹{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Date Slot Selection */}
      <div className="space-y-3">
        <p className="font-semibold text-gray-800">Select Date</p>
        <div className="flex flex-wrap gap-3">
          {docSlots.map((slot, index) => (
            <button
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${
                slotIndex === index
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {slot.date.day}, {slot.date.date}/{slot.date.month}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slot Selection */}
      <div className="space-y-3">
        <p className="font-semibold text-gray-800">Select Time</p>
        <div className="flex flex-wrap gap-3">
          {docSlots[slotIndex]?.slots.map((slot, index) => (
            <button
              key={index}
              onClick={() => setSlotTime(slot)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${
                slotTime === slot
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Book Button */}
      <div className="text-center pt-2">
        <button
          onClick={bookAppointment}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition duration-300"
        >
          Book Appointment
        </button>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
