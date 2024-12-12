import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import api from "../../../utils/url.js";
import { Toaster, toast } from "sonner";
import { addDataToCarDetailsSuccess } from "../../redux/Slices/CarDetail_id.jsx";

const Interior = () => {
  const dispatch = useDispatch();
  const carDetailsId = useSelector((state) => state.carDetailsId.carDetailsId);

  const [interiorData, setInteriorData] = useState({
    steeringControls: { imageValueChecks: [] },
    mirrors: { imageValueChecks: [] },
    seats: { imageValueChecks: [] },
    powerAndCentralLocking: { imageValueChecks: [] },
    dashRoofControls: { imageValueChecks: [] },
    poshish: { imageValueChecks: [] },
    equipment: { imageValueChecks: [] },
  });

  const calculatePercentage = (selectedValue, options) => {
    const index = options.indexOf(selectedValue);
    if (index === -1) return ""; // Default case for "Select the value"
    return Math.round(((options.length - index) / options.length) * 100);
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });
  };

  const handleImageChange = async (e, section, item) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      const base64String = `data:image/png;base64,${base64.split(",")[1]}`;

      setInteriorData((prev) => {
        const newData = { ...prev };
        const checks = [...newData[section].imageValueChecks];
        const existingIndex = checks.findIndex((check) => check.name === item);

        if (existingIndex >= 0) {
          checks[existingIndex].data.image = {
            public_id: "",
            url: base64String,
          };
        } else {
          checks.push({
            name: item,
            data: {
              image: { public_id: "", url: base64String },
              value: "",
              percentage: "",
            },
          });
        }

        newData[section].imageValueChecks = checks;
        return newData;
      });
    }
  };

  const changeStep = () => {
    dispatch(changeStepSuccess(7));
  };

  const handleInputChange = (e, section, item, options) => {
    const value = e.target.value;
    const percentage = calculatePercentage(value, options);

    setInteriorData((prev) => {
      const newData = { ...prev };
      const checks = [...newData[section].imageValueChecks];
      const existingIndex = checks.findIndex((check) => check.name === item);

      if (existingIndex >= 0) {
        checks[existingIndex].data.value = value;
        checks[existingIndex].data.percentage = percentage;
      } else {
        checks.push({
          name: item,
          data: {
            image: { public_id: "", url: "" },
            value,
            percentage,
          },
        });
      }

      newData[section].imageValueChecks = checks;
      return newData;
    });
  };

  const dropdownOptions = {
    steeringControls: {
      steeringWheelCondition: ["Ok", "Scrached"],
      horn: ["Working", "Not Working"],
      lightsLeverSwitch: ["Working", "Not Working"],
      wiperWasherLever: ["Working", "Not Working"],
    },
    mirrors: {
      rightSideMirror: ["Working", "Not Working", "Not Working & Damage"],
      leftSideMirror: ["Working", "Not Working", "Not Working & Damage"],
      rearViewMirrorDimmer: ["Working", "Not Working", "Not Working & Damage"],
    },
    seats: {
      rightSeatAdjusterRecliner: ["Working", "Not Working"],
      leftSeatAdjusterRecliner: ["Working", "Not Working"],
      rightSeatAdjusterLearTrack: ["Working", "Not Working"],
      leftSeatAdjusterLearTrack: ["Working", "Not Working"],
      rightSeatBelt: ["Working", "Not Working"],
      leftSeatBelt: ["Working", "Not Working"],
      rearSeatBelt: ["Working", "Not Working"],
      gloveBox: ["Working", "Not Working", "Not Working & Damage"],
    },
    powerAndCentralLocking: {
      frontRightPowerWindowLever: ["Working", "Not Working"],
      frontLeftPowerWindowLever: ["Working", "Not Working"],
      rearRightPowerWindowLever: ["Working", "Not Working"],
      rearLeftPowerWindowLever: ["Working", "Not Working"],
      autoLockButton: ["Working", "Not Working"],
      windowSafetyLock: ["Working", "Not Working"],
    },
    dashRoofControls: {
      interiorLightings: ["Working", "Not Working"],
      dashControlsAC: ["Working", "Not Working"],
      dashControlsDeFog: ["Working", "Not Working"],
      dashControlsHazzardLights: ["Working", "Not Working"],
      audioVideo: ["Working", "Not Working"],
      trunkReleaseLever: ["Working", "Not Working"],
      fuelCapReleaseLever: ["Working", "Not Working"],
      bonnetReleaseLever: ["Working", "Not Working"],
    },
    poshish: {
      roofPoshish: ["Perfect", "Puffy"],
      floorMat: ["Perfect", "Scratches", "Teared and Colorless"],
      frontRightSeatPoshish: ["Perfect", "Scratches", "Teared and Colorless"],
      frontLeftSeatPoshish: ["Perfect", "Scratches", "Teared and Colorless"],
      rearSeatPoshish: ["Perfect", "Scratches", "Teared and Colorless"],
      dashboardCondition: ["Perfect", "Minor Spots", "Damage"],
    },
    equipment: {
      spareTire: ["Perfect Condition", "Punctured"],
      tools: ["Present", "Not Present"],
      jack: ["Present", "Not Present"],
    },
  };

  const handleSubmit = async () => {
    try {
      await api.post("/interior/add", {
        ...interiorData,
        carDetailsId: carDetailsId || "674d962b622d3809925855fe",
      });
      toast("Interior Added!", { style: { padding: "16px" } });
      setTimeout(() => {
        dispatch(addDataToCarDetailsSuccess(response?.data?.data));
        changeStep();
      }, 2000);
    } catch (error) {
      console.error("Error submitting interior data:", error);
    }
  };

  useEffect(() => {
    console.log(interiorData);
  }, [interiorData]);

  return (
    <>
      <div className="container-fluid min-vh-100 pb-md-5 py-3 px-0">
        <div className="container p-0">
          <div className="card border-0">
            <div className="card-header align-items-center d-flex justify-content-center bg-opacity-25 border-0 py-3 ps-0">
              <h4 className="text-center mb-0 carDetailsHeading">
                Interior Inspection
              </h4>
            </div>

            <div
              className="card-body d-flex flex-column justify-content-center align-items-center p-lg-4 p-1"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="row g-4 px-0">
                <div className="col-12 px-0">
                  <div className="row gx-4">
                    {Object.entries(dropdownOptions).flatMap(([section, items]) =>
                      Object.keys(items).map((item, index) => (
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
                              {item.split(/(?=[A-Z])/).join(" ")}
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
                                onChange={(e) => handleImageChange(e, section, item)}
                                className="d-none"
                                accept="image/*"
                                id={`image-${item}`}
                              />
                              <label
                                htmlFor={`image-${item}`}
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
                                  <rect
                                    x="3"
                                    y="3"
                                    width="18"
                                    height="18"
                                    rx="2"
                                    ry="2"
                                  />
                                  <circle cx="8.5" cy="8.5" r="1.5" />
                                  <polyline points="21 15 16 10 5 21" />
                                </svg>
                                <span className="d-none d-md-inline">
                                  {window.innerWidth >= 1025 &&
                                    "Click to upload image (optional)"}
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
                              onChange={(e) => handleInputChange(e, section, item, dropdownOptions[section][item])}
                              className="form-select"
                            >
                              <option value="">Select</option>
                              {dropdownOptions[section][item].map((option, i) => (
                                <option key={i} value={option}>
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
                    <button className="backBtn">Back</button>
                    <button onClick={handleSubmit} className="nextBtn">
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

export default Interior;
