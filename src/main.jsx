import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Auth from "./components/AuthUi/Auth.jsx";
import Login from "./components/AuthUi/Login.jsx";
import SignUp from "./components/AuthUi/SignUp.jsx";

import { Provider } from "react-redux";
import store from "./store/store.js";
import User from "./components/User.jsx";
import Me from "./components/AuthUi/Me.jsx";
import Notification from "./components/AuthUi/Notification.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Parent route
    children: [
      {
        index: true, // Default route
        element: <Home />,
      },
      {
        path: "user/:userId", // Dynamic route
        element: <User />,
      },
      {
        path:"me",
        element:<Me/>
      },
      {
        path:"notification",
        element:<Notification/>
      }
    ],
  },
  {
    path: "auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
