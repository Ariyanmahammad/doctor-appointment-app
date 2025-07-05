import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendurl } =
    useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  useEffect(() => {
    if (profileData) {
      setInitialData(profileData); // Backup for cancel button
    }
  }, [profileData]);

  const updateProfile = async () => {
    if (
      !profileData.fees ||
      !profileData.address?.line1 ||
      !profileData.address?.line2
    ) {
      return toast.error("Please fill all required fields");
    }

    const updateData = {
      fees: Number(profileData.fees),
      available: profileData.available,
      address: profileData.address,
    };

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${backendurl}/api/doctor/update-profile`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!profileData) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden p-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={profileData.image}
            alt="Doctor"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">
              {profileData.name}
            </h2>
            <p className="text-indigo-600 font-medium mt-1">
              {profileData.degree} - {profileData.speciality}
            </p>
            <span className="inline-block mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full">
              {profileData.experience}+ Years Experience
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!profileData.available}
              onChange={() => {
                if (isEdit) {
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }));
                }
              }}
              className="w-5 h-5"
            />
            <label className="text-sm text-gray-600">Available</label>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">About</h3>
          <p className="text-gray-600 leading-relaxed">{profileData.about}</p>
        </div>

        {/* Address & Fees */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-1">
              Appointment Fee
            </h4>
            {isEdit ? (
              <input
                type="number"
                className="border px-3 py-2 rounded w-full text-gray-700"
                value={profileData.fees || ""}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    fees: e.target.value,
                  }))
                }
              />
            ) : (
              <p className="text-gray-600">₹{profileData.fees}</p>
            )}
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-1">
              Address
            </h4>
            {isEdit ? (
              <>
                <input
                  type="text"
                  className="border px-3 py-2 rounded w-full text-gray-700 mb-2"
                  value={profileData.address?.line1 || ""}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line1: e.target.value,
                      },
                    }))
                  }
                />
                <input
                  type="text"
                  className="border px-3 py-2 rounded w-full text-gray-700"
                  value={profileData.address?.line2 || ""}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line2: e.target.value,
                      },
                    }))
                  }
                />
              </>
            ) : (
              <p className="text-gray-600">
                {profileData.address?.line1}, <br />
                {profileData.address?.line2}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 text-right flex justify-end gap-4">
          {isEdit ? (
            <>
              <button
                onClick={() => {
                  setProfileData(initialData);
                  setIsEdit(false);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
              >
                Cancel
              </button>

              <button
                onClick={updateProfile}
                disabled={loading}
                className={`py-2 px-4 rounded text-white ${
                  loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
