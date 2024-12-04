import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import { useEffect, useState } from "react";
import api from "../../../utils/url.js";

const SuspensionSteering = () => {
  const dispatch = useDispatch();
  const carDetailsId = useSelector((state) => state.carDetailsId.carDetailsId);

  const [suspensionData, setSuspensionData] = useState({
    frontSuspension: {
      imageValueChecks: []
    },
    rearSuspension: {
      imageValueChecks: []
    }
  });

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };

  const changeStep = async () => {
    try {
      if (!suspensionData.frontSuspension?.imageValueChecks?.length || 
          !suspensionData.rearSuspension?.imageValueChecks?.length) {
        alert("Please fill in all required fields");
        return;
      }

      const response = await api.post(`/suspensionSteering/add`, {
        frontSuspension: suspensionData.frontSuspension,
        rearSuspension: suspensionData.rearSuspension,
        carDetailsId: carDetailsId || '674d962b622d3809925855fe'
      });

      if (response.data.success) {
        alert("Suspension & steering data added successfully!");
        dispatch(changeStepSuccess(6));
      }
    } catch (error) {
      console.error("Error submitting suspension data:", error);
      alert(error.response?.data?.message || "Error submitting data");
    }
  };

  const handleImageChange = async (e, section, item) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      const base64WithPrefix = `data:image/png;base64,${base64.split(",")[1]}`;

      setSuspensionData(prev => {
        const newData = { ...prev };
        const checks = [...newData[section].imageValueChecks];
        const existingIndex = checks.findIndex(check => check.name === item);

        if (existingIndex >= 0) {
          checks[existingIndex].data.image.url = base64WithPrefix;
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

  const handleValueChange = (section, item, value) => {
    setSuspensionData(prev => {
      const newData = { ...prev };
      const checks = [...newData[section].imageValueChecks];
      const existingIndex = checks.findIndex(check => check.name === item);

      if (existingIndex >= 0) {
        checks[existingIndex].data.value = value === "true";
      } else {
        checks.push({
          name: item,
          data: {
            image: { url: "", public_id: "" },
            value: value === "true"
          }
        });
      }

      newData[section].imageValueChecks = checks;
      return newData;
    });
  };

  useEffect(() => {
    console.log(suspensionData);
  }, [suspensionData]);

  return (
    <div className="container-fluid min-vh-100 bg-light py-md-5 py-3 px-0">
      <div className="container p-0">
        <div className="card shadow">
          <div className="text-white p-4" style={{ backgroundColor: "red" }}>
            <h2 className="display-4 form-title text-center fw-bold">Suspension & Steering</h2>
          </div>

          <div className="card-body p-4">
            <div className="row g-4">
              <div className="col-12">
                <h3 className="fw-bold mb-3">Front Suspension</h3>
                <div className="row">
                  {[
                    "steeringWheelPlay",
                    "rightBallJoint",
                    "leftBallJoint", 
                    "rightZLinks",
                    "leftZLinks",
                    "rightTieRodEnd",
                    "leftTieRodEnd",
                    "frontRightBoots",
                    "frontLeftBoots",
                    "frontRightBushes",
                    "frontLeftBushes",
                    "frontRightShock",
                    "frontLeftShock"
                  ].map((item, index) => (
                    <div className="col-12 col-md-6 mb-3" key={index}>
                      <div className="mb-3">
                        <label className="form-label">
                          {item.split(/(?=[A-Z])/).join(" ")}
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(e, "frontSuspension", item)}
                          accept="image/*"
                          required
                          className="form-control mb-2"
                        />
                        <div className="form-floating">
                          <select
                            onChange={(e) => handleValueChange("frontSuspension", item, e.target.value)}
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
                <h3 className="fw-bold mb-3">Rear Suspension</h3>
                <div className="row">
                  {[
                    "rearRightBushes",
                    "rearLeftBushes", 
                    "rearRightShock",
                    "rearLeftShock"
                  ].map((item, index) => (
                    <div className="col-12 col-md-6 mb-3" key={index}>
                      <div className="mb-3">
                        <label className="form-label">
                          {item.split(/(?=[A-Z])/).join(" ")}
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(e, "rearSuspension", item)}
                          accept="image/*"
                          required
                          className="form-control mb-2"
                        />
                        <div className="form-floating">
                          <select
                            onChange={(e) => handleValueChange("rearSuspension", item, e.target.value)}
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
              <button onClick={changeStep} className="btn btn-primary btn-lg">
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

export default SuspensionSteering;
