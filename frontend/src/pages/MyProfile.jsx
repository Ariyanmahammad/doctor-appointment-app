import React from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, backendurl, token, loadUserProfileData } =
    React.useContext(AppContext);
  const [isEdit, setIsEdit] = React.useState(false);

  const [image, setImage] = React.useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendurl}/api/user/update-profile`,
        formData,
        {
          headers: { token },
        }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (line, value) => {
    setUserData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [line]: value,
      },
    }));
  };

  return (
    userData && (
      <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white shadow-2xl rounded-3xl mt-10 border border-gray-200">
        {/* Profile Picture & Name */}
        <div className="flex items-center gap-6 mb-8">
          {isEdit ? (
            <label htmlFor="image" className="cursor-pointer">
              <div className="relative w-24 h-24">
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : userData?.image || assets.profile_pic
                  }
                  alt="Selected or Current"
                  className="w-24 h-24 rounded-full border border-gray-300 object-cover"
                />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              src={userData?.image || assets.profile_pic}
              alt="Profile"
              className="w-24 h-24 rounded-full border border-gray-300 object-cover"
            />
          )}

          <div className="flex-1">
            {isEdit ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="text-2xl font-semibold border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <h1 className="text-3xl font-bold text-gray-800">
                {userData.name}
              </h1>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label className="block font-medium text-gray-400 mb-1">
                Email
              </label>
              {isEdit ? (
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800">{userData.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block font-medium text-gray-400 mb-1">
                Phone
              </label>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800">{userData.phone}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="mt-6">
            <label className="block font-medium text-gray-400 mb-1">
              Address
            </label>
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) => handleAddressChange("line1", e.target.value)}
                  placeholder="Line 1"
                  className="mb-2 border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) => handleAddressChange("line2", e.target.value)}
                  placeholder="Line 2"
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            ) : (
              <p className="text-gray-800">
                {userData.address.line1}, {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        {/* Personal Info */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gender */}
            <div>
              <label className="block font-medium text-gray-400 mb-1">
                Gender
              </label>
              {isEdit ? (
                <select
                  value={userData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                <p className="text-gray-800">{userData.gender}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block font-medium text-gray-400 mb-1">
                Date of Birth
              </label>
              {isEdit ? (
                <input
                  type="date"
                  value={userData.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800">
                  {new Date(userData.dob).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center pt-4">
          <button
            onClick={() => {
              if (isEdit) {
                updateUserProfileData();
              } else {
                setIsEdit(true);
              }
            }}
            className={`px-8 py-3 rounded-full font-semibold shadow-md transition duration-300 ${
              isEdit
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isEdit ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    )
  );
};

export default MyProfile;
