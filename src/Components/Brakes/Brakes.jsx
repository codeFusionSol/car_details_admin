import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import { useEffect, useState } from "react";
import api from "../../../utils/url.js";
import { Toaster, toast } from "sonner";
import { addDataToCarDetailsSuccess } from "../../redux/Slices/CarDetail_id.jsx";

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
          dispatch(addDataToCarDetailsSuccess(response?.data?.data));
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
      <div className="container-fluid min-vh-100 pb-md-5 py-3 px-0">
        <div className="container p-0">
          <div className="card border-0">
            <div className="card-header align-items-center d-flex justify-content-center bg-opacity-25 border-0 py-3 ps-0">
              <h4 className="text-center mb-0 carDetailsHeading">
                Brakes Inspection
              </h4>
            </div>

            <div
              className="card-body d-flex flex-column justify-content-center align-items-center p-lg-4 p-1"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="row g-4 px-0">
                <div className="col-12 px-0">
                  <div className="row gx-4">
                    {Object.keys(dropdownOptions).map((item, index) => (
                      <div
                        className="col-12 col-md-4 px-md-2 px-0"
                        key={index}
                        style={{
                          marginBottom: "30px",
                        }}
                      >
                        <fieldset
                          style={{
                            border: "1px dashed #ccc",
                            borderRadius: "8px",
                            padding: "15px",
                          }}
                        >
                          <legend className="legend">
                            {item.split(/(?=[A-Z])/).join(" ")}
                          </legend>

                          <div
                            className="rounded p-3 text-center"
                            style={{
                              height: "80px",
                              backgroundColor: "#FFF6E0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "1px solid #FFCC00",
                              borderRadius: "6px",
                            }}
                          >
                            <input
                              type="file"
                              onChange={(e) => handleImageChange(e, item)}
                              className="d-none"
                              accept="image/*"
                              required
                              id={`image-${item}`}
                            />
                            <label
                              htmlFor={`image-${item}`}
                              className="d-flex align-items-center justify-content-center gap-2 mb-0 cursor-pointer"
                              style={{
                                color: "#FFCC00",
                                fontWeight: "600",
                                fontSize: "14px",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ marginRight: "5px" }}
                              >
                                <rect
                                  x="3"
                                  y="3"
                                  width="18"
                                  height="18"
                                  rx="2"
                                  ry="2"
                                />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                              </svg>
                              <span className="d-none d-md-inline">
                                {window.innerWidth >= 1025 &&
                                  "Click to upload image (optional)"}
                              </span>
                            </label>
                          </div>

                          <select
                            style={{
                              height: "50px",
                              backgroundColor: "#fff",
                              marginTop: "15px",
                              border: "1px solid #ccc",
                              borderRadius: "6px",
                              padding: "0 10px",
                            }}
                            onChange={(e) => handleOptionChange(e, item, dropdownOptions[item])}
                            className="form-select"
                          >
                            <option value="">Select</option>
                            {dropdownOptions[item].map((option, i) => (
                              <option key={i} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </fieldset>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-12 ps-0">
                  <div className="d-flex justify-content-center gap-3">
                    <button className="backBtn">Back</button>
                    <button onClick={changeStep} className="nextBtn">
                      Next
                    </button>
                  </div>
                </div>
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
