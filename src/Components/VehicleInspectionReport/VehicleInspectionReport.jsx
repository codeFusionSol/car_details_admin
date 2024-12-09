import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../utils/url";
import { Toaster, toast } from "sonner";

const api = axios.create({
  baseURL: url,
});

const VehicleInspectionReport = () => {
  const carDetailsId = useSelector((state) => state.carDetailsId.carDetailsId);
  const dispatch = useDispatch();

  const [ratings, setRatings] = useState({
    imageValueChecks: []
  });

  const handleSubmit = async () => {
    try {
      // Validate all required fields are filled
      const requiredFields = [
        "acHeater",
        "engineTransmissionClutch", 
        "exterior",
        "skeleton",
        "accidentChecklist",
        "brakes",
        "suspensionSteering",
        "interior",
        "electricalElectronics",
        "tyres"
      ];

      const missingFields = requiredFields.filter(field => 
        !ratings.imageValueChecks.find(check => check.name === field)
      );

      if (missingFields.length > 0) {
        alert(`Please fill in ratings for: ${missingFields.join(", ")}`);
        return;
      }

      // Validate all values are numbers between 0-100
      const invalidValues = ratings.imageValueChecks.filter(check => 
        typeof check.value !== 'number' || check.value < 0 || check.value > 100
      );

      if (invalidValues.length > 0) {
        alert("All ratings must be numbers between 0 and 100");
        return;
      }

      const response = await api.post("/vehicleInspectionReport/add", {
        ratings,
        carDetailsId: carDetailsId || "674d962b622d3809925855fe"
      });

      if (response.data.success) {
        toast("Vehicle Inspection Report Added!", {
          style: {
            padding: "16px",
             // Set desired padding here
          }})
          setTimeout(() => {
            dispatch(changeStepSuccess(2));
          }, 2000);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting vehicle inspection report:", error);
      alert(error.response?.data?.message || "Error submitting report");
    }
  };

  const handleRatingChange = (name, value) => {
    const numValue = Number(value);
    if (isNaN(numValue) || numValue < 0 || numValue > 100) {
      return;
    }

    setRatings(prev => {
      const newImageValueChecks = [...prev.imageValueChecks];
      const existingIndex = newImageValueChecks.findIndex(check => check.name === name);
      
      if (existingIndex >= 0) {
        newImageValueChecks[existingIndex] = { name, value: numValue };
      } else {
        newImageValueChecks.push({ name, value: numValue });
      }

      return { imageValueChecks: newImageValueChecks };
    });
  };

  return (
    <>
    <div className="container-fluid min-vh-100 bg-light pb-md-5 py-3 px-0">
      <div className="container p-0">
        <div className="card shadow">
          <div className="text-white p-4" style={{ backgroundColor: "var(--primary-color)" }}>
            <h2 className="display-4 form-title text-center fw-bold">Vehicle Inspection Report</h2>
          </div>

          <div className="card-body p-4 d-flex flex-column -justify-content-center align-items-center">
            <div className="row g-4">
              {[
                { display: "AC Heater", value: "acHeater" },
                { display: "Engine Transmission ", value: "engineTransmissionClutch" },
                { display: "Exterior", value: "exterior" },
                { display: "Skeleton", value: "skeleton" },
                { display: "Accident Checklist", value: "accidentChecklist" },
                { display: "Brakes", value: "brakes" },
                { display: "Suspension Steering", value: "suspensionSteering" },
                { display: "Interior", value: "interior" },
                { display: "Electrical Electronics", value: "electricalElectronics" },
                { display: "Tyres", value: "tyres" }
              ].map((item, index) => (
                <div className="col-12 px-0 col-md-6 mb-3 mx-0 px-0" key={index}>
                  <div className="form-floating">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="form-control"
                      id={item.value}
                      value={ratings.imageValueChecks.find(r => r.name === item.value)?.value || ""}
                      onChange={(e) => handleRatingChange(item.value, e.target.value)}
                      required
                      placeholder="Rate from 0-100"
                    />
                    <label htmlFor={item.value}>{item.display}</label>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-end mt-4">
              <button onClick={handleSubmit} className="btn  btn-lg" style={{backgroundColor: "var(--primary-color)"}}>
                Next Step
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="ms-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

<div className="p-4">
<Toaster position={window.innerWidth <= 768 ? 'bottom-right' : 'top-right'} />
</div>
</>
  );
};

export default VehicleInspectionReport;
