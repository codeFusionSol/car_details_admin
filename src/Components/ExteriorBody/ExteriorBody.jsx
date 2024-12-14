import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import api from "../../../utils/url.js";
import { Toaster, toast } from "sonner";
import { addDataToCarDetailsSuccess, updateDataToCarDetailsSuccess } from "../../redux/Slices/CarDetail_id.jsx";

const ExteriorBody = () => {
  const dispatch = useDispatch();
  const {carDetailsId, fullDetaills} = useSelector((state) => state.carDetailsId);
  const [editMode, setEditMode] = useState(false);

  const [exteriorBodyData, setExteriorBodyData] = useState({
    carFrame: {
      imageValueChecks: [],
    },
    exteriorLights: {
      imageValueChecks: [], 
    },
  });

  useEffect(() => {
    if (fullDetaills.length > 9) {
      // Create a deep copy of the data to avoid mutating read-only objects
      const deepCopy = JSON.parse(JSON.stringify(fullDetaills[9]));
      setExteriorBodyData(deepCopy);
      setEditMode(true);
    }
  }, [fullDetaills]);

  const optionsMapping = {
    carFrame: {
      trunkLock: ["Working Properly", "Not Working"],
      frontWindshieldCondition: ["Perfect", "Swirls", "Damaged"],
      rearWindshieldCondition: ["Perfect", "Swirls", "Damaged"],
      frontRightDoorWindow: ["Perfect", "Swirls", "Damaged"],
      frontLeftDoorWindow: ["Perfect", "Swirls", "Damaged"],
      rearRightDoorWindow: ["Perfect", "Swirls", "Damaged"],
      rearLeftDoorWindow: ["Perfect", "Swirls", "Damaged"],
      windscreenWiper: [
        "Perfect",
        "Rubber Not Proper",
        "Wiper Motion Not Working",
        "Damaged",
      ],
    },
    exteriorLights: {
      rightHeadlightWorking: ["Working Properly", "Not Working"],
      leftHeadlightWorking: ["Working Properly", "Not Working"],
      rightHeadlightCondition: ["Working Properly", "Not Working"],
      leftHeadlightCondition: ["Working Properly", "Not Working"],
      rightTaillightWorking: ["Working Properly", "Not Working"],
      leftTaillightWorking: ["Working Properly", "Not Working"],
      rightTaillightCondition: ["Working Properly", "Not Working"],
      leftTaillightCondition: ["Working Properly", "Not Working"],
    },
  };

  const calculatePercentage = (value, options) => {
    const index = options.indexOf(value);
    if (index === -1) return 0;
    return Math.round(((options.length - index) / options.length) * 100);
  };

  const handleValueChange = (section, name, value) => {
    const percentage = calculatePercentage(
      value,
      optionsMapping[section][name]
    );

    setExteriorBodyData((prev) => {
      // Create deep copies to avoid mutating state directly
      const newData = JSON.parse(JSON.stringify(prev));
      const checks = [...(newData[section].imageValueChecks || [])];
      const existingIndex = checks.findIndex((check) => check.name === name);

      if (existingIndex >= 0) {
        checks[existingIndex] = {
          ...checks[existingIndex],
          data: {
            ...checks[existingIndex].data,
            value,
            percentage
          }
        };
      } else {
        checks.push({
          name,
          data: {
            image: { url: "", public_id: "" },
            value,
            percentage,
          },
        });
      }

      return {
        ...newData,
        [section]: {
          ...newData[section],
          imageValueChecks: checks
        }
      };
    });
  };

  const handleImageChange = async (e, section, name) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
      });
      const base64WithPrefix = `data:image/png;base64,${base64.split(",")[1]}`;

      setExteriorBodyData((prev) => {
        // Create deep copies to avoid mutating state directly
        const newData = JSON.parse(JSON.stringify(prev));
        const checks = [...(newData[section].imageValueChecks || [])];
        const existingIndex = checks.findIndex((check) => check.name === name);

        if (existingIndex >= 0) {
          checks[existingIndex] = {
            ...checks[existingIndex],
            data: {
              ...checks[existingIndex].data,
              image: {
                url: base64WithPrefix,
                public_id: ""
              }
            }
          };
        } else {
          checks.push({
            name,
            data: {
              image: { url: base64WithPrefix, public_id: "" },
              value: "",
              percentage: 0,
            },
          });
        }

        return {
          ...newData,
          [section]: {
            ...newData[section],
            imageValueChecks: checks
          }
        };
      });
    }
  };

  const changeStep = () => {
    dispatch(changeStepSuccess(10));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("/exteriorBody/add", {
        ...exteriorBodyData,
        carDetailsId: carDetailsId || "674d962b622d3809925855fe",
      });

      if (response.data.success) {
        toast("Exterior Body Added!", {
          style: { padding: "16px" },
        });
        setTimeout(() => {
          dispatch(addDataToCarDetailsSuccess(response?.data?.data));
          changeStep();
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting exterior body data:", error);
      alert("Error adding exterior body data");
    }
  };

  const editHandler = async () => {
    try {
      const response = await api.put(`/exteriorBody/update/${fullDetaills[9]._id}`, exteriorBodyData);

      if (response.data.success) {
        toast("Exterior Body Updated!", { style: { padding: "16px" } });
        setTimeout(() => {
          dispatch(updateDataToCarDetailsSuccess(response?.data?.data));
          dispatch(changeStepSuccess(fullDetaills.length));
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating Exterior Body data:", error);
    }
  };

  return (
    <>
    <div className="container-fluid min-vh-100 pb-md-5 py-3 px-0">
        <div className="container p-0">
          <div className="card border-0">
            <div className="card-header align-items-center d-flex justify-content-center bg-opacity-25 border-0 py-3 ps-0">
              <h4 className="text-center mb-0 carDetailsHeading">
                Exterior Body
              </h4>
            </div>

            <div
              className="card-body d-flex flex-column justify-content-center align-items-center p-lg-4 p-1"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="row g-4 px-0">
                <div className="col-12 px-0">
                  <div className="row gx-4">
                    {Object.entries(optionsMapping).flatMap(([section, checks]) =>
                      Object.entries(checks).map(([name, options], index) => (
                        <div
                          className="col-12 col-md-4 px-md-2 px-0"
                          key={index}
                          style={{
                            marginBottom: "30px",
                          }}
                        >
                          <fieldset
                            style={{
                              border: "1px dashed #ccc",
                              borderRadius: "8px",
                              padding: "15px",
                            }}
                          >
                            <legend className="legend">
                              {name.split(/(?=[A-Z])/).join(" ")}
                            </legend>

                            <div
                              className="rounded p-3 text-center"
                              style={{
                                height: "80px",
                                backgroundColor: "#FFF6E0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px solid #FFCC00",
                                borderRadius: "6px",
                              }}
                            >
                              <input
                                type="file"
                                onChange={(e) => handleImageChange(e, section, name)}
                                className="d-none"
                                accept="image/*"
                                id={`image-${name}`}
                              />
                              <label
                                htmlFor={`image-${name}`}
                                className="d-flex align-items-center justify-content-center gap-2 mb-0 cursor-pointer"
                                style={{
                                  color: "#FFCC00",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  style={{ marginRight: "5px" }}
                                >
                                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                  <circle cx="8.5" cy="8.5" r="1.5" />
                                  <polyline points="21 15 16 10 5 21" />
                                </svg>
                                <span className="d-none d-md-inline" style={{color:"var(--black-color) !important"}}>
                                  {window.innerWidth >= 1025 && "Click to upload image"}
                                </span>
                              </label>
                            </div>

                            <select
                              style={{
                                height: "50px",
                                backgroundColor: "#fff",
                                marginTop: "15px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                padding: "0 10px",
                              }}
                              className="form-select"
                              value={
                                exteriorBodyData[section].imageValueChecks.find(
                                  (check) => check.name === name
                                )?.data?.value || ""
                              }
                              onChange={(e) =>
                                handleValueChange(section, name, e.target.value)
                              }
                            >
                              <option value="">Select Status</option>
                              {options.map((option, idx) => (
                                <option key={idx} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </fieldset>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="col-12 ps-0">
                  <div className="d-flex justify-content-center gap-3">
                    <button className="backBtn"
                      onClick={() => {
                        dispatch(changeStepSuccess(9));
                      }}
                    >
                      Back
                    </button>
                    <button onClick={editMode ? editHandler : handleSubmit} className="nextBtn">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default ExteriorBody;
