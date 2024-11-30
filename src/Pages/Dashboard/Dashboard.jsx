import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import StateBox from "../../Components/StateBox/StateBox.jsx";
import "./Dashboard.css";
import {
  changeFormStateStart,
  changeFormStateSuccess,
  changeFormStateFailure,
} from "../../redux/Slices/Sidebar.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <div className="row dashboard-container" style={{  overflowX: "hidden" }}>
          <div className=" ms-5 mt-4 gap-5 flex-wrap">
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
    </>
  );
};

export default Dashboard;
