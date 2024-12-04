import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import api from "../../../utils/url.js";

const Interior = () => {
  const dispatch = useDispatch();
  const carDetailsId = useSelector((state) => state.carDetailsId.carDetailsId);

  const [interiorData, setInteriorData] = useState({
    steeringControls: {
      imageValueChecks: [],
    },
    mirrors: {
      imageValueChecks: [], 
    },
    seats: {
      imageValueChecks: [],
    },
    powerAndCentralLocking: {
      imageValueChecks: [],
    },
    dashRoofControls: {
      imageValueChecks: [],
    },
    poshish: {
      imageValueChecks: [],
    },
    equipment: {
      imageValueChecks: [],
    },
  });

  const changeStep = () => {
    dispatch(changeStepSuccess(7));
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

  const handleImageChange = async (e, section, field, item) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await getBase64(file);
        const base64String = `data:image/png;base64,${base64.split(",")[1]}`;

        setInteriorData((prev) => {
          const newData = { ...prev };
          const checks = [...newData[field].imageValueChecks];
          const existingIndex = checks.findIndex((check) => check.name === item);

          if (existingIndex >= 0) {
            checks[existingIndex].data.image = {
              public_id: "",
              url: base64String
            };
          } else {
            checks.push({
              name: item,
              data: {
                image: {
                  public_id: "",
                  url: base64String
                },
                value: "",
              },
            });
          }
          newData[field].imageValueChecks = checks;
          return newData;
        });
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }
  };

  const handleInputChange = (e, section, field, item) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setInteriorData((prev) => {
      const newData = { ...prev };
      const checks = [...newData[field].imageValueChecks];
      const existingIndex = checks.findIndex((check) => check.name === item);

      if (existingIndex >= 0) {
        checks[existingIndex].data.value = value;
      } else {
        checks.push({
          name: item,
          data: {
            image: {
              public_id: "",
              url: ""
            },
            value: value,
          },
        });
      }
      newData[field].imageValueChecks = checks;
      return newData;
    });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/interior/add", {
        ...interiorData,
        carDetailsId: carDetailsId,
      });
      changeStep();
    } catch (error) {
      console.error("Error submitting interior data:", error);
    }
  };

  useEffect(() => {
    console.log(interiorData);
  }, [interiorData]);

  return (
    <div className="container-fluid min-vh-100 bg-light py-md-5 py-3 px-0">
      <div className="container p-0">
        <div className="card shadow">
          <div className="text-white p-4" style={{ backgroundColor: "red" }}>
            <h2 className="display-4 form-title text-center fw-bold">Interior</h2>
          </div>

          <div className="card-body p-4">
            <div className="row g-4">
              <div className="col-12">
                <h3>Steering Controls</h3>
                <br />
                <div className="row">
                  {[
                    "steeringWheelCondition",
                    "wiperWasherLever", 
                    "horn",
                    "lightsLeverSwitch"
                  ].map((item, index) => (
                    <div className="col-12 col-md-6 mb-3" key={index}>
                      <div className="mb-3">
                        <label className="form-label">
                          {item.split(/(?=[A-Z])/).join(" ")}
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(e, "interior", "steeringControls", item)}
                          accept="image/*"
                          required
                          className="form-control mb-2"
                        />
                        <div className="form-floating">
                          <select
                            onChange={(e) => handleInputChange(e, "interior", "steeringControls", item)}
                            className="form-select"
                            id={`select-${item}`}
                          >
                            <option value="">Select the value</option>
                            <option value="false">Good</option>
                            <option value="true">Bad</option>
                          </select>
                          <label htmlFor={`select-${item}`}>Condition</label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-12">
                <h3>Mirrors</h3>
                <br />
                <div className="row">
                  {[
                    "rightSideMirror",
                    "leftSideMirror",
                    "rearViewMirrorDimmer"
                  ].map((item, index) => (
                    <div className="col-12 col-md-6 mb-3" key={index}>
                      <div className="mb-3">
                        <label className="form-label">
                          {item.split(/(?=[A-Z])/).join(" ")}
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(e, "interior", "mirrors", item)}
                          accept="image/*"
                          required
                          className="form-control mb-2"
                        />
                        <div className="form-floating">
                          <select
                            onChange={(e) => handleInputChange(e, "interior", "mirrors", item)}
                            className="form-select"
                            id={`select-${item}`}
                          >
                            <option value="">Select the value</option>
                            <option value="false">Good</option>
                            <option value="true">Bad</option>
                          </select>
                          <label htmlFor={`select-${item}`}>Condition</label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-12">
                <h3>Seats</h3>
                <br />
                <div className="row">
                  {[
                    "rightSeatAdjusterRecliner",
                    "leftSeatAdjusterRecliner", 
                    "rightSeatAdjusterLearTrack",
                    "leftSeatAdjusterLearTrack",
                    "rightSeatBelt",
                    "leftSeatBelt",
                    "rearSeatBelt",
                    "gloveBox"
                  ].map((item, index) => (
                    <div className="col-12 col-md-6 mb-3" key={index}>
                      <div className="mb-3">
                        <label className="form-label">
                          {item.split(/(?=[A-Z])/).join(" ")}
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(e, "interior", "seats", item)}
                          accept="image/*"
                          required
                          className="form-control mb-2"
                        />
                        <div className="form-floating">
                          <select
                            onChange={(e) => handleInputChange(e, "interior", "seats", item)}
                            className="form-select"
                            id={`select-${item}`}
                          >
                            <option value="">Select the value</option>
                            <option value="false">Good</option>
                            <option value="true">Bad</option>
                          </select>
                          <label htmlFor={`select-${item}`}>Condition</label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-12">
                <h3>Power and Central Locking</h3>
                <br />
                <div className="row">
                  {[
                    "frontRightPowerWindowLever",
                    "frontLeftPowerWindowLever",
                    "rearRightPowerWindowLever", 
                    "rearLeftPowerWindowLever",
                    "autoLockButton",
                    "windowSafetyLock"
                  ].map((item, index) => (
                    <div className="col-12 col-md-6 mb-3" key={index}>
                      <div className="mb-3">
                        <label className="form-label">
                          {item.split(/(?=[A-Z])/).join(" ")}
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(e, "interior", "powerAndCentralLocking", item)}
                          accept="image/*"
                          required
                          className="form-control mb-2"
                        />
                        <div className="form-floating">
                          <select
                            onChange={(e) => handleInputChange(e, "interior", "powerAndCentralLocking", item)}
                            className="form-select"
                            id={`select-${item}`}
                          >
                            <option value="">Select the value</option>
                            <option value="false">Good</option>
                            <option value="true">Bad</option>
                          </select>
                          <label htmlFor={`select-${item}`}>Condition</label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-12">
                <h3>Dash & Roof Controls</h3>
                <br />
                <div className="row">
                  {[
                    "interiorLightings",
                    "dashControlsAC",
                    "dashControlsDeFog",
                    "dashontrolsHazzardLights",
                    "audioVideo",
                    "trunkReleaseLever",
                    "fuelCapReleaseLever",
                    "bonnetReleaseLever"
                  ].map((item, index) => (
                    <div className="col-12 col-md-6 mb-3" key={index}>
                      <div className="mb-3">
                        <label className="form-label">
                          {item.split(/(?=[A-Z])/).join(" ")}
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(e, "interior", "dashRoofControls", item)}
                          accept="image/*"
                          required
                          className="form-control mb-2"
                        />
                        <div className="form-floating">
                          <select
                            onChange={(e) => handleInputChange(e, "interior", "dashRoofControls", item)}
                            className="form-select"
                            id={`select-${item}`}
                          >
                            <option value="">Select the value</option>
                            <option value="false">Good</option>
                            <option value="true">Bad</option>
                          </select>
                          <label htmlFor={`select-${item}`}>Condition</label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-12">
                <h3>Poshish</h3>
                <br />
                <div className="row">
                  {[
                    "roofPoshish",
                    "floorMat",
                    "frontRightSeatPoshish",
                    "frontleftSeatPoshish", 
                    "rearSeatPoshish",
                    "dashboardCondition"
                  ].map((item, index) => (
                    <div className="col-12 col-md-6 mb-3" key={index}>
                      <div className="mb-3">
                        <label className="form-label">
                          {item.split(/(?=[A-Z])/).join(" ")}
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(e, "interior", "poshish", item)}
                          accept="image/*"
                          required
                          className="form-control mb-2"
                        />
                        <div className="form-floating">
                          <select
                            onChange={(e) => handleInputChange(e, "interior", "poshish", item)}
                            className="form-select"
                            id={`select-${item}`}
                          >
                            <option value="">Select the value</option>
                            <option value="false">Good</option>
                            <option value="true">Bad</option>
                          </select>
                          <label htmlFor={`select-${item}`}>Condition</label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-12">
                <h3>Equipment</h3>
                <br />
                <div className="row">
                  {[
                    "spareTire",
                    "jack",
                    "tools"
                  ].map((item, index) => (
                    <div className="col-12 col-md-6 mb-3" key={index}>
                      <div className="mb-3">
                        <label className="form-label">
                          {item.split(/(?=[A-Z])/).join(" ")}
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(e, "interior", "equipment", item)}
                          accept="image/*"
                          required
                          className="form-control mb-2"
                        />
                        <div className="form-floating">
                          <select
                            onChange={(e) => handleInputChange(e, "interior", "equipment", item)}
                            className="form-select"
                            id={`select-${item}`}
                          >
                            <option value="">Select the value</option>
                            <option value="false">Good</option>
                            <option value="true">Bad</option>
                          </select>
                          <label htmlFor={`select-${item}`}>Condition</label>
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

export default Interior;
