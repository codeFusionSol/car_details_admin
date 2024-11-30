import React from "react";
import axios from "axios";
import { url } from "../utils/url.js";
import Form from "./Pages/Form/Form.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";

const api = axios.create({
  baseURL: url,
});

function App() {
  return (
    <>
      <Navbar />
      <div
        className="container-fluid d-flex "
        style={{ overflowX: "hidden !important" }}
      >
        <div className="row">
          <Sidebar />
        </div>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
