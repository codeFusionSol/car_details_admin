import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import api from "../../../utils/url.js";
import { Toaster, toast } from "sonner";

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
      <div className="container-fluid min-vh-100 bg-light pb-md-5 py-3 px-0">
        <div className="container p-0">
          <div className="card shadow">
            <div
              className="text-white p-4"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              <h2 className="display-4 form-title text-center fw-bold">
                Interior
              </h2>
            </div>

            <div className="card-body p-4">
              {Object.keys(dropdownOptions).map((section) => (
                <div key={section} className="col-12 mb-4">
                  <h3 className="fw-bold">
                    {section.replace(/([A-Z])/g, " $1").trim()}
                  </h3>
                  <br />
                  <div className="row">
                    {Object.keys(dropdownOptions[section]).map(
                      (item, index) => (
                        <div className="col-12 col-md-6 mb-3" key={index}>
                          <label className="form-label">
                            {item.replace(/([A-Z])/g, " $1").trim()}
                          </label>
                          <select
                            className="form-select"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                section,
                                item,
                                dropdownOptions[section][item]
                              )
                            }
                          >
                            <option value="">Select the value</option>
                            {dropdownOptions[section][item].map((option, i) => (
                              <option key={i} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          <input
                            type="file"
                            className="form-control mt-2"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageChange(e, section, item)
                            }
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
              <button
                onClick={handleSubmit}
                className="btn btn-lg"
                style={{ backgroundColor: "var(--primary-color)" }}
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default Interior;
