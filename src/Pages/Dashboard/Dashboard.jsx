import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import StateBox from "../../Components/StateBox/StateBox.jsx";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import "./Dashboard.css";
import {
  changeFormStateStart,
  changeFormStateSuccess,
  changeFormStateFailure,
} from "../../redux/Slices/Sidebar.jsx";
import { useEffect } from "react";
import {
  getCarsSuccess,
  getCarsStart,
  getCarsFailure,
} from "../../redux/Slices/carsSlice.jsx";
import axios from "axios";
import { url } from "../../../utils/url.js";
import { useState } from "react";

const api = axios.create({
  baseURL: url,
});

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const pathName = useLocation();
  const { cars } = useSelector((state) => state.cars);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, pathName]);
  const changeFormState = () => {
    try {
      dispatch(changeFormStateStart());
      dispatch(changeFormStateSuccess());
      navigate("/form");
    } catch (error) {
      dispatch(changeFormStateFailure(error.message));
    }
  };

  const fetchCars = async () => {
    try {
      dispatch(getCarsStart());
      const res = await api.get("/ownerDetails/get-all-owner-details");
      if (res.data.success) {
        dispatch(getCarsSuccess(res.data.data));
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      dispatch(getCarsFailure(error.message));
    }
  };

  useEffect(() => {
    api.get("/users/get-all-admins").then((res) => {
      if (res.data.success) {
        setAdmins(res.data.admins);
      }
    });
  }, []);

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <>
      <div className="main-container">
        <Navbar />
        <div
          className="container-fluid d-flex m-0 p-0"
          style={{ overflowX: "hidden !important" }}
        >
          <Sidebar />
        </div>
        <div
          className="row dashboard-container"
          style={{ overflowX: "hidden" }}
        >
          <div className=" ms-md-5 ms-lg-0 mt-4 gap-5 flex-wrap">
            <div className="d-flex gap-5 flex-wrap">
              <StateBox title="Total Vehicles" value={cars?.length} />
              <StateBox title="Total Users" value={admins?.length} />
              <div onClick={() => changeFormState()}>
                <div
                  className="card-container justify-content-center align-items-center"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "var(--black-color)",
                  }}
                >
                  <div className="d-flex flex-column justify-content-center align-items-center ">
                    <span
                      className="label"
                      style={{ color: "var(--black-color)" }}
                    >
                      Add new
                    </span>
                    <span
                      style={{ color: "var(--black-color)" }}
                      className="subtile"
                    >
                      car inspection
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
