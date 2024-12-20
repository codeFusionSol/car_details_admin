import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import { useEffect, useState } from "react";
import api from "../../../utils/url.js";
import { Toaster, toast } from "sonner";
import {
  addDataToCarDetailsSuccess,
  updateDataToCarDetailsSuccess,
} from "../../redux/Slices/CarDetail_id.jsx";

const SuspensionSteering = () => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { carDetailsId, fullDetaills } = useSelector(
    (state) => state.carDetailsId
  );

  const [suspensionData, setSuspensionData] = useState({
    frontSuspension: {
      imageValueChecks: [],
    },
    rearSuspension: {
      imageValueChecks: [],
    },
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

  const calculatePercentage = (selectedValue, options) => {
    const index = options.indexOf(selectedValue);
    if (index === -1) return ""; // Default case for "Select the value"
    return Math.round(((options.length - index) / options.length) * 100);
  };

  const handleImageChange = async (e, section, item) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      const base64WithPrefix = `data:image/png;base64,${base64.split(",")[1]}`;

      setSuspensionData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          imageValueChecks: [
            ...prev[section].imageValueChecks.filter(
              (check) => check.name !== item
            ),
            {
              name: item,
              data: {
                image: { url: base64WithPrefix, public_id: "" },
                value:
                  prev[section].imageValueChecks.find(
                    (check) => check.name === item
                  )?.data?.value || "",
                percentage:
                  prev[section].imageValueChecks.find(
                    (check) => check.name === item
                  )?.data?.percentage || "",
              },
            },
          ],
        },
      }));
    }
  };

  const handleValueChange = (section, item, value, options) => {
    const percentage = calculatePercentage(value, options);

    setSuspensionData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        imageValueChecks: [
          ...prev[section].imageValueChecks.filter(
            (check) => check.name !== item
          ),
          {
            name: item,
            data: {
              image: prev[section].imageValueChecks.find(
                (check) => check.name === item
              )?.data?.image || { url: "", public_id: "" },
              value,
              percentage,
            },
          },
        ],
      },
    }));
  };

  const dropdownOptions = {
    frontSuspension: {
      steeringWheelPlay: [
        "Ok",
        "Play",
        "Play & Noice",
        "Play, Noice & Boot Damage",
      ],
      rightBallJoint: [
        "Ok",
        "Play & Noice",
        "Boot Damage",
        "Play, Noice & Boot Damage",
      ],
      leftBallJoint: [
        "Ok",
        "Play & Noice",
        "Boot Damage",
        "Play, Noice & Boot Damage",
      ],
      rightZLinks: [
        "Ok",
        "Play & Noice",
        "Boot Damage",
        "Play, Noice & Boot Damage",
      ],
      leftZLinks: [
        "Ok",
        "Play & Noice",
        "Boot Damage",
        "Play, Noice & Boot Damage",
      ],
      rightTieRodEnd: [
        "Ok",
        "Play & Noice",
        "Boot Damage",
        "Play, Noice & Boot Damage",
      ],
      leftTieRodEnd: [
        "Ok",
        "Play & Noice",
        "Boot Damage",
        "Play, Noice & Boot Damage",
      ],
      frontRightBoots: ["Ok", "Damage"],
      frontLeftBoots: ["Ok", "Damage"],
      frontRightBushes: ["Ok", "Minor Crack", "Damage"],
      frontLeftBushes: ["Ok", "Minor Crack", "Damage"],
      frontRightShock: ["Ok", "Noice", "Noice & Leak"],
      frontLeftShock: ["Ok", "Noice", "Noice & Leak"],
    },
    rearSuspension: {
      rearRightBushes: ["Ok", "Minor Crack", "Damage"],
      rearLeftBushes: ["Ok", "Minor Crack", "Damage"],
      rearRightShock: ["Ok", "Noice", "Leak & Noice"],
      rearLeftShock: ["Ok", "Noice", "Leak & Noice"],
    },
  };

  const changeStep = async () => {
    try {
      const response = await api.post(`/suspensionSteering/add`, {
        frontSuspension: suspensionData.frontSuspension,
        rearSuspension: suspensionData.rearSuspension,
        carDetailsId: carDetailsId || "674d962b622d3809925855fe",
      });

      if (response.data.success) {
        toast("Suspension & Steering Added!", {
          style: { padding: "16px" },
        });
        setTimeout(() => {
          dispatch(addDataToCarDetailsSuccess(response?.data?.data));
          dispatch(changeStepSuccess(6));
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting suspension data:", error);
      alert(error.response?.data?.message || "Error submitting data");
    }
  };

  useEffect(() => {
    if (fullDetaills.length > 5) {
      setSuspensionData(fullDetaills[5]);
      setEditMode(true);
    }
  }, [fullDetaills]);

  useEffect(() => {
    const fullDetaills = JSON.parse(localStorage.getItem("fullDetaills"));
    if (fullDetaills?.length > 5) {
      setSuspensionData(fullDetaills[5]);
      setEditMode(true);
    }
  }, []);

  const editHandler = async () => {
    try {
      console.log(suspensionData);
      const response = await api.put(
        `/suspensionSteering/update/${fullDetaills[5]._id}`,
        {
          frontSuspension: suspensionData.frontSuspension,
          rearSuspension: suspensionData.rearSuspension,
        }
      );
      if (response.data.success) {
        toast("Suspension & Steering Updated!", {
          style: { padding: "16px" },
        });
        setTimeout(() => {
          dispatch(updateDataToCarDetailsSuccess(response?.data?.data));
          dispatch(changeStepSuccess(fullDetaills.length));
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating suspension data:", error);
    }
  };

  useEffect(() => {
    console.log(suspensionData);
  }, [suspensionData]);

  return (
    <>
      <div className="container-fluid min-vh-100 pb-md-5 py-3 px-0">
        <div className="container p-0">
          <div className="card border-0">
            <div className="card-header align-items-center d-flex justify-content-center bg-opacity-25 border-0 py-3 ps-0">
              <h4 className="text-center mb-0 carDetailsHeading">
                Suspension & Steering
              </h4>
            </div>

            <div
              className="card-body d-flex flex-column justify-content-center align-items-center p-lg-4 p-1"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="row g-4 px-0">
                <div className="col-12 px-0">
                  <div className="row gx-4">
                    {["frontSuspension", "rearSuspension"].map((section) =>
                      Object.keys(dropdownOptions[section]).map(
                        (item, index) => (
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
                                  onChange={(e) =>
                                    handleImageChange(e, section, item)
                                  }
                                  className="d-none"
                                  accept="image/*"
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
                                  {suspensionData[
                                    section
                                  ].imageValueChecks.find(
                                    (check) => check.name === item
                                  )?.data?.image?.url ? (
                                    <img
                                      src={
                                        suspensionData[
                                          section
                                        ].imageValueChecks.find(
                                          (check) => check.name === item
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
                                      (suspensionData[
                                        section
                                      ].imageValueChecks.find(
                                        (check) => check.name === item
                                      )?.data?.image?.url
                                        ? "Change Image"
                                        : "Upload Image")}
                                  </span>
                                </label>
                              </div>

                              <select
                                value={
                                  suspensionData[section].imageValueChecks.find(
                                    (check) => check.name === item
                                  )?.data?.value || ""
                                }
                                style={{
                                  height: "50px",
                                  backgroundColor: "#fff",
                                  marginTop: "15px",
                                  border: "1px solid #ccc",
                                  borderRadius: "6px",
                                  padding: "0 10px",
                                }}
                                onChange={(e) =>
                                  handleValueChange(
                                    section,
                                    item,
                                    e.target.value,
                                    dropdownOptions[section][item]
                                  )
                                }
                                className="form-select"
                              >
                                <option value="">Select</option>
                                {dropdownOptions[section][item].map(
                                  (option, i) => (
                                    <option key={i} value={option}>
                                      {option}
                                    </option>
                                  )
                                )}
                              </select>
                            </fieldset>
                          </div>
                        )
                      )
                    )}
                  </div>
                </div>

                <div className="col-12 ps-0">
                  <div className="d-flex align-items-center flex-md-row flex-column-reverse justify-content-center gap-3">
                    <button
                      className="backBtn"
                      onClick={() => {
                        dispatch(changeStepSuccess(5));
                      }}
                    >
                      Back
                    </button>
                    <button
                      onClick={!editMode ? changeStep : editHandler}
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

export default SuspensionSteering;
