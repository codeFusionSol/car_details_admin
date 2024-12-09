import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import { useEffect, useState } from "react";
import api from "../../../utils/url.js";
import { Toaster, toast } from "sonner";

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
        toast("Brakes Added!", {
          style: { padding: "16px" }
        });
        setTimeout(() => {
          dispatch(changeStepSuccess(5));
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding brakes data:", error);
      alert("Error adding brakes data");
    }
  };

  const calculatePercentage = (selectedValue, totalOptions) => {
    const index = totalOptions.indexOf(selectedValue);
    if (index === -1) return "";
    return Math.round(((totalOptions.length - index) / totalOptions.length) * 100);
  };

  const handleOptionChange = (e, item, options) => {
    const value = e.target.value;
    const percentage = calculatePercentage(value, options);

    setBrakesData((prev) => {
      const newChecks = [...prev.mechanicalCheck.imageValueChecks];
      const existingIndex = newChecks.findIndex((check) => check.name === item);

      if (existingIndex >= 0) {
        newChecks[existingIndex].data.value = value;
        newChecks[existingIndex].data.percentage = percentage;
      } else {
        newChecks.push({
          name: item,
          data: {
            image: { url: "", public_id: "" },
            value: value,
            percentage: percentage
          }
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
  };

  const handleImageChange = async (e, item) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      const base64WithPrefix = `data:image/png;base64,${base64.split(",")[1]}`;

      setBrakesData((prev) => {
        const newChecks = [...prev.mechanicalCheck.imageValueChecks];
        const existingIndex = newChecks.findIndex((check) => check.name === item);

        if (existingIndex >= 0) {
          newChecks[existingIndex].data.image.url = base64WithPrefix;
        } else {
          newChecks.push({
            name: item,
            data: {
              image: { url: base64WithPrefix, public_id: "" },
              value: "",
              percentage: ""
            }
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

  const dropdownOptions = {
    frontRightDisc: ["Ok", "Scratch Marks", "Thin", "Scratched & Thin", "Rear Disc"],
    frontLeftDisc: ["Ok", "Scratch Marks", "Thin", "Scratched & Thin", "Rear Disc"],
    frontRightBrakePad: ["Ok", "Brake Noice"],
    frontLeftBrakePad: ["Ok", "Brake Noice"],
    parkingHandBrake: ["Working Properly", "Not Working Properly"]
  };

  useEffect(() => {
    console.log(brakesData);
  }, [brakesData]);

  return (
    <>
      <div className="container-fluid min-vh-100 bg-light pb-md-5 py-3 px-0">
        <div className="container p-0">
          <div className="card shadow">
            <div className="text-white p-4" style={{ backgroundColor: "var(--primary-color)" }}>
              <h2 className="display-4 form-title text-center fw-bold">Brakes Inspection</h2>
            </div>

            <div className="card-body p-4 d-flex flex-column -justify-content-center align-items-center">
              <div className="row g-4">
                <div className="col-12 px-0">
                  <div className="row">
                    {Object.keys(dropdownOptions).map((item, index) => (
                      <div className="col-12 col-md-6 mb-3 mx-0 px-0" key={index}>
                        <div className="mb-3">
                          <label className="form-label">
                            {item.split(/(?=[A-Z])/).join(" ")}
                          </label>
                          <select
                            onChange={(e) =>
                              handleOptionChange(e, item, dropdownOptions[item])
                            }
                            className="form-select"
                            id={`select-${item}`}
                          >
                            <option value="">Select the value</option>
                            {dropdownOptions[item].map((option, i) => (
                              <option key={i} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>

                          <input
                            type="file"
                            onChange={(e) => handleImageChange(e, item)}
                            accept="image/*"
                            required
                            className="form-control mt-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-end mt-4">
                <button
                  onClick={changeStep}
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
      </div>
      <Toaster position={window.innerWidth <= 768 ? "bottom-right" : "top-right"} />
    </>
  );
};

export default Brakes;
