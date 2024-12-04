import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../utils/url";
import { Toaster, toast } from "sonner";
const api = axios.create({
  baseURL: url,
});

const BodyFrameAccidentChecklist = () => {
  const dispatch = useDispatch();
  const carDetailsId = useSelector((state) => state.carDetailsId.carDetailsId);

  const [formData, setFormData] = useState({
    imageValueChecks: [],
  });

  const changeStep = () => {
    dispatch(changeStepSuccess(3));
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

      setFormData((prev) => {
        const newChecks = [...prev.imageValueChecks];
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
          imageValueChecks: newChecks,
        };
      });
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate all required fields are filled
      const requiredFields = [
        "radiatorCoreSupport",
        "rightStrutTowerApon",
        "leftStrutTowerApon",
        "rightFrontRail",
        "leftFrontRail",
        "cowlPanelFirewall",
        "bootFloor",
        "bootLockPillar",
        "rearSubFrame",
        "frontSubFrame",
        "rightAPillar",
        "leftAPillar",
        "rightBPillar",
        "leftBPillar",
        "rightCPillar",
        "leftCPillar",
      ];

      const missingFields = requiredFields.filter(
        (field) =>
          !formData.imageValueChecks.find((check) => check.name === field)
      );

      if (missingFields.length > 0) {
        alert(`Please fill in all fields: ${missingFields.join(", ")}`);
        return;
      }

      const response = await api.post("/bodyFrameAccidentChecklist/add", {
        imageValueChecks: formData?.imageValueChecks,
        carDetailsId: carDetailsId,
      });

      if (response.data.success) {
        
        toast("Body Frame Accident Checklist Added!", {
          style: {
            padding: "16px",
          }})
          setTimeout(() => {
            changeStep();
          }, 2000);
      }
    } catch (error) {
      console.error("Error adding body frame accident checklist:", error);
      alert("Error adding body frame accident checklist");
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

    return (
      <>
    <div className="container-fluid min-vh-100 bg-light py-md-5 py-3 px-0">
      <div className="container p-0">
        <div className="card shadow">
          <div className="text-white p-4" style={{ backgroundColor: "red" }}>
            <h2 className="display-4 form-title text-center fw-bold">
              Body Frame & Accident Checklist
            </h2>
          </div>

          <div className="card-body p-4">
            <div className="row g-4">
              <div className="col-12">
                <div className="row">
                  {[
                    "radiatorCoreSupport",
                    "rightStrutTowerApon",
                    "leftStrutTowerApon",
                    "rightFrontRail",
                    "leftFrontRail",
                    "cowlPanelFirewall",
                    "bootFloor",
                    "bootLockPillar",
                    "rearSubFrame",
                    "frontSubFrame",
                    "rightAPillar",
                    "leftAPillar",
                    "rightBPillar",
                    "leftBPillar",
                    "rightCPillar",
                    "leftCPillar",
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
                        <div className="form-floating">
                          <select
                            onChange={(e) => {
                              const newChecks = [...formData.imageValueChecks];
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
                              setFormData((prev) => ({
                                ...prev,
                                imageValueChecks: newChecks,
                              }));
                            }}
                            className="form-select"
                            id={`select-${item}`}
                          >
                            <option value="">Select the value</option>
                            <option value="false">Non Accidented</option>
                            <option value="true">Accidented</option>
                          </select>
                          <label htmlFor={`select-${item}`}>
                            Accident Status
                          </label>
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
    <div>
      <Toaster position={window.innerWidth <= 768 ? 'bottom-right' : 'top-right'} />
    </div>
    </>
  );
};

export default BodyFrameAccidentChecklist;
