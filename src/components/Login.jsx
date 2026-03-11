import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("singh@mail.com");
  const [password, setPassword] = useState("Test@123");
  const [error, setError] = useState("");

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

  return (
    <div className="flex justify-center mt-40">
      <fieldset className="fieldset bg-indigo-100 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-xl font-bold text-indigo-500">Login</legend>

        <label className="label text-indigo-600">Email</label>
        <input
          type="email"
          className="input text-indigo-700 font-medium"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label text-indigo-500">Password</label>
        <input
          type="password"
          className="input text-indigo-700"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p className="text-red-500 text-center font-bold">{error}</p>
        <button className="btn bg-indigo-300 text-indigo-800 hover:bg-indigo-400 font-bold mt-1" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
