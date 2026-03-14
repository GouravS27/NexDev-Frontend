import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        API_BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

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
      <div className="h-screen flex justify-center items-center gap-2 pb-20">
        <div className="inline-grid *:[grid-area:1/1]">
          <div className="status status-primary animate-ping"></div>
          <div className="status status-primary"></div>
        </div>
        <h1 className="text-indigo-500 text-lg italic font-semibold">
          You have no more connections right now.
        </h1>
      </div>
    );

  return (
    <div className="text-center my-10 h-screen">
      <h1 className="font-bold text-indigo-600 text-3xl mb-6">Requests</h1>

      {requests.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about, _id } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex mb-2 p-1 rounded-lg bg-indigo-50 text-indigo-600 w-1/2 mx-auto"
          >
            <img alt="photo" className="h-40 rounded-lg" src={photoUrl} />

            <div className="text-left mx-4 flex flex-col justify-center">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>

              {age && gender && <p>{age + ", " + gender}</p>}
              <p className="italic">{about}</p>

              <div className="my-1 flex gap-2">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    reviewRequest("accepted", request._id);
                  }}
                >
                  Accept
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    reviewRequest("rejected", request._id);
                  }}
                >
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
