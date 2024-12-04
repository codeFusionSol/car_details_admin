import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import api from "../../../utils/url.js";

const ACHeaterCheckup = () => {
  const dispatch = useDispatch();
  const carDetailsId = useSelector((state) => state.carDetailsId.carDetailsId);

  const [acHeaterData, setAcHeaterData] = useState({
    acHeaterCheckUp: {
      imageValueChecks: [],
    },
  });

  const changeStep = () => {
    dispatch(changeStepSuccess(8));
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
              image: {
                public_id: "",
                url: base64WithPrefix,
              },
              value: "",
            },
          });
        }

        newData.acHeaterCheckUp.imageValueChecks = checks;
        return newData;
      });
    }
  };

  const handleInputChange = (e, item) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setAcHeaterData((prev) => {
      const newData = { ...prev };
      const checks = [...newData.acHeaterCheckUp.imageValueChecks];
      const existingIndex = checks.findIndex((check) => check.name === item);

      if (existingIndex >= 0) {
        checks[existingIndex].data.value = value;
      } else {
        checks.push({
          name: item,
          data: {
            image: {
              public_id: "",
              url: "",
            },
            value: value,
          },
        });
      }

      newData.acHeaterCheckUp.imageValueChecks = checks;
      return newData;
    });
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
        alert("AC & Heater data added successfully!");
        changeStep();
      }
    } catch (error) {
      console.error("Error submitting AC/Heater data:", error);
      alert(error.response?.data?.message || "Error submitting data");
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-light py-md-5 py-3 px-0">
      <div className="container p-0">
        <div className="card shadow">
          <div className="text-white p-4" style={{ backgroundColor: "#00a5e3" }}>
            <h2 className="display-4 form-title text-center fw-bold">AC & Heater Checkup</h2>
          </div>

          <div className="card-body p-4">
            <div className="row g-4">
              <div className="col-12">
                <div className="row">
                  {[
                    "acFitted",
                    "acOperational",
                    "blower",
                    "cooling", 
                    "heating"
                  ].map((item) => (
                    <div className="col-12 col-md-6 mb-3" key={item}>
                      <div className="mb-3">
                        <label className="form-label">
                          {item.split(/(?=[A-Z])/).join(" ")}
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(e, item)}
                          accept="image/*"
                          required
                          className="form-control mb-2"
                        />
                        {item === "acFitted" || item === "acOperational" ? (
                          <div className="form-check">
                            <input
                              type="checkbox"
                              id={item}
                              checked={acHeaterData.acHeaterCheckUp.imageValueChecks.find(
                                (check) => check.name === item
                              )?.data?.value || false}
                              onChange={(e) => handleInputChange(e, item)}
                              className="form-check-input"
                            />
                            <label className="form-check-label" htmlFor={item}>
                              {item === "acFitted" ? "AC is Fitted" : "AC is Operational"}
                            </label>
                          </div>
                        ) : (
                          <div className="form-floating">
                            <select
                              value={acHeaterData.acHeaterCheckUp.imageValueChecks.find(
                                (check) => check.name === item
                              )?.data?.value || ""}
                              onChange={(e) => handleInputChange(e, item)}
                              required
                              className="form-select"
                              id={`select-${item}`}
                            >
                              <option value="">Select Status</option>
                              <option value="Working">Working</option>
                              <option value="Not Working">Not Working</option>
                            </select>
                            <label htmlFor={`select-${item}`}>Status</label>
                          </div>
                        )}
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

export default ACHeaterCheckup;
