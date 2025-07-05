import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: "0000000000",
  },
  address: {
    type: Object,
    default: {
      line1: " ",
      line2: " ",
    },
  },
  gender: {
    type: String,
    default: "Not Selected",
  },
 dob: {
  type: Date, // ✅ correct type
  default: null,
},

  image: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },
});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
