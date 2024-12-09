import React, { useEffect } from "react";
import axios from "axios";
import { url } from "../utils/url.js";
import Form from "./Pages/Form/Form.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login.jsx";
import Cars from "./Pages/Cars/Cars.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  loginSuccess,
  loginStart,
  loginFailure,
} from "./redux/Slices/Auth.jsx";
import Admins from "./Pages/Admins/Admis.jsx";

const api = axios.create({
  baseURL: url,
});

function App() {
  const dispatch = useDispatch();
  const token = JSON?.parse(localStorage?.getItem("token"));

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        dispatch(loginStart());
        const response = await api.get("/auth/isuserloggedin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(loginSuccess(response.data.data));
      } catch (error) {
        console.error("Login check failed:", error);
        dispatch(loginFailure(error.response?.data?.message));
      }
    };

    if (token) {
      checkLoginStatus();
    }
  }, [token]);
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/form" element={<Form />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/cars" element={<Cars />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
