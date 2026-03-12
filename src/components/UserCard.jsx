import { useDispatch } from "react-redux";
import { API_BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";
import axios from "axios";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        API_BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeFeed(_id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card bg-indigo-50 w-80 shadow-xl">
      <figure className="h-105 overflow-hidden">
        <img src={photoUrl} alt="photo" />
      </figure>

      <div className="card-body p-4">
        <h2 className="card-title font-bold text-lg">
          {firstName + " " + lastName}
        </h2>

        {age && gender && <p className="text-sm">{age + ", " + gender}</p>}

        <p className="text-sm line-clamp-2">{about}</p>

        <div className="card-actions justify-center mt-3">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              handleSendRequest("ignored", _id);
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              handleSendRequest("interested", _id);
            }}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
