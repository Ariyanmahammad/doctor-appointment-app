import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = React.useState("Admin");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { setAToken, backendurl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const navigate = useNavigate(); // ✅ make sure this is defined at the top

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendurl}/api/admin/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          navigate("/admin-dashboard"); // ✅ redirect to admin dashboard
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendurl}/api/doctor/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          navigate("/doctor-dashboard"); // ✅ redirect to doctor dashboard
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 to-blue-300 p-4">
      <form
        onSubmit={onSubmitHandler}
        action=""
        className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 space-y-6"
      >
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-blue-600">
            {state} Login
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Login to your {state.toLowerCase()} dashboard
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer py-2 rounded-lg font-semibold transition duration-300"
        >
          Login
        </button>

        {/* Role Switch */}
        <div className="text-center text-sm text-gray-600">
          {state === "Admin" ? (
            <p>
              Doctor Login?{" "}
              <span
                onClick={() => setState("Doctor")}
                className="text-blue-600 font-medium cursor-pointer hover:underline"
              >
                Click here!
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{" "}
              <span
                onClick={() => setState("Admin")}
                className="text-blue-600 font-medium cursor-pointer hover:underline"
              >
                Click here!
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
