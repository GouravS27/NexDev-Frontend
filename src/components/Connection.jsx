import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";

const Connection = () => {
  const connections = useSelector((store) => store.connection);
  //   console.log(connections);

  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(API_BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <h1 className="text-indigo-600">Loading...</h1>;
  if (connections.length === 0)
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
    <div className="text-center my-10  min-h-screen">
      <h1 className="font-bold text-indigo-600 text-3xl mb-6">Connections</h1>

      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about, _id } =
          connection;

        return (
          <div
            key={_id}
            className="flex mb-2 p-1 rounded-lg bg-indigo-50 text-indigo-600 w-1/2 mx-auto"
          >
            <img
              alt="photo"
              className="h-40 min-w-30 max-w-30 rounded-lg"
              src={photoUrl}
            />

            <div className="text-left mx-4 flex flex-col justify-center">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>

              {age && gender && <p>{age + ", " + gender}</p>}
              <p className="italic">{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connection;
