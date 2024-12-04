import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import axios from "axios";
import api from "../../../utils/url.js";

const ExteriorBody = () => {
  const dispatch = useDispatch();
  const carDetailsId = useSelector((state) => state.carDetailsId.carDetailsId);

  const [exteriorBodyData, setExteriorBodyData] = useState({
    carFrame: {
      imageValueChecks: []
    },
    exteriorLights: {
      imageValueChecks: []
    }
  });

  const changeStep = () => {
    dispatch(changeStepSuccess(10));
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };

  const handleImageChange = async (e, section, item) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      const base64WithPrefix = `data:image/png;base64,${base64.split(",")[1]}`;

      setExteriorBodyData(prev => {
        const newData = { ...prev };
        const checks = [...(newData[section].imageValueChecks || [])];
        const existingIndex = checks.findIndex(check => check.name === item);

        if (existingIndex >= 0) {
          checks[existingIndex] = {
            ...checks[existingIndex],
            data: {
              ...checks[existingIndex].data,
              image: { url: base64WithPrefix, public_id: "" }
            }
          };
        } else {
          checks.push({
            name: item,
            data: {
              image: { url: base64WithPrefix, public_id: "" },
              value: false
            }
          });
        }

        newData[section].imageValueChecks = checks;
        return newData;
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("/exteriorBody/add", {
        ...exteriorBodyData,
        carDetailsId: carDetailsId || "674d962b622d3809925855fe"
      });

      if (response.data.success) {
        alert("Exterior body data added successfully!");
        changeStep();
      }
    } catch (error) {
      console.error("Error submitting exterior body data:", error);
      alert("Error adding exterior body data");
    }
  };

  useEffect(() => {
    console.log(exteriorBodyData);
  }, [exteriorBodyData]);

  return (
    <div className="container-fluid min-vh-100 bg-light py-md-5 py-3 px-0">
      <div className="container p-0">
        <div className="card shadow">
          <div className="text-white p-4" style={{ backgroundColor: "#00a5e3" }}>
            <h2 className="display-4 form-title text-center fw-bold">Exterior Body</h2>
          </div>

          <div className="card-body p-4">
            <div className="row g-4">
              <div className="col-12">
                <h3>Car Frame</h3>
                <br />
                <div className="row">
                  {[
                    "frontWindshieldCondition",
                    "rearWindshieldCondition", 
                    "windscreenWiper",
                    "frontRightDoorWindow",
                    "frontLeftDoorWindow",
                    "rearRightDoorWindow",
                    "rearLeftDoorWindow",
                    "trunkLock"
                  ].map((item) => (
                    <div className="col-12 col-md-6 mb-3" key={item}>
                      <div className="mb-3">
                        <label className="form-label">
                          {item.split(/(?=[A-Z])/).join(" ")}
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(e, "carFrame", item)}
                          accept="image/*"
                          required
                          className="form-control mb-2"
                        />
                        <div className="form-floating">
                          <select
                            value={exteriorBodyData.carFrame.imageValueChecks.find(
                              (check) => check.name === item
                            )?.data?.value ?? false}
                            onChange={(e) => {
                              const value = e.target.value === "true";
                              setExteriorBodyData(prev => {
                                const newData = { ...prev };
                                const checks = [...(newData.carFrame.imageValueChecks || [])];
                                const existingIndex = checks.findIndex(check => check.name === item);

                                if (existingIndex >= 0) {
                                  checks[existingIndex].data.value = value;
                                } else {
                                  checks.push({
                                    name: item,
                                    data: {
                                      image: { url: "", public_id: "" },
                                      value: value
                                    }
                                  });
                                }

                                newData.carFrame.imageValueChecks = checks;
                                return newData;
                              });
                            }}
                            className="form-select"
                            id={`carFrame-${item}`}
                          >
                            <option value="false">Not Working</option>
                            <option value="true">Working</option>
                          </select>
                          <label htmlFor={`carFrame-${item}`}>Status</label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-12">
                <h3>Exterior Lights</h3>
                <br />
                <div className="row">
                  {[
                    "rightHeadlightWorking",
                    "leftHeadlightWorking",
                    "rightHeadlightCondition",
                    "leftHeadlightCondition",
                    "rightTaillightCondition",
                    "leftTaillightCondition",
                    "rightTaillightWorking",
                    "leftTaillightWorking"
                  ].map((item) => (
                    <div className="col-12 col-md-6 mb-3" key={item}>
                      <div className="mb-3">
                        <label className="form-label">
                          {item.split(/(?=[A-Z])/).join(" ")}
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(e, "exteriorLights", item)}
                          accept="image/*"
                          required
                          className="form-control mb-2"
                        />
                        <div className="form-floating">
                          <select
                            value={exteriorBodyData.exteriorLights.imageValueChecks.find(
                              (check) => check.name === item
                            )?.data?.value ?? false}
                            onChange={(e) => {
                              const value = e.target.value === "true";
                              setExteriorBodyData(prev => {
                                const newData = { ...prev };
                                const checks = [...(newData.exteriorLights.imageValueChecks || [])];
                                const existingIndex = checks.findIndex(check => check.name === item);

                                if (existingIndex >= 0) {
                                  checks[existingIndex].data.value = value;
                                } else {
                                  checks.push({
                                    name: item,
                                    data: {
                                      image: { url: "", public_id: "" },
                                      value: value
                                    }
                                  });
                                }

                                newData.exteriorLights.imageValueChecks = checks;
                                return newData;
                              });
                            }}
                            className="form-select"
                            id={`exteriorLights-${item}`}
                          >
                            <option value="false">Not Working</option>
                            <option value="true">Working</option>
                          </select>
                          <label htmlFor={`exteriorLights-${item}`}>Status</label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-end mt-4">
              <button onClick={handleSubmit} className="btn btn-primary btn-lg">
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
  );
};

export default ExteriorBody;
