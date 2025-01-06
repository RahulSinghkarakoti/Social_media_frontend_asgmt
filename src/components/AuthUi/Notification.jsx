import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { acceptFriendRequest, getFriendRequests, rejectFriendRequest } from "../../api/friendService";
import { getUser } from "../../api/userService";

function Notification() {
  const _id = useSelector((state) => state.user.user._id); // Access user ID from Redux state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState([]);

  const getSenderInfo = async (request) => {
   try {
     const senderInfoRes = await getUser(request.senderId);
     
     return  {
         username: senderInfoRes.data.user.username,
         email: senderInfoRes.data.user.email,
         requestId:request._id
       } 
   } catch (error) {
    console.log(error.response.data.message);
    console.log(error)
   }
  };

  const getNotification = async () => {
    try {
        setError(null);
  
        const res = await getFriendRequests();
        // console.log(res.data);
    
        const senderInfoList = await Promise.all(
          res.data.map((request) => {
            return getSenderInfo(request);
          })
        );
        const validSenderInfo = senderInfoList.filter((info) => info !== null);
    
        // Update state with valid sender info
        setUserInfo(validSenderInfo);
    } catch (err) {
        // console.error("Error fetching notifications:", err);
        setError("Failed to fetch notifications.");
    }
    finally{
        setLoading(false);
    }
  };

  
  const handleAcceptRequest=async(requestId)=>{
    try {
      const res=await acceptFriendRequest(requestId)
         if(res.data)
          alert("request accepted")
       } catch (error) {
         console.log(error)
        }
      }

      const handleRejectRequest=async(requestId)=>{
        try {
          const res=await rejectFriendRequest(requestId)
          if(res.data)
              alert("request accepted")
        } catch (error) {
         console.log(error)
        }
    }
      useEffect(() => {
        getNotification();
      }, [handleAcceptRequest,handleRejectRequest]);
      
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="  flex flex-col justify-center  items-center p-3">
        <h1 className="font-semibold text-3xl">
            Notification
        </h1>
       <ul className="min-w-1/2 space-y-3">
        {  userInfo.length==0 ?
            <div className="text-center text-lg text-gray-500">No pending requests</div>
            :
        
        userInfo.map((user, index) => (
          <li key={index} className="bg-gray-300 rounded-xl p-3 w-full flex justify-between items-center  ">
            <div>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>request Id: {user.requestId}</p>
            </div>
            <div className="flex gap-3" >
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-
                2 px-4 rounded" onClick={()=>handleAcceptRequest(user.requestId)} >Accept</button
                >
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-
                2 px-4 rounded" onClick={()=>handleRejectRequest(user.requestId)} >Decline
                    </button>
            </div>
          </li>
        ))}
        {
          
        }
      </ul>
      
    </div>
  );
}

export default Notification;
