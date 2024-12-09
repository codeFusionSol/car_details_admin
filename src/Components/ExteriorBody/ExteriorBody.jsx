import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import api from "../../../utils/url.js";
import { Toaster, toast } from "sonner";

const ExteriorBody = () => {
  const dispatch = useDispatch();
  const carDetailsId = useSelector((state) => state.carDetailsId.carDetailsId);

  const [exteriorBodyData, setExteriorBodyData] = useState({
    carFrame: {
      imageValueChecks: [],
    },
    exteriorLights: {
      imageValueChecks: [],
    },
  });

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
          changeStep();
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting exterior body data:", error);
      alert("Error adding exterior body data");
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-light pb-md-5 py-3 px-0">
      <div className="container p-0">
        <div className="card shadow">
          <div
            className="text-white p-4"
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            <h2 className="display-4 form-title text-center fw-bold">
              Exterior Body
            </h2>
          </div>

          <div className="card-body p-4">
            {Object.entries(optionsMapping).map(([section, checks]) => (
              <div key={section}>
                <h3 className="mb-3">{section.split(/(?=[A-Z])/).join(" ")}</h3>
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
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-end mt-4">
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
      <Toaster position="top-right" />
    </div>
  );
};

export default ExteriorBody;
