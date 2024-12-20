import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import api from "../../../utils/url.js";
import { Toaster, toast } from "sonner";
import {
  addDataToCarDetailsSuccess,
  updateDataToCarDetailsSuccess,
} from "../../redux/Slices/CarDetail_id.jsx";

const ElectricalElectronics = () => {
  const { fullDetaills, carDetailsId } = useSelector(
    (state) => state.carDetailsId
  );
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

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

      setElectricalElectronicsData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          imageValueChecks: [
            ...(prev[section].imageValueChecks || []).filter(
              (check) => check.name !== name
            ),
            {
              name,
              data: {
                image: { url: base64WithPrefix, public_id: "" },
                value:
                  prev[section].imageValueChecks?.find(
                    (check) => check.name === name
                  )?.data?.value || "",
                percentage:
                  prev[section].imageValueChecks?.find(
                    (check) => check.name === name
                  )?.data?.percentage || 0,
              },
            },
          ],
        },
      }));
    }
  };

  const handleValueChange = (section, name, value) => {
    const percentage = calculatePercentage(
      value,
      optionsMapping[section][name] || []
    );

    setElectricalElectronicsData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        imageValueChecks: [
          ...(prev[section].imageValueChecks || []).filter(
            (check) => check.name !== name
          ),
          {
            name,
            data: {
              image: prev[section].imageValueChecks?.find(
                (check) => check.name === name
              )?.data?.image || { url: "", public_id: "" },
              value,
              percentage,
            },
          },
        ],
      },
    }));
  };

  const handleNumberChange = (section, name, value) => {
    setElectricalElectronicsData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        imageValueChecks: [
          ...(prev[section].imageValueChecks || []).filter(
            (check) => check.name !== name
          ),
          {
            name,
            data: {
              image: prev[section].imageValueChecks?.find(
                (check) => check.name === name
              )?.data?.image || { url: "", public_id: "" },
              value,
            },
          },
        ],
      },
    }));
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
          dispatch(addDataToCarDetailsSuccess(response?.data?.data));
          dispatch(changeStepSuccess(9));
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting electrical electronics data:", error);
    }
  };

  useEffect(() => {
    if (fullDetaills.length > 8) {
      setElectricalElectronicsData(fullDetaills[8]);
      setEditMode(true);
    }
  }, [fullDetaills]);

  useEffect(() => {
    const fullDetaills = JSON.parse(localStorage.getItem("fullDetaills"));
    if (fullDetaills.length > 8) {
      setElectricalElectronicsData(fullDetaills[8]);
      setEditMode(true);
    }
  }, []);

  const editHandler = async () => {
    try {
      const response = await api.put(
        `/electricalElectronics/update/${fullDetaills[8]._id}`,
        electricalElectronicsData
      );

      if (response.data.success) {
        toast("Electrical & Electronics Updated!", {
          style: { padding: "16px" },
        });
        setTimeout(() => {
          dispatch(updateDataToCarDetailsSuccess(response?.data?.data));
          dispatch(changeStepSuccess(fullDetaills.length));
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating Electrical & Electronics data:", error);
    }
  };

  return (
    <>
      <div className="container-fluid min-vh-100 pb-md-5 py-3 px-0">
        <div className="container p-0">
          <div className="card border-0">
            <div className="card-header align-items-center d-flex justify-content-center bg-opacity-25 border-0 py-3 ps-0">
              <h4 className="text-center mb-0 carDetailsHeading">
                Electrical & Electronics
              </h4>
            </div>

            <div
              className="card-body d-flex flex-column justify-content-center align-items-center p-lg-4 p-1"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="row g-4 px-0">
                <div className="col-12 px-0">
                  <div className="row gx-4">
                    {Object.entries(optionsMapping).flatMap(
                      ([section, checks]) =>
                        Object.entries(checks).map(([name, options], index) => (
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
                                {name.split(/(?=[A-Z])/).join(" ")}
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
                                    handleImageChange(e, section, name)
                                  }
                                  className="d-none"
                                  accept="image/*"
                                  id={`image-${name}`}
                                />
                                <label
                                  htmlFor={`image-${name}`}
                                  className="d-flex align-items-center justify-content-center gap-2 mb-0 cursor-pointer"
                                  style={{
                                    color: "#FFCC00",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                  }}
                                >
                                  {electricalElectronicsData[
                                    section
                                  ]?.imageValueChecks?.find(
                                    (check) => check.name === name
                                  )?.data?.image?.url ? (
                                    <img
                                      src={
                                        electricalElectronicsData[
                                          section
                                        ].imageValueChecks.find(
                                          (check) => check.name === name
                                        ).data.image.url
                                      }
                                      style={{
                                        objectFit: "cover",
                                        borderRadius: "5px",
                                        maxWidth: "40px",
                                        maxHeight: "40px",
                                      }}
                                      alt=""
                                    />
                                  ) : (
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
                                    electricalElectronicsData[
                                      section
                                    ]?.imageValueChecks?.find(
                                      (check) => check.name === name
                                    )?.data?.image?.url
                                      ? "Change Image"
                                      : "Upload Image"}
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
                                value={
                                  electricalElectronicsData[
                                    section
                                  ].imageValueChecks.find(
                                    (check) => check.name === name
                                  )?.data?.value || ""
                                }
                                onChange={(e) =>
                                  handleValueChange(
                                    section,
                                    name,
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Select Status</option>
                                {options.map((option, idx) => (
                                  <option key={idx} value={option}>
                                    {option}
                                  </option>
                                ))}
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
                        dispatch(changeStepSuccess(8));
                      }}
                    >
                      Back
                    </button>
                    <button
                      onClick={editMode ? editHandler : changeStep}
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

export default ElectricalElectronics;
