import "./Sidebar.css";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { formState } = useSelector((state) => state.sidebar);
  const { steps } = useSelector((state) => state.formsSteps);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    console.log(formState);
  }, [formState]);
  const allSteps = [
    "Car Detail",
    "Exterior Condition",
    "Body Frame Accident Checklist",
    "Engine / Transmission / Clutch",
    "Brakes",
    "Suspension / Steering",
    "Interior",
    "AC / Heater",
    "Electrical & Electronics",
    "Exterior & Body",
    "Tyres",
    "Main – Vehicle Pictures",
  ];
  return (
    <div
      className="sidebar"
      style={{
        width:
          window.innerWidth <= 768 ? (!isOpen ? "60px" : "300px") : "360px",
      }}
    >
      {isOpen ? (
        <ArrowForwardIosOutlinedIcon
          className="sidebar__icon"
          onClick={() => setIsOpen(!isOpen)}
        />
      ) : (
        <ArrowBackIosNewOutlinedIcon
          className="sidebar__icon"
          onClick={() => setIsOpen(!isOpen)}
        />
      )}

      {formState ? (
        <>
          <div className="timeline-container">
            {allSteps.map((step, index) => (
              <div
                key={index}
                className={`timeline-step ${index === steps ? "active" : ""}`}
              >
                <div className="timeline-circle"></div>
                <span
                  className="timeline-label"
                  style={{ display: isOpen ? "block" : "none" }}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>list</div>
      )}
    </div>
  );
};

export default Sidebar;
