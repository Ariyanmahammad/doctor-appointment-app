import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { backendurl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState(
    location.state?.showSignup ? "Sign Up" : "Login"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = React.useState({ line1: "", line2: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = React.useState("");

  const toggleState = () => {
    setState(state === "Sign Up" ? "Login" : "Sign Up");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendurl}/api/user/register`, {
          name,
          email,
          password,
          dob,
          gender,
          address,
          phone,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendurl}/api/user/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-700">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Please {state === "Sign Up" ? "sign up" : "log in"} to book an
            appointment
          </p>
        </div>

        {state === "Sign Up" && (
          <>
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* DOB */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Address */}
            {/* Address Line 1 */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Address Line 1
              </label>
              <input
                type="text"
                value={address.line1}
                onChange={(e) =>
                  setAddress((prev) => ({ ...prev, line1: e.target.value }))
                }
                placeholder="Line 1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Address Line 2 */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Address Line 2
              </label>
              <input
                type="text"
                value={address.line2}
                onChange={(e) =>
                  setAddress((prev) => ({ ...prev, line2: e.target.value }))
                }
                placeholder="Line 2"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </>
        )}

        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          {state}
        </button>

        {/* Switch link */}
        <p className="text-center text-sm text-gray-600">
          {state === "Sign Up"
            ? "Already have an account?"
            : "New to Prescripto?"}{" "}
          <span
            onClick={toggleState}
            className="text-blue-600 hover:underline font-medium cursor-pointer"
          >
            {state === "Sign Up" ? "Login" : "Create Account"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
