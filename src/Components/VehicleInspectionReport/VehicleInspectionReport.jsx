import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../utils/url";
import { Toaster, toast } from "sonner";
import {
  addDataToCarDetailsSuccess,
  updateDataToCarDetailsSuccess,
} from "../../redux/Slices/CarDetail_id.jsx";

const api = axios.create({
  baseURL: url,
});

const VehicleInspectionReport = () => {
  const { carDetailsId, fullDetaills } = useSelector(
    (state) => state.carDetailsId
  );
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const [ratings, setRatings] = useState({
    imageValueChecks: [],
  });
  useEffect(() => {
    console.log(ratings);
  }, [ratings]);

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
        "tyres",
      ];

      const missingFields = requiredFields.filter(
        (field) =>
          !ratings.imageValueChecks.find((check) => check.name === field)
      );

      if (missingFields.length > 0) {
        alert(`Please fill in ratings for: ${missingFields.join(", ")}`);
        return;
      }

      // Validate all values are numbers between 0-100
      const invalidValues = ratings.imageValueChecks.filter(
        (check) =>
          typeof check.value !== "number" ||
          check.value < 0 ||
          check.value > 100
      );

      if (invalidValues.length > 0) {
        alert("All ratings must be numbers between 0 and 100");
        return;
      }

      const response = await api.post("/vehicleInspectionReport/add", {
        ratings,
        carDetailsId: carDetailsId || "674d962b622d3809925855fe",
      });

      if (response.data.success) {
        toast("Vehicle Inspection Report Added!", {
          style: {
            padding: "16px",
            // Set desired padding here
          },
        });
        setTimeout(() => {
          dispatch(addDataToCarDetailsSuccess(response?.data?.report));
          dispatch(changeStepSuccess(3));
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

    setRatings((prev) => {
      const newImageValueChecks = [...prev.imageValueChecks];
      const existingIndex = newImageValueChecks.findIndex(
        (check) => check.name === name
      );

      if (existingIndex >= 0) {
        newImageValueChecks[existingIndex] = { name, value: numValue };
      } else {
        newImageValueChecks.push({ name, value: numValue });
      }

      return { imageValueChecks: newImageValueChecks };
    });
  };

  useEffect(() => {
    if (fullDetaills.length > 2) {
      console.log(fullDetaills[2]);
      setRatings(fullDetaills[2]?.ratings || { imageValueChecks: [] });
      setEditMode(true);
    }
  }, [fullDetaills]);

  const editHandler = async () => {
    try {
      const response = await api.put(
        `/vehicleInspectionReport/update/${fullDetaills[2]._id}`,
        {
          ratings,
        }
      );

      if (response.data.success) {
        toast("Vehicle Inspection Report Updated!", {
          style: {
            padding: "16px",
            // Set desired padding here
          },
        });

        setTimeout(() => {
          dispatch(updateDataToCarDetailsSuccess(response?.data?.report));
          dispatch(changeStepSuccess(fullDetaills.length));
        }, 2000);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error editing vehicle inspection report:", error);
    }
  };

  return (
    <>
      <div className="container-fluid min-vh-100 pb-md-5 py-3 px-0">
        <div className="container p-0">
          <div className="card border-0">
            <div className="card-header align-items-center d-flex justify-content-center bg-opacity-25 border-0 py-3 ps-0">
              <h4 className="text-center mb-0 carDetailsHeading">
                Vehicle Inspection Report
              </h4>
            </div>

            <div
              className="card-body d-flex flex-column justify-content-center align-items-center p-md-4 p-1"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="row g-4 ps-0">
                <div className="col-12 ps-0">
                  <div className="row gx-4">
                    {[
                      { display: "AC Heater", value: "acHeater" },
                      {
                        display: "Engine Transmission ",
                        value: "engineTransmissionClutch",
                      },
                      { display: "Exterior", value: "exterior" },
                      { display: "Skeleton", value: "skeleton" },
                      {
                        display: "Accident Checklist",
                        value: "accidentChecklist",
                      },
                      { display: "Brakes", value: "brakes" },
                      {
                        display: "Suspension Steering",
                        value: "suspensionSteering",
                      },
                      { display: "Interior", value: "interior" },
                      {
                        display: "Electrical Electronics",
                        value: "electricalElectronics",
                      },
                      { display: "Tyres", value: "tyres" },
                    ].map((item, index) => (
                      <div
                        className="col-12 col-md-4 px-md-2 px-0"
                        key={index}
                        style={{
                          marginBottom: "10px",
                        }}
                      >
                        <label htmlFor={item.value} className="form-label">
                          {item.display}
                        </label>
                        <input
                          style={{ height: "60px" }}
                          type="number"
                          min="0"
                          max="100"
                          className="form-control my-0"
                          id={item.value}
                          value={
                            ratings?.imageValueChecks?.find(
                              (r) => r.name === item.value
                            )?.value || ""
                          }
                          onChange={(e) =>
                            handleRatingChange(item.value, e.target.value)
                          }
                          required
                          placeholder="Rate from 0-100"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-12 ps-0">
                  <div className="d-flex justify-content-center gap-3">
                    <button
                      className="backBtn"
                      style={{
                        padding: "25px 7%",
                        fontSize: "1.2rem",
                        borderRadius: "40px",
                      }}
                    >
                      Back
                    </button>
                    <button
                      style={{
                        padding: "25px 7%",
                        fontSize: "1.2rem",
                        borderRadius: "40px",
                      }}
                      onClick={!editMode ? handleSubmit : editHandler}
                      className="nextBtn"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Toaster
          position={window.innerWidth <= 768 ? "bottom-right" : "top-right"}
        />
      </div>
    </>
  );
};

export default VehicleInspectionReport;
