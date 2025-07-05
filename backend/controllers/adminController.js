import validator from "validator";
import bcrypt from "bcrypt";
import Doctor from "../models/doctorModel.js";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

const addDoctor = async (req, res) => {
  try {
    console.log("Incoming fields:", req.body);
    console.log("Incoming file:", req.file);

    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      phone,
      available,
      address1,
    } = req.body;

    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ message: "Image file is missing" });
    }

    const parsedAddress = JSON.parse(address1);

    // Cloudinary upload
    let imageURL;
    try {
      const uploadRes = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageURL = uploadRes.secure_url;
    } catch (cloudErr) {
      console.error("Cloudinary upload failed:", cloudErr);
      return res.status(500).json({ message: "Image upload failed" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save doctor
    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      speciality,
      image: imageURL,
      degree,
      experience,
      about,
      fees,
      phone,
      available: available === "true",
      address: parsedAddress,
    });

    await newDoctor.save();

    return res
      .status(201)
      .json({ success: true, message: "Doctor added successfully" });
  } catch (err) {
    console.error("Error in addDoctor:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

//API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);

      res.json({ success: true, message: "Login successful", token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get all doctors list for admin panel

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, message: "Doctors list", doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get all appointments lists
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({}).select("-password");
    res.json({ success: true, message: "Appointments list", appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for appointment cancellation

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    // if (appointmentData.userId.toString() !== userId.toString()) {
    //   return res.json({
    //     success: false,
    //     message: "You are not authorized to cancel this appointment",
    //   });
    // }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked || {};
    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (slot) => slot !== slotTime
      );
    }

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get Dashboard data for admin panel
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    const appointments = await appointmentModel.find({})
      .sort({ date: -1 }) // latest first
      .limit(5)
      .select("-password");

    const users = await userModel.find({}).select("-password");

    // Calculate age for each appointment's user
    const latestAppointments = appointments.map((app) => {
      const user = app.userData || {};
      let age = "N/A";
      if (user.dob && user.dob !== "Not Selected") {
        const birthYear = new Date(user.dob).getFullYear();
        const thisYear = new Date().getFullYear();
        age = thisYear - birthYear;
      }
      return {
        ...app.toObject(),
        userData: {
          ...user,
          age,
        },
      };
    });

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments,
    };

    res.json({ success: true, message: "Dashboard data", dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
};
