import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed?.length) return;

    try {
      const res = await axios.get(API_BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0)
    return (
      <div className="h-screen flex justify-center items-center gap-2 pb-20">
        <div className="inline-grid *:[grid-area:1/1]">
          <div className="status status-error animate-ping"></div>
          <div className="status status-error"></div>
        </div>
        <h1 className="text-indigo-500 text-lg italic font-semibold">
          You're all caught up! No more developers available for connection
          right now. 
        </h1>
      </div>
    );

  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
