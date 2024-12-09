import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user){
      navigate("/");
    }
  }, [user]);
  const changeFormState = () => {
    try {
      dispatch(changeFormStateStart());
      dispatch(changeFormStateSuccess());
      navigate("/form");
    } catch (error) {
      dispatch(changeFormStateFailure(error.message));
    }
  };

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
      <div className="row dashboard-container" style={{  overflowX: "hidden" }}>
          <div className=" ms-md-5 ms-lg-0 mt-4 gap-5 flex-wrap">
            <div className="d-flex gap-5 flex-wrap">
              <StateBox title="Total Vehicles" value="100" />
              <StateBox title="Total Users" value="15" />
              <div onClick={() => changeFormState()}>
                <StateBox
                  title="Add new "
                  subtile="car inspection"
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
