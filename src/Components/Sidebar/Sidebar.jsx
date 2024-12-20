import "./Sidebar.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps";
import { changeSidebarState } from "../../redux/Slices/Sidebar";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");
  const dispatch = useDispatch();
  const { formState } = useSelector((state) => state.sidebar);
  const { isOpen } = useSelector((state) => state.sidebar);
  const { steps } = useSelector((state) => state.formsSteps);
  const { carDetailsId, fullDetaills } = useSelector(
    (state) => state?.carDetailsId
  );

  useEffect(() => {
    console.log(fullDetaills);
  }, [fullDetaills]);

  const allSteps = [
    "Owner Details",
    "Car Detail",
    "Body Frame Accident Checklist",
    "Engine / Transmission / Clutch",
    "Brakes",
    "Suspension / Steering",
    "Interior",
    "AC / Heater",
    "Electrical & Electronics",
    "Exterior & Body",
    "Tyres",
    "Test Drive",
    "Exterior Condition",
    "Main – Vehicle Pictures",
  ];

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  const handleStepClick = (index) => {
    if (index <= fullDetaills.length) {
      dispatch(changeStepSuccess(index));
    } else {
      alert("Cannot proceed to this step!");
    }
  };

  const closeSidebar = () => {
    dispatch(changeSidebarState());
  };

  const navigate = useNavigate();

  return (
    <div
      className="sidebar"
      style={{
        width: window.innerWidth <= 768 ? (!isOpen ? "0px" : "300px") : "360px",
      }}
    >
      {isOpen && (
        <>
          <br />
          <div className="sidebar-search">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
              <button className="search-button">
                <span role="img" aria-label="search">
                  🔍
                </span>
              </button>
            </div>
          </div>
        </>
      )}
      {formState ? (
        <div className="timeline-container" style={{display: isOpen?"flex":window.innerWidth<=768?"none":"flex"}}>
          {allSteps.map((step, index) => (
            <div
              key={index}
              className={`timeline-step ${index === steps ? "active" : ""}`}
              style={{
                display:
                  window.innerWidth <= 768
                    ? isOpen
                      ? "flex"
                      : "none"
                    : "none",
              }}
              onClick={() => handleStepClick(index)}
            >
              <div className="timeline-circle"></div>
              <span className="timeline-label">{step}</span>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div
            className="sidebar-menu"
            style={{
              display:
                window.innerWidth <= 768 ? (!isOpen ? "none" : "flex") : "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "20px",
            }}
          >
            {[
              { title: "Dashboard", path: "/dashboard" },
              { title: "Admins", path: "/admins" },
              { title: "Cars", path: "/cars" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.path}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={() => closeSidebar()}
              >
                <div
                  className={`sidebar-item ${
                    window.location.pathname === item.path ? "active" : ""
                  }`}
                >
                  {item.title}
                </div>
              </Link>
            ))}
            <Link style={{ textDecoration: "none", color: "inherit" }}>
              <div
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
                className={`sidebar-item`}
              >
                Logout
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
