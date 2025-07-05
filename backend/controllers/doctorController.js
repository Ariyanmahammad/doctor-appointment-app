import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    res.json({ success: true, message: "Availability changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password -email");

    res.json({ success: true, message: "Doctors list", doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      return res.json({
        success: true,
        message: "Login successful",
        doctor,
        token,
      });
    } else {
      return res.json({ success: false, message: "Incorrect password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get doctor apppointments
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docId; // ✅ from token

    const appointments = await appointmentModel
      .find({ docId })
      .select("-password");

    res.json({ success: true, message: "Appointments list", appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to cancel an appointment for doctor panel
const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.docId;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId.toString() === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({
        success: true,
        message: "Appointment marked as completed",
      });
    } else {
      return res.json({
        success: false,
        message: "You are not authorized to mark this appointment as completed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.docId;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId.toString() === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({
        success: true,
        message: "Appointment marked as cancelled",
      });
    } else {
      return res.json({
        success: false,
        message: "You are not authorized to mark this appointment as cancelled",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get dashboard for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId; // ✅ from token middleware

    const appointments = await appointmentModel
      .find({ docId })
      .select("-password");

    let earnings = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      appointments: appointments.length,
      earnings,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(-5),
    };

    res.json({ success: true, message: "Dashboard data", dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get doctor profile for doctor panel
const doctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const profileData = await doctorModel.findById(docId).select("-password");
    res.json({ success: true, message: "Profile data", profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to update doctor profile for doctor panel
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const { fees, address, available } = req.body;
    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailablity,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
