import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  // Store User info on Refresh
  const fetchUser = async () => {
    if (userData) return; //unneccessary API calls
    try {
      const res = await axios.get(API_BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) navigate("/login");
      console.error(err);
    }
  };

  useEffect(() => {
      fetchUser();
  }, []);

  return (
    <div className="bg-indigo-200 ">
      <Navbar />
      <Outlet/>
      <Footer />
    </div>
  );
};

export default Body;
