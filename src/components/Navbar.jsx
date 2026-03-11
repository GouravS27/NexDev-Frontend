import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import NexDevLogo from "../logos/NexDevLogo";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  // console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await axios.post(API_BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="navbar bg-indigo-50">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost hover:bg-indigo-100 transition duration-300"
        >
          {/* 🌐NexDev */}
          <NexDevLogo />
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control"></div>
        <div className="dropdown dropdown-end mx-5">
          {user && (
            <div className="flex text-sm ">
              <p className="px-2 m-auto text-indigo-500 font-bold flex gap-1">
                Welcome
                <span className="text-indigo-600">{user?.firstName}!</span>
              </p>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full border-2 border-indigo-400">
                  <img alt="user photo" src={user?.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-indigo-500 font-bold"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <Link onClick={handleLogOut}>Logout</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
