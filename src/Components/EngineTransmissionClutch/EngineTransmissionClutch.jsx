import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import api from "../../../utils/url.js";
import { Toaster, toast } from "sonner";
import {
  addDataToCarDetailsSuccess,
  updateDataToCarDetailsSuccess,
} from "../../redux/Slices/CarDetail_id.jsx";

const EngineTransmissionClutch = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { carDetailsId, fullDetaills } = useSelector(
    (state) => state.carDetailsId
  );

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
        "Select the value",
        "complete and clean",
        "dirty oil",
        "below the lower mark",
      ],
      engineOilLeakage: ["Select the value", "No Leakage", "Minor leakage", "Major leakage"],
      transmissionOilLeakage: ["Select the value", "No Leakage", "Minor leakage", "Major leakage"],
      coolantLeakage: ["Select the value", "No Leakage", "Minor leakage", "Major leakage"],
      brakeOilLeakage: ["Select the value", "No Leakage", "Minor leakage", "Major leakage"],
    },
    mechanicalCheck: {
      wires: ["Select the value", "Ok", "Brake"],
      engineBlow: ["Select the value", "Not Present", "Present"],
      engineNoise: ["Select the value", "No Noise", "Noise"],
      engineVibration: ["Select the value", "No Vibration", "Minor Vibration", "Major Vibration"],
      engineMounts: ["Select the value", "Ok", "Brake"],
      hoses: ["Select the value", "Ok", "Brake"],
    },
    exhaustCheck: {
      exhaustSound: ["Select the value", "Sound", "No Sound"],
    },
    engineCoolingSystem: {
      radiator: ["Select the value", "Ok", "Rusted", "Choke"],
      suctionFan: ["Select the value", "Working Properly", "Working Slow", "Not Working"],
    },
    transmissionCheck: {
      starterOperation: ["Select the value", "Ok", "Not Ok"],
    },
  };

  const calculatePercentage = (selectedValue, fieldOptions) => {
    const index = fieldOptions.indexOf(selectedValue);
    if (index === -1 || index === 0) return ""; // Default value if no valid option is selected or if "Select the value" is chosen
    return Math.round(
      ((fieldOptions.length - index) / (fieldOptions.length - 1)) * 100
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
              value: options.fluidsFiltersCheck[key][0],
              percentage: calculatePercentage(
                options.fluidsFiltersCheck[key][0],
                options.fluidsFiltersCheck[key]
              ),
            },
          })
        ),
      },
      mechanicalCheck: {
        imageValueChecks: Object.keys(options.mechanicalCheck).map((key) => ({
          name: key,
          data: {
            image: { url: "", public_id: "" },
            value: options.mechanicalCheck[key][0],
            percentage: calculatePercentage(
              options.mechanicalCheck[key][0],
              options.mechanicalCheck[key]
            ),
          },
        })),
      },
      exhaustCheck: {
        imageValueChecks: Object.keys(options.exhaustCheck).map((key) => ({
          name: key,
          data: {
            image: { url: "", public_id: "" },
            value: options.exhaustCheck[key][0],
            percentage: calculatePercentage(
              options.exhaustCheck[key][0],
              options.exhaustCheck[key]
            ),
          },
        })),
      },
      engineCoolingSystem: {
        imageValueChecks: Object.keys(options.engineCoolingSystem).map(
          (key) => ({
            name: key,
            data: {
              image: { url: "", public_id: "" },
              value: options.engineCoolingSystem[key][0],
              percentage: calculatePercentage(
                options.engineCoolingSystem[key][0],
                options.engineCoolingSystem[key]
              ),
            },
          })
        ),
      },
      transmissionCheck: {
        imageValueChecks: Object.keys(options.transmissionCheck).map((key) => ({
          name: key,
          data: {
            image: { url: "", public_id: "" },
            value: options.transmissionCheck[key][0],
            percentage: calculatePercentage(
              options.transmissionCheck[key][0],
              options.transmissionCheck[key]
            ),
          },
        })),
      },
    });
  }, []);

  useEffect(() => {
    if (fullDetaills?.length > 3) {
      setEngineTransmissionData(fullDetaills[3]);
      console.log(engineTransmissionData);
      setEditMode(true);
    }
  }, [fullDetaills]);

  useEffect(() => {
    const fullDetaills = JSON.parse(localStorage.getItem("fullDetaills"));
    if (fullDetaills?.length > 3) {
      setEngineTransmissionData(fullDetaills[3]);
      console.log(engineTransmissionData);
      setEditMode(true);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      console.log(engineTransmissionData);
      const response = await api.post("/engineTransmissionClutch/add", {
        fluidsFiltersCheck: engineTransmissionData.fluidsFiltersCheck,
        mechanicalCheck: engineTransmissionData.mechanicalCheck,
        exhaustCheck: engineTransmissionData.exhaustCheck,
        engineCoolingSystem: engineTransmissionData.engineCoolingSystem,
        transmissionCheck: engineTransmissionData.transmissionCheck,
        carDetailsId: carDetailsId || "674d962b622d3809925855fe",
      });

      if (response.data.success) {
        toast("Engine Transmission Clutch Added!", {
          style: { padding: "16px" },
        });
        setTimeout(() => {
          dispatch(addDataToCarDetailsSuccess(response?.data?.data));
          dispatch(changeStepSuccess(4));
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error adding engine transmission clutch");
    }
  };

  const editHandler = async () => {
    try {
      const response = await api.put(
        `/engineTransmissionClutch/update/${fullDetaills[3]._id}`,
        {
          fluidsFiltersCheck: engineTransmissionData.fluidsFiltersCheck,
          mechanicalCheck: engineTransmissionData.mechanicalCheck,
          exhaustCheck: engineTransmissionData.exhaustCheck,
          engineCoolingSystem: engineTransmissionData.engineCoolingSystem,
          transmissionCheck: engineTransmissionData.transmissionCheck,
          engineTransmissionClutchId: fullDetaills[3]._id,
        }
      );

      if (response.data.success) {
        toast("Engine Transmission Clutch Updated!", {
          style: { padding: "16px" },
        });
        setTimeout(() => {
          dispatch(updateDataToCarDetailsSuccess(response?.data?.data));
          dispatch(changeStepSuccess(fullDetaills.length));
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating engine transmission clutch:", error);
      alert("Error updating engine transmission clutch");
    }
  };

  return (
    <>
      <div className="container-fluid min-vh-100 pb-md-5 py-3 px-0">
        <div className="container p-0">
          <div className="card border-0">
            <div className="card-header align-items-center d-flex justify-content-center bg-opacity-25 border-0 py-3 ps-0">
              <h4 className="text-center mb-0 carDetailsHeading">
                Engine Transmission Clutch
              </h4>
            </div>

            <div
              className="card-body d-flex flex-column justify-content-center align-items-center p-lg-4 p-0"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="row g-4 px-0">
                <div className="col-12 px-0">
                  <div className="row gx-4">
                    {engineTransmissionData &&
                      Object?.entries(engineTransmissionData)?.map(
                        ([section, data]) =>
                          data?.imageValueChecks?.map((item) => (
                            <div
                              className="col-12 col-md-4 px-md-2 px-0"
                              key={item.name}
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
                                  {item.name.split(/(?=[A-Z])/).join(" ")}
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
                                    onChange={(e) =>
                                      handleImageChange(e, section, item.name)
                                    }
                                    className="d-none"
                                    accept="image/*"
                                    id={`image-${item.name}`}
                                  />

                                  <label
                                    htmlFor={`image-${item.name}`}
                                    className="d-flex align-items-center justify-content-center gap-2 mb-0 cursor-pointer"
                                    style={{
                                      color: "#FFCC00",
                                      fontWeight: "600",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {item?.data?.image?.url ? (
                                      <img
                                        src={item.data.image.url}
                                        style={{
                                          objectFit: "cover",
                                          borderRadius: "5px",
                                          maxWidth: "30px",
                                          maxHeight: "30px",
                                        }}
                                        alt=""
                                      />
                                    ) : (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
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
                                    )}
                                    <span
                                      className="d-none d-md-inline"
                                      style={{
                                        color: "var(--black-color) !important",
                                      }}
                                    >
                                      {window.innerWidth >= 1025 &&
                                        (item?.data?.image?.url
                                          ? "Change Image"
                                          : "Upload Image")}
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
                                  className="form-select"
                                  onChange={(e) =>
                                    handleInputChange(e, section, item.name)
                                  }
                                  value={item.data?.value || ""}
                                >
                                  {options[section][item.name].map(
                                    (option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    )
                                  )}
                                </select>
                              </fieldset>
                            </div>
                          ))
                      )}
                  </div>
                </div>

                <div className="col-12 ps-0">
                  <div className="d-flex align-items-center flex-md-row flex-column-reverse justify-content-center gap-3">
                    <button
                      className="backBtn"
                      onClick={() => {
                        dispatch(changeStepSuccess(3));
                      }}
                    >
                      Back
                    </button>
                    <button
                      onClick={!editMode ? handleSubmit : editHandler}
                      className="nextBtn"
                    >
                      Next
                    </button>
                  </div>
                </div>
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
