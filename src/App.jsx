import { useEffect } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { getCurrentUser } from "./api/authService";
import { login as authlogin } from "./store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
 
export default function App() {

  const loginStatus=useSelector(state=>state.user.status)
  const dispatch= useDispatch()

  const fetchCurrentUser=async()=>{
    const res=await getCurrentUser()
    dispatch(authlogin(res.data.user))
  }

  useEffect(()=>{
     
    fetchCurrentUser();
  },[])

  return (
    <div className="">
       <Header/>
        <Outlet/>
    </div>
  )
}