import { useEffect, useState } from "react";
import FriendCard from "../FriendCard";
import { getFriends } from "../../api/userService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../Footer/Footer";

function Home() {
  
  const [friends,setFriends]=useState([])
  const navigate=useNavigate()
  const loginStatus=useSelector(state=>state.user.status)

  const fetchFriends=async()=>{

    const res=await  getFriends()
    setFriends(res.data)
    console.log(res.data)
  }

  useEffect( ()=>{
    fetchFriends()
  },[])

  return (
    <div className="flex flex-col  px-4 py-3 space-y-2">
      {loginStatus?
      <>
      <div className="text-3xl font-bold text-zinc-400">Your Friend List</div>
      <div className="flex flex-wrap gap-3 w-full  ">
        {Array.isArray(friends) && friends.map((item, index) => {
          return (
            <div key={index} className=" cursor-pointer " onClick={()=>navigate(`/user/${item._id}`)}>
              <FriendCard id={item._id} name={item.username} />
            </div>
          );
        }) 
      }
      </div>
      </>
      :<div>
         <div className="text-3xl font-bold text-zinc-400 text-center">Please login</div>
      </div>
      }
    <Footer/>
    </div>
  );
}

export default Home;
