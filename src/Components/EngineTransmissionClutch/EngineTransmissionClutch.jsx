import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import api from "../../../utils/url.js";
import { Toaster, toast } from "sonner";

const EngineTransmissionClutch = () => {
  const dispatch = useDispatch();
  const { carDetailsId } = useSelector((state) => state.carDetailsId);

  const [engineTransmissionData, setEngineTransmissionData] = useState({
    fluidsFiltersCheck: { imageValueChecks: [] },
    mechanicalCheck: { imageValueChecks: [] },
    exhaustCheck: { imageValueChecks: [] },
    engineCoolingSystem: { imageValueChecks: [] },
    transmissionCheck: { imageValueChecks: [] },
  });

  const options = {
    fluidsFiltersCheck: {
      engineOilLevel: [
        "complete and clean",
        "dirty oil",
        "below the lower mark",
      ],
      engineOilLeakage: ["No Leakage", "Minor leakage", "Major leakage"],
      transmissionOilLeakage: ["No Leakage", "Minor leakage", "Major leakage"],
      coolantLeakage: ["No Leakage", "Minor leakage", "Major leakage"],
      brakeOilLeakage: ["No Leakage", "Minor leakage", "Major leakage"],
    },
    mechanicalCheck: {
      wires: ["Ok", "Brake"],
      engineBlow: ["Not Present", "Present"],
      engineNoise: ["No Noise", "Noise"],
      engineVibration: ["No Vibration", "Minor Vibration", "Major Vibration"],
      engineMounts: ["Ok", "Brake"],
      hoses: ["Ok", "Brake"],
    },
    exhaustCheck: {
      exhaustSound: ["Sound", "No Sound"],
    },
    engineCoolingSystem: {
      radiator: ["Ok", "Rusted", "Choke"],
      suctionFan: ["Working Properly", "Working Slow", "Not Working"],
    },
    transmissionCheck: {
      starterOperation: ["Ok", "Not Ok"],
    },
  };

  const changeStep = () => {
    dispatch(changeStepSuccess(4));
  };

  const calculatePercentage = (selectedValue, fieldOptions) => {
    const index = fieldOptions.indexOf(selectedValue);
    if (index === -1) return ""; // Default value if no valid option is selected
    return Math.round(
      ((fieldOptions.length - index) / fieldOptions.length) * 100
    );
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleInputChange = (e, section, field) => {
    const value = e.target.value;
    const percentage = calculatePercentage(value, options[section][field]);

    setEngineTransmissionData((prev) => ({
      ...prev,
      [section]: {
        imageValueChecks: prev[section].imageValueChecks.map((check) =>
          check.name === field
            ? {
                ...check,
                data: {
                  ...check.data,
                  value,
                  percentage,
                },
              }
            : check
        ),
      },
    }));
  };

  const handleImageChange = async (e, section, field) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      setEngineTransmissionData((prev) => ({
        ...prev,
        [section]: {
          imageValueChecks: prev[section].imageValueChecks.map((check) =>
            check.name === field
              ? {
                  ...check,
                  data: {
                    ...check.data,
                    image: { url: base64, public_id: "" },
                  },
                }
              : check
          ),
        },
      }));
    }
  };

  useEffect(() => {
    setEngineTransmissionData({
      fluidsFiltersCheck: {
        imageValueChecks: Object.keys(options.fluidsFiltersCheck).map(
          (key) => ({
            name: key,
            data: {
              image: { url: "", public_id: "" },
              value: "",
              percentage: "",
            },
          })
        ),
      },
      mechanicalCheck: {
        imageValueChecks: Object.keys(options.mechanicalCheck).map((key) => ({
          name: key,
          data: {
            image: { url: "", public_id: "" },
            value: "",
            percentage: "",
          },
        })),
      },
      exhaustCheck: {
        imageValueChecks: Object.keys(options.exhaustCheck).map((key) => ({
          name: key,
          data: {
            image: { url: "", public_id: "" },
            value: "",
            percentage: "",
          },
        })),
      },
      engineCoolingSystem: {
        imageValueChecks: Object.keys(options.engineCoolingSystem).map(
          (key) => ({
            name: key,
            data: {
              image: { url: "", public_id: "" },
              value: "",
              percentage: "",
            },
          })
        ),
      },
      transmissionCheck: {
        imageValueChecks: Object.keys(options.transmissionCheck).map((key) => ({
          name: key,
          data: {
            image: { url: "", public_id: "" },
            value: "",
            percentage: "",
          },
        })),
      },
    });
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await api.post("/engineTransmissionClutch/add", {
        ...engineTransmissionData,
        carDetailsId: carDetailsId || "674d962b622d3809925855fe",
      });

      if (response.data.success) {
        toast("Engine Transmission Clutch Added!", {
          style: { padding: "16px" },
        });
        setTimeout(() => changeStep(), 2000);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error adding engine transmission clutch");
    }
  };

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
                Engine, Transmission & Clutch
              </h2>
            </div>
            <div className="card-body p-4">
              {Object.entries(engineTransmissionData).map(([section, data]) => (
                <div className="mb-4" key={section}>
                  <h3>{section.replace(/([A-Z])/g, " $1").trim()}</h3>
                  <div className="row">
                    {data.imageValueChecks.map((item) => (
                      <div className="col-md-6 mb-3" key={item.name}>
                        <label className="form-label">
                          {item.name.split(/(?=[A-Z])/).join(" ")}
                        </label>
                        <select
                          className="form-select"
                          onChange={(e) =>
                            handleInputChange(e, section, item.name)
                          }
                        >
                          <option value="">Select the value</option>
                          {options[section][item.name].map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <input
                          type="file"
                          className="form-control mt-2"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageChange(e, section, item.name)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="text-end mt-4">
                <button
                  onClick={handleSubmit}
                  className="btn  btn-lg"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
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
      <Toaster position="top-right" />
    </>
  );
};

export default EngineTransmissionClutch;
