import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../utils/constants";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(API_BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return <h1 className="text-indigo-600">Loading...</h1>;

  if (requests.length === 0)
    return (
      <h1 className="text-indigo-600 text-center">
        No Requests Found!
      </h1>
    );

  return (
    <div className="text-center my-10 h-screen">
      <h1 className="font-bold text-indigo-600 text-3xl mb-6">
        Requests
      </h1>

      {requests.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about, _id } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex mb-2 p-1 rounded-lg bg-indigo-50 text-indigo-600 w-1/2 mx-auto"
          >
            <img
              alt="photo"
              className="h-40 rounded-lg"
              src={photoUrl}
            />

            <div className="text-left mx-4 flex flex-col justify-center">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>

              {age && gender && <p>{age + ", " + gender}</p>}
              <p className="italic">{about}</p>

              <div className="my-1 flex gap-2">
                <button className="btn btn-primary btn-sm">
                  Accept
                </button>
                <button className="btn btn-secondary btn-sm">
                  Reject
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;