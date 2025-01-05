import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../api/authService";
import { login as authLogin } from "../../store/userSlice";
import { useDispatch } from "react-redux";

function Login() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (data) => {
    const fetchUser = async () => {
      try {
        const res = await login(data);
        console.log(res.data);
        handleLoginSuccess(res.data); // Handle successful login
      } catch (error) {
         const status=error.response.status
         console.log(status) 
         if(404)
          {alert("Invalid Credentials")}
         else if(401)
          {alert("")}
      }
    };
  
    fetchUser(); // No need for .catch since errors are handled internally
  };
  

  const handleLoginSuccess = (data) => {
    const { loggedInUser, accessToken } = data;
    console.log(loggedInUser);
    localStorage.setItem("accessToken", accessToken);

    if (loggedInUser) dispatch(authLogin(loggedInUser));
    alert("Login Successfull");

    navigate("/");
  };

  return (
    <div className="bg-white w-1/3  py-3  px-4 rounded-md   ">
      <h1 className="font-bold text-3xl text-center ">Welcome Back</h1>
      <div className="flex items-center my-4  p-3  h-full">
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-1 w-full">
          <div className="space-y-2  ">
            <label className="font-semibold " for="username">
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
            <label className="font-semibold" for="password">
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
            className="bg-blue-500 hover:bg-blue-700 text-white
            font-bold py-2 px-4 rounded w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
