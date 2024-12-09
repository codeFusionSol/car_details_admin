import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import api from "../../../utils/url.js";
import { Toaster, toast } from "sonner";

const ElectricalElectronics = () => {
  const dispatch = useDispatch();
  const carDetailsId = useSelector((state) => state.carDetailsId.carDetailsId);

  const [electricalElectronicsData, setElectricalElectronicsData] = useState({
    computerCheckUp: {
      imageValueChecks: [],
    },
    battery: {
      imageValueChecks: [],
    },
  });

  const optionsMapping = {
    computerCheckUp: {
      malfunctionCheck: ["No Error", "Errors"],
      rearViewCamera: ["Present & Working", "Not Present", "Not Working"],
      batteryWarningLight: ["Not Present", "Present"],
      oilPressureLowWarningLight: ["Not Present", "Present"],
      temperatureWarningLight: ["Not Present", "Present"],
      gauges: ["Not Present", "Present"],
      airBagWarningLight: ["Not Present", "Present"],
      powerSteeringWarningLight: ["Not Present", "Present"],
      absWarningLight: ["Not Present", "Present"],
      keyFobBatteryLowLight: ["Not Present", "Present"],
    },
    battery: {
      terminalCondition: ["Ok", "Rusted", "Rusted & Damage"],
      charging: ["Ok"],
      alternatorOperation: ["Ok"],
      battery: ["100%", "75%", "50%", "25%"],
    },
  };

  const calculatePercentage = (value, options) => {
    const index = options.indexOf(value);
    if (index === -1) return 0; // Default to 0 if no value is selected
    return Math.round(((options.length - index) / options.length) * 100);
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });
  };

  const handleImageChange = async (e, section, name) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      const base64WithPrefix = `data:image/png;base64,${base64.split(",")[1]}`;

      setElectricalElectronicsData((prev) => {
        const newData = { ...prev };
        const checks = [...(newData[section].imageValueChecks || [])];
        const existingIndex = checks.findIndex((check) => check.name === name);

        if (existingIndex >= 0) {
          checks[existingIndex].data.image = {
            url: base64WithPrefix,
            public_id: "",
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

        newData[section].imageValueChecks = checks;
        return newData;
      });
    }
  };

  const handleValueChange = (section, name, value) => {
    const percentage = calculatePercentage(
      value,
      optionsMapping[section][name] || []
    );

    setElectricalElectronicsData((prev) => {
      const newData = { ...prev };
      const checks = [...(newData[section].imageValueChecks || [])];
      const existingIndex = checks.findIndex((check) => check.name === name);

      if (existingIndex >= 0) {
        checks[existingIndex].data.value = value;
        checks[existingIndex].data.percentage = percentage;
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

      newData[section].imageValueChecks = checks;
      return newData;
    });
  };

  const handleNumberChange = (section, name, value) => {
    setElectricalElectronicsData((prev) => {
      const newData = { ...prev };
      const checks = [...(newData[section].imageValueChecks || [])];
      const existingIndex = checks.findIndex((check) => check.name === name);

      if (existingIndex >= 0) {
        checks[existingIndex].data.value = value;
      } else {
        checks.push({
          name,
          data: {
            image: { url: "", public_id: "" },
            value,
          },
        });
      }

      newData[section].imageValueChecks = checks;
      return newData;
    });
  };

  const changeStep = async () => {
    try {
      const response = await api.post("/electricalElectronics/add", {
        computerCheckUp: electricalElectronicsData?.computerCheckUp,
        battery: electricalElectronicsData?.battery,
        carDetailsId: carDetailsId || "674d962b622d3809925855fe",
      });

      if (response.data.success) {
        toast("Electrical & Electronics Added!", {
          style: {
            padding: "16px",
          },
        });
        setTimeout(() => {
          dispatch(changeStepSuccess(9));
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting electrical electronics data:", error);
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
                Electrical & Electronics
              </h2>
            </div>

            <div className="card-body p-4">
              {Object.entries(optionsMapping).map(([section, checks]) => (
                <div key={section}>
                  <h3 className="mb-3">
                    {section.split(/(?=[A-Z])/).join(" ")}
                  </h3>
                  <div className="row">
                    {Object.entries(checks).map(([name, options]) => (
                      <div className="col-12 col-md-6 mb-3" key={name}>
                        <label className="form-label">
                          {name.split(/(?=[A-Z])/).join(" ")}
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(e, section, name)}
                          accept="image/*"
                          className="form-control mb-2"
                        />
                        <select
                          className="form-select"
                          value={
                            electricalElectronicsData[
                              section
                            ].imageValueChecks.find(
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
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-end mt-4">
              <button
                onClick={changeStep}
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

export default ElectricalElectronics;
