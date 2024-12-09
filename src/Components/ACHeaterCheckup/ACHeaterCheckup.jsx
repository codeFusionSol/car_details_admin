import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import api from "../../../utils/url.js";
import { Toaster, toast } from "sonner";

const ACHeaterCheckup = () => {
  const dispatch = useDispatch();
  const carDetailsId = useSelector((state) => state.carDetailsId.carDetailsId);

  const [acHeaterData, setAcHeaterData] = useState({
    acHeaterCheckUp: {
      imageValueChecks: [],
    },
  });

  const optionsMapping = {
    acFitted: ["Yes", "No"],
    acOperational: ["Yes", "AC Cooling Slow", "No"],
    blower: ["Excellent Air Throw", "Less Throw"],
    cooling: ["Excellent", "Less Cooling"],
    heating: ["Excellent", "Less Heating"],
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

  const handleImageChange = async (e, item) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      const base64WithPrefix = `data:image/png;base64,${base64.split(",")[1]}`;

      setAcHeaterData((prev) => {
        const newData = { ...prev };
        const checks = [...newData.acHeaterCheckUp.imageValueChecks];
        const existingIndex = checks.findIndex((check) => check.name === item);

        if (existingIndex >= 0) {
          checks[existingIndex].data.image = {
            public_id: "",
            url: base64WithPrefix,
          };
        } else {
          checks.push({
            name: item,
            data: {
              image: { public_id: "", url: base64WithPrefix },
              value: "",
              percentage: 0,
            },
          });
        }

        newData.acHeaterCheckUp.imageValueChecks = checks;
        return newData;
      });
    }
  };

  const handleInputChange = (e, item) => {
    const value = e.target.value;
    const percentage = calculatePercentage(value, optionsMapping[item]);

    setAcHeaterData((prev) => {
      const newData = { ...prev };
      const checks = [...newData.acHeaterCheckUp.imageValueChecks];
      const existingIndex = checks.findIndex((check) => check.name === item);

      if (existingIndex >= 0) {
        checks[existingIndex].data.value = value;
        checks[existingIndex].data.percentage = percentage;
      } else {
        checks.push({
          name: item,
          data: {
            image: { public_id: "", url: "" },
            value: value,
            percentage: percentage,
          },
        });
      }

      newData.acHeaterCheckUp.imageValueChecks = checks;
      return newData;
    });
  };

  const changeStep = () => {
    dispatch(changeStepSuccess(8));
  };

  const handleSubmit = async () => {
    try {
      if (!acHeaterData.acHeaterCheckUp?.imageValueChecks?.length) {
        alert("Please fill in all required fields");
        return;
      }

      const response = await api.post("/acHeater/add", {
        ...acHeaterData,
        carDetailsId: carDetailsId || "674d962b622d3809925855fe",
      });

      if (response.data.success) {
        toast("AC & Heater Added!", {
          style: { padding: "16px" },
        });
        setTimeout(() => {
          changeStep();
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting AC/Heater data:", error);
      alert(error.response?.data?.message || "Error submitting data");
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
              AC & Heater Checkup
            </h2>
          </div>

          <div className="card-body p-4">
            <div className="row">
              {Object.keys(optionsMapping).map((item) => (
                <div className="col-12 col-md-6 mb-3" key={item}>
                  <label className="form-label">
                    {item.split(/(?=[A-Z])/).join(" ")}
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(e, item)}
                    accept="image/*"
                    className="form-control mb-2"
                  />
                  <select
                    className="form-select"
                    value={
                      acHeaterData.acHeaterCheckUp.imageValueChecks.find(
                        (check) => check.name === item
                      )?.data?.value || ""
                    }
                    onChange={(e) => handleInputChange(e, item)}
                  >
                    <option value="">Select Status</option>
                    {optionsMapping[item].map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
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
      <Toaster position="top-right" />
    </div>
  );
};

export default ACHeaterCheckup;
