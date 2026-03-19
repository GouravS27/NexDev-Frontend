import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/constants";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        API_BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      // console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        API_BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center mb-30">
        <fieldset className="fieldset bg-indigo-100 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-xl font-bold text-indigo-500">
            {isLogin ? "Login" : "Sign Up"}
          </legend>

          {!isLogin && (
            <>
              <label className="label text-indigo-600">First Name</label>
              <input
                type="text"
                className="input text-indigo-700 font-medium"
                placeholder="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <label className="label text-indigo-600">Last Name</label>
              <input
                type="text"
                className="input text-indigo-700 font-medium"
                placeholder="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}

          <label className="label text-indigo-600">Email</label>
          <input
            type="email"
            className="input text-indigo-700 font-medium"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="label text-indigo-500">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="input text-indigo-700 w-full pr-10"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p className="text-red-500 text-center font-bold">{error}</p>
          <button
            className="btn bg-indigo-300 text-indigo-800 hover:bg-indigo-400 font-bold mt-1"
            onClick={isLogin ? handleLogin : handleSignUp}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <p
            className="text-center font-bold text-indigo-400 cursor-pointer hover:text-indigo-700"
            onClick={() => setIsLogin((value) => !value)}
          >
            {isLogin ? "New User? Signup here!" : "Existing User? Login here!"}
          </p>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
