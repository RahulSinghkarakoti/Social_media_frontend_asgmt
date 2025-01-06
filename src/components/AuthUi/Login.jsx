import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../api/authService";
import { login as authLogin } from "../../store/userSlice";
import { useDispatch } from "react-redux";

function Login() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading,setLoading]=useState(false);

    const handleLogin = async (data) => {
      try {
      setLoading(true);
        const res = await login(data);
        // console.log(res.data);
        handleLoginSuccess(res.data); // Handle successful login
      } catch (error) {
        alert(error.response.data.message);
      }
      finally{
        setLoading(false)
      }
    };
   
  

  const handleLoginSuccess = (data) => {
    const { loggedInUser, accessToken,refreshToken } = data;
    // console.log(loggedInUser);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    
    if (loggedInUser) dispatch(authLogin(loggedInUser));
    setLoading(false)
    alert("Login Successfull");

    navigate("/");
  };

  return (
    <div className="bg-white w-1/3  py-3  px-4 rounded-md   ">
      <h1 className="font-bold text-3xl text-center ">Welcome Back</h1>
      <div className="flex items-center my-4  p-3  h-full">
        <form   onSubmit={handleSubmit(handleLogin)} className="space-y-1 w-full">
          <div className="space-y-2  ">
            <label className="font-semibold " htmlFor="username">
              Username:
            </label>
            <input
              className="w-full p-1 outline-none   text-xl  border-b-2 border-zinc-400 "
              type="text"
              id="username"
              name="username"
              {...register("username", { required: true })}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="font-semibold" htmlFor="password">
              Password:
            </label>
            <input
              className="w-full p-1 outline-none  border-b-2 border-zinc-400  text-xl "
              type="password"
              id="password"
              name="password"
              {...register("password", { required: true })}
              required
            />
          </div>
          <div>
            <p>
              Create account <Link to={"/auth/signup"}>here</Link>
            </p>
          </div>
          <button
            type="submit"
            disabled={loading}
            
            className="bg-blue-500 hover:bg-blue-700 text-white
            font-bold py-2 px-4 rounded w-full"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
