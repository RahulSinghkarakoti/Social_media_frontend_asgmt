import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../api/authService";

function Me() {
  const [userInfo, setUserInfo] = useState({});
  const _id = useSelector((state) => state.user.user._id); // Access user ID from Redux state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCurrentUserInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCurrentUser(); // Replace with your API call
      console.log(res);
      setUserInfo(res.data);
    } catch (error) {
      console.log(error.response.data.message);
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUserInfo(); // Fetch user data on component mount
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="  flex justify-center  items-center p-3">
      
        <div className="flex flex-col justify-between items-center gap-3 ">
            <h1 className="text-3xl font-bold  text-center">My Profile</h1>
          <div className="bg-blue-200 rounded-xl p-2  ">
          <p className=" ">
              ID: <span className="font-semibold">{_id}</span>
            </p>
            {/* <p className="text-lg text-white">User ID: {_id}</p> */}
            {/* <p className="text-lg text-white">
                Name:
            </p> */}
            <p className="">
            Name:{" "}
              <span className=" font-semibold">
              {userInfo.user?.username || " "}
              </span>
            </p>
            
            <p className="">
              Email:{" "}
              <span className=" font-semibold">
                {userInfo.user?.email || "N/A"}
              </span>
            </p>
            
            <div className="flex w-full justify-between items-center">
              <div className="text-lg  text-center">
                <div className="text-4xl font-bold">{userInfo.friends }</div>
                <div>Friends</div>
              </div>
              <div className="text-lg  text-center">
                <div className="text-4xl font-bold">{userInfo.friendRequestsSent }</div>
                <div>Friend Request</div>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
}

export default Me;
