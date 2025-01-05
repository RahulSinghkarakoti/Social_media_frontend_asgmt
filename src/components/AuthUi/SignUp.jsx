import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../api/authService";

import { login as authLogin } from "../../store/userSlice";
import { useDispatch } from "react-redux";

function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (data) => {
    try {
      const res = await signup(data);
      console.log(res.data);
      handleSignUpSuccess(res.data);
    } catch (error) {
      // console.log(error.response.data.message)
      alert(error.response.data.message);
    }
  };
  const handleSignUpSuccess = (data) => {
    const { user, accessToken, refreshToken } = data;
    console.log(user);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    
    if (user) dispatch(authLogin(user));
    alert("Signup Successfull")
    navigate("/");
  };

  return (
    <div className="bg-white w-1/3  py-3  px-4 rounded-md   ">
      <h1 className="font-bold text-3xl text-center ">Get Started</h1>
      <div className="flex items-center my-4  p-3  h-full">
        <form
          onSubmit={handleSubmit(handleSignup)}
          className="space-y-1 w-full"
        >
          <div className="space-y-1  ">
            <label className="font-semibold " for="username">
              Username:
            </label>
            <br></br>
            <input
              className="w-full p-1 outline-none   text-xl  border-b-2 border-zinc-400 "
              type="text"
              id="username"
              name="username"
              {...register("username", { required: true })}
              required
            />
            {errors.username && <p>username is required.</p>}
          </div>
          <div className="space-y-1 ">
            <label className="font-semibold " for="email">
              Email:
            </label>
            <br></br>
            <input
              className="w-full p-1 outline-none   text-xl  border-b-2 border-zinc-400 "
              type="text"
              id="email"
              name="email"
              {...register("email", { required: true })}
              required
            />
            {errors.email && <p>email is required.</p>}
          </div>
          <div className="space-y-1">
            <label className="font-semibold" for="password">
              Password:
            </label>
            <br></br>
            <input
              className="w-full p-1 outline-none  border-b-2 border-zinc-400  text-xl "
              type="password"
              id="password"
              name="password"
              {...register("password", { required: true })}
              required
            />
            {errors.password && <p>password is required.</p>}
          </div>
          <div className="space-y-1">
            <p>
              Click for login <Link to={"/auth/login"}>here</Link>
            </p>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white
          font-bold my-4 py-2 px-4 rounded w-full"
          >
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
