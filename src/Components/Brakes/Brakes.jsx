import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../utils/url.js";

const Brakes = () => {
  const dispatch = useDispatch();
  const carDetailsId = useSelector((state) => state.carDetailsId.carDetailsId);

  const [brakesData, setBrakesData] = useState({
    mechanicalCheck: {
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
      const response = await api.post("/brakes/add", {
        mechanicalCheck: brakesData.mechanicalCheck,
        carDetailsId: carDetailsId || "674d962b622d3809925855fe"
      });

      if (response.data.success) {
        alert("Brakes data added successfully!");
        dispatch(changeStepSuccess(5));
      }
    } catch (error) {
      console.error("Error adding brakes data:", error);
      alert("Error adding brakes data");
    }
  };

  const handleImageChange = async (e, item) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      const base64WithPrefix = `data:image/png;base64,${base64.split(",")[1]}`;

      setBrakesData((prev) => {
        const newChecks = [...prev.mechanicalCheck.imageValueChecks];
        const existingIndex = newChecks.findIndex(
          (check) => check.name === item
        );

        if (existingIndex >= 0) {
          newChecks[existingIndex].data.image.url = base64WithPrefix;
        } else {
          newChecks.push({
            name: item,
            data: {
              image: { url: base64WithPrefix, public_id: "" },
              value: false,
            },
          });
        }

        return {
          ...prev,
          mechanicalCheck: {
            ...prev.mechanicalCheck,
            imageValueChecks: newChecks
          }
        };
      });
    }
  };

  useEffect(() => {
    console.log(brakesData);
  }, [brakesData]);

  return (
    <div className="container-fluid min-vh-100 bg-light py-md-5 py-3 px-0">
      <div className="container p-0">
        <div className="card shadow">
          <div className="text-white p-4" style={{ backgroundColor: "red" }}>
            <h2 className="display-4 form-title text-center fw-bold">Brakes Inspection</h2>
          </div>

          <div className="card-body p-4">
            <div className="row g-4">
              <div className="col-12">
                <div className="row">
                  {[
                    "frontRightDisc",
                    "frontLeftDisc", 
                    "frontRightBrakePad",
                    "frontLeftBrakePad",
                    "parkingHandBrake"
                  ].map((item, index) => (
                    <div className="col-12 col-md-6 mb-3" key={index}>
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
                        {brakesData.mechanicalCheck.imageValueChecks.find(check => check.name === item)?.data?.image?.url && (
                          <img
                            src={brakesData.mechanicalCheck.imageValueChecks.find(check => check.name === item).data.image.url}
                            alt={`${item} Preview`}
                            className="mt-2"
                            style={{maxWidth: '200px'}}
                          />
                        )}
                        <div className="form-floating">
                          <select
                            onChange={(e) => {
                              const newChecks = [...brakesData.mechanicalCheck.imageValueChecks];
                              const existingIndex = newChecks.findIndex(
                                (check) => check.name === item
                              );
                              const value = e.target.value === "true";
                              
                              if (existingIndex >= 0) {
                                newChecks[existingIndex].data.value = value;
                              } else {
                                newChecks.push({
                                  name: item,
                                  data: {
                                    image: { url: "", public_id: "" },
                                    value: value,
                                  },
                                });
                              }
                              setBrakesData(prev => ({
                                ...prev,
                                mechanicalCheck: {
                                  ...prev.mechanicalCheck,
                                  imageValueChecks: newChecks
                                }
                              }));
                            }}
                            className="form-select"
                            id={`select-${item}`}
                          >
                            <option value="">Select the value</option>
                            <option value="">Select condition</option>
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

export default Brakes;
