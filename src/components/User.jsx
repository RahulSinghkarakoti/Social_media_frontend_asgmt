import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, unfriend } from "../api/userService";
import { sendFriendRequest } from "../api/friendService";
import { recommendFriends } from "../api/recommendedFriendService";
import { useSelector } from "react-redux";

const User = () => {
  const [userInfo, setUserInfo] = useState({});
  const [isExistingFriend, setIsExistingFriend] = useState(null);
  const [mutualFriends, setMutualFriends] = useState([]);
  const { userId } = useParams();
  const currUserId = useSelector((state) => state.user.user._id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const getuserById = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getUser(userId);
      console.log(res);
      setUserInfo(res.data);
      setIsExistingFriend(res.data.isExistingFriend);
    } catch (error) {
      setError("Failed to fetch user data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getMutualFriends = async () => {
    const res = await recommendFriends(userId);
    console.log(res.data);
    setMutualFriends(res.data);
  };

  useEffect(() => {
    getuserById();
    getMutualFriends();
  }, [userId]);

  const handleAddFriend = async (userId) => {
    try {
      const res = await sendFriendRequest(userId);
      if (res.data) alert("request sent");
    } catch (error) {
      setError("something went wrong ");
      console.log(error);
    }
  };

  const handleUnFriend = async (userId) => {
    try {
      const res = await unfriend(userId);
      if (res.data) alert("Unfrined successfull");
      navigate("/");
    } catch (error) {
      setError("something went wrong ");
      console.log(error);
    }
  };

  if (loading) {
    return <div className=" ">Loading...</div>;
  }

  return (
    <div className="  flex justify-center  items-center p-3">
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="flex flex-col justify-between   gap-3 text-lg   text-zinc-600">
          <div className="bg-red-100 rounded-xl p-2  ">
            <h1 className="text-4xl font-bold text-zinc-700 text-center">
            {userInfo.user?.username || "N/A"}

            </h1>
            <p className="text-black ">
              ID: <span className="font-semibold">{userId}</span>
            </p>
             
            <p className="text-black">
              Email:{" "}
              <span className=" font-semibold">
                {userInfo.user?.email || "N/A"}
              </span>
            </p>
            <p className="text-black">
              Friends:{" "}
              <span className="font-semibold">
                {userInfo.friendsCount || "0"}
              </span>
            </p>

            <div className="flex gap-3  m-2 justify-around items-center">
              {isExistingFriend ? (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-
               2 px-4 rounded"
                  onClick={() => handleUnFriend(userId)}
                >
                  Unfriend
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-
                2 px-4 rounded"
                  onClick={() => handleAddFriend(userId)}
                >
                  Add friend
                </button>
              )}
            </div>
          </div>
          <div className="bg-pink-500 rounded-xl w-full p-2">
            <h1 className="text-3xl font-bold text-white text-center">
              mutual friends
            </h1>

            <ul>
              {mutualFriends.length!=1 ? 
                mutualFriends
                  .filter((friend) => friend._id != currUserId)
                  .map((friend, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => navigate(`/user/${friend._id}`)}
                        className="bg-gray-200 hover:bg-gray-300 cursor-pointer p-2 m-1 rounded-md flex justify-between items-center"
                      >
                        {friend.username}
                      </li>
                    );
                  })
                  :
                  <p className="text-white text-center">No mutual friends</p>
                }
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
