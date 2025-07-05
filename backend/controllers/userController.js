import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import { v2 as cloudinary } from "cloudinary";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";

//api to register user

const registerUser = async (req, res) => {
  try {
    const { name, email, password, dob, gender, address, phone } = req.body;

    if (!name || !email || !password || !dob || !gender || !address || !phone) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
      dob: new Date(dob),
      gender,
      address,
      phone,
      image: "https://cdn-icons-png.flaticon.com/128/149/149071.png", // ✅ fallback user image
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({
        success: true,
        message: "Login successful",
        user,
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

//API to get user profile data

const getProfile = async (req, res) => {
  try {
    const userId = req.userId; // ✅ safely extracted from middleware
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, message: "User profile", userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, address, phone, dob, gender } = req.body;
    const userId = req.userId;
    const imageFile = req.file;

    if (!name || !address || !phone) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // Validate and parse address
    let parsedAddress;
    try {
      parsedAddress = JSON.parse(address);
    } catch (err) {
      return res.json({ success: false, message: "Invalid address format" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const updateData = {
      name,
      address: parsedAddress,
      phone,
    };

    // Validate DOB (must be valid date string)
    if (dob && !isNaN(new Date(dob).getTime())) {
      updateData.dob = new Date(dob); // ✅ store as Date
    }

    if (gender) {
      updateData.gender = gender;
    }

    // Handle image upload if present
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
    }

    // Perform update
    await userModel.findByIdAndUpdate(userId, updateData);
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to book appointment

const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { docId, slotDate, slotTime } = req.body;

    // 1 Fetch doctor data
    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // ✅ 2 Check if this user already booked this same slot
    const existing = await appointmentModel.findOne({
      userId,
      docId,
      slotDate,
      slotTime,
      cancelled: { $ne: true }, // ✅ Ignore cancelled appointments
    });

    if (existing) {
      return res.json({
        success: false,
        message: "You have already booked this slot",
      });
    }

    // 3 Check or modify slots_booked
    let slots_booked = docData.slots_booked || {};

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot already booked" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    // 4 Fetch user and create snapshot
    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const appointmentData = {
      userId,
      docId,
      slotDate,
      slotTime,
      docData: { ...docData.toObject(), slots_booked: undefined },
      userData: userData.toObject(),
      amount: docData.fees,
      date: Date.now(),
    };

    // Save appointment
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    //  Save updated slot data
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get user appointments for frontend my-appointment page

const listAppointment = async (req, res) => {
  try {
    const userId = req.userId; // ✅ from authUser middleware

    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to cancel appointments
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData || !appointmentData.userId) {
      return res.json({ success: false, message: "Invalid appointment" });
    }

    if (appointmentData.userId.toString() !== userId.toString()) {
      return res.json({
        success: false,
        message: "You are not authorized to cancel this appointment",
      });
    }

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

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
//api to make payment for appointment using razor pay

const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Invalid or cancelled appointment",
      });
    }

    const options = {
      amount: appointmentData.amount * 100, // in paise
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    // Create Razorpay order
    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to verify to payment of razorpay
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    if (!razorpay_order_id) {
      return res.json({ success: false, message: "Missing order ID" });
    }

    const order_info = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (order_info.status === "paid") {
      await appointmentModel.findByIdAndUpdate(order_info.receipt, {
        payment: true,
      });

      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
};
