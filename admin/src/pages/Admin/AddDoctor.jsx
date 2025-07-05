import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
// ADD this import at the top with others
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // 👈 for icons

const AddDoctor = () => {
  const Upload_area = assets.upload_area;

  const [docImg, setDocImg] = React.useState(null); // store the file for uploading
  const [preview, setPreview] = React.useState(null); // store preview image URL

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [experience, setExperience] = React.useState("1 year");
  const [address1, setAddress1] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [speciality, setSpeciality] = React.useState("General physician");
  const [degree, setDegree] = React.useState("");
  const [fees, setFees] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const { backendurl, aToken } = React.useContext(AdminContext);
  // ADD this state before return (anywhere inside the component)
  const [showPassword, setShowPassword] = React.useState(false); // 👈 new state

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Please upload doctor image");
      }
      const formData = new FormData();
      formData.append("imageFile", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);

      formData.append(
        "address1",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("phone", phone);

      formData.append("fees", Number(fees));
      formData.append("about", about);

      //console.log(formData);
      console.log("----- Form Data to be submitted -----");
      for (let [key, value] of formData.entries()) {
        if (key === "image") {
          console.log(`${key}:`, value.name); // show filename
        } else {
          console.log(`${key}:`, value);
        }
      }

      const token = localStorage.getItem("aToken");
      console.log("Token from localStorage:", token); // Check if token exists

      const { data } = await axios.post(
        `${backendurl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            aToken: token, // send latest token
          },
        }
      );

      if (data.success) {
        toast.success(data.message);

        setDocImg(null);
        setPreview(null);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 year");
        setAddress1("");
        setAddress2("");
        setSpeciality("General physician");
        setDegree("");
        setFees("");
        setAbout("");
        setPhone("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="bg-white p-8 rounded-xl shadow-md w-full max-w-5xl mx-auto mt-8"
    >
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Doctor</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Upload Section */}
        <div className="flex flex-col items-center justify-start w-full lg:w-1/3 gap-2">
          <label
            htmlFor="doc-img"
            className="w-32 h-32 border-2 border-dashed border-gray-400 flex items-center justify-center rounded-full cursor-pointer hover:border-blue-500 transition overflow-hidden"
          >
            {preview ? (
              <img
                src={preview}
                alt="doctor"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <Upload_area className="text-4xl text-gray-500" />
            )}
          </label>

          <input
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setDocImg(file); // ✅ store actual file
                setPreview(URL.createObjectURL(file)); // ✅ generate preview
              }
            }}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="text-sm text-gray-600">Upload doctor picture</p>
        </div>

        {/* Form Fields */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Doctor name</label>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              type="text"
              placeholder="Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Doctor Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              placeholder="Your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 mb-1">Doctor Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type={showPassword ? "text" : "password"} // 👈 dynamic type
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
            />
            <div
              onClick={() => setShowPassword(!showPassword)} // 👈 toggle show/hide
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Speciality</label>
            <select
              onChange={(e) => {
                setSpeciality(e.target.value);
              }}
              value={speciality}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>General physician</option>
              <option>Gynecologist</option>
              <option>Dermatologist</option>
              <option>Pediatrician</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Education</label>
            <input
              onChange={(e) => {
                setDegree(e.target.value);
              }}
              value={degree}
              type="text"
              placeholder="Education"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Address</label>
            <input
              onChange={(e) => {
                setAddress1(e.target.value);
              }}
              value={address1}
              type="text"
              placeholder="Address 1"
              className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              onChange={(e) => {
                setAddress2(e.target.value);
              }}
              value={address2}
              type="text"
              placeholder="Address 2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Experience</label>
            <select
              onChange={(e) => {
                setExperience(e.target.value);
              }}
              value={experience}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>1+ years</option>
              <option>3+ years</option>
              <option>5+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Phone</label>
            <input
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              value={phone}
              type="tel"
              placeholder="Phone number"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Fees</label>
            <input
              onChange={(e) => {
                setFees(e.target.value);
              }}
              value={fees}
              type="number"
              placeholder="Your fees"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      {/* About Me */}
      <div className="mt-6">
        <label className="block text-gray-700 mb-1">About me</label>
        <textarea
          onChange={(e) => {
            setAbout(e.target.value);
          }}
          value={about}
          placeholder="Write about yourself"
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
      >
        Add doctor
      </button>
    </form>
  );
};

export default AddDoctor;

//7.57
