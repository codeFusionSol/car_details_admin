import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../utils/url";
import { Toaster, toast } from "sonner";
import {
  addDataToCarDetailsSuccess,
  updateDataToCarDetailsSuccess,
} from "../../redux/Slices/CarDetail_id.jsx";

const api = axios.create({
  baseURL: url,
});

const BodyFrameAccidentChecklist = () => {
  const [editMode, setEditMode] = useState(false);
  const { fullDetaills } = useSelector((state) => state.carDetailsId);
  const dispatch = useDispatch();
  const carDetailsId = useSelector((state) => state.carDetailsId.carDetailsId);

  const [formData, setFormData] = useState({
    imageValueChecks: [],
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
          newChecks[existingIndex] = {
            ...newChecks[existingIndex],
            data: {
              ...newChecks[existingIndex].data,
              image: {
                ...newChecks[existingIndex].data.image,
                url: base64WithPrefix,
              },
            },
          };
        } else {
          newChecks.push({
            name: item,
            data: {
              image: { url: base64WithPrefix, public_id: "" },
              value: false,
              percentage: 100,
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
      console.log(formData.imageValueChecks);

      const response = await api.post("/bodyFrameAccidentChecklist/add", {
        imageValueChecks: formData.imageValueChecks,
        carDetailsId: carDetailsId,
      });

      if (response.data.success) {
        toast("Body Frame Accident Checklist Added!", {
          style: {
            padding: "16px",
          },
        });
        setTimeout(() => {
          dispatch(addDataToCarDetailsSuccess(response.data.data));
          changeStep();
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding body frame accident checklist:", error);
      alert("Error adding body frame accident checklist");
    }
  };

  useEffect(() => {
    if (fullDetaills.length > 2) {
      setFormData({
        imageValueChecks: fullDetaills[2]?.imageValueChecks || [],
      });
      setEditMode(true);
    }
  }, [fullDetaills]);

  useEffect(() => {
    const fullDetaills = JSON.parse(localStorage.getItem("fullDetaills"));
    if (fullDetaills?.length > 2) {
      setFormData({
        imageValueChecks: fullDetaills[2]?.imageValueChecks || [],
      });
      setEditMode(true);
    }
  }, []);

  const handleHandler = async () => {
    try {
      const response = await api.put(
        `/bodyFrameAccidentChecklist/update/${fullDetaills[2]._id}`,
        {
          imageValueChecks: formData.imageValueChecks,
        }
      );

      if (response.data.success) {
        toast("Body Frame Accident Checklist Updated!", {
          style: {
            padding: "16px",
          },
        });

        setTimeout(() => {
          dispatch(updateDataToCarDetailsSuccess(response.data.data));
          dispatch(changeStepSuccess(fullDetaills.length));
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating body frame accident checklist:", error);
      alert("Error updating body frame accident checklist");
    }
  };

  return (
    <>
      <div className="container-fluid min-vh-100 pb-md-5 py-3 px-0">
        <div className="container p-0">
          <div className="card border-0">
            <div className="card-header align-items-center d-flex justify-content-center bg-opacity-25 border-0 py-3 ps-0">
              <h4
                className="text-center mb-0 carDetailsHeading"
                style={{
                  lineHeight: "2rem !important",
                }}
              >
                Body Frame & Accident Checklist
              </h4>
            </div>

            <div
              className="card-body d-flex flex-column justify-content-center align-items-center p-lg-4 p-0"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="row g-4 px-0">
                <div className="col-12 px-0">
                  <div className="row gx-4">
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
                              {formData?.imageValueChecks?.find(
                                (check) => check.name === item
                              )?.data?.image?.url ? (
                                <img
                                  src={
                                    formData.imageValueChecks.find(
                                      (check) => check.name === item
                                    ).data.image.url
                                  }
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
                                formData?.imageValueChecks?.find(
                                  (check) => check.name === item
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
                            onChange={(e) => {
                              const value = e.target.value === "true";

                              const newChecks = [
                                ...(formData.imageValueChecks || []),
                              ];
                              const existingIndex = newChecks.findIndex(
                                (check) => check.name === item
                              );

                              if (existingIndex >= 0) {
                                newChecks[existingIndex] = {
                                  ...newChecks[existingIndex],
                                  data: {
                                    ...newChecks[existingIndex].data,
                                    value,
                                    percentage: value ? 0 : 100,
                                  },
                                };
                              } else {
                                newChecks.push({
                                  name: item,
                                  data: {
                                    image: { url: "", public_id: "" },
                                    value,
                                    percentage: value ? 0 : 100,
                                  },
                                });
                              }

                              setFormData((prev) => ({
                                ...prev,
                                imageValueChecks: newChecks,
                              }));
                            }}
                            className="form-select"
                            value={
                              formData?.imageValueChecks?.find(
                                (check) => check.name === item
                              )?.data?.value
                            }
                          >
                            <option value="">Select</option>
                            <option value="false">Non Accidented</option>
                            <option value="true">Accidented</option>
                          </select>
                        </fieldset>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-12 ps-0">
                  <div className="d-flex align-items-center flex-md-row flex-column-reverse justify-content-center gap-3">
                    <button
                      className="backBtn"
                      onClick={() => {
                        dispatch(changeStepSuccess(2));
                      }}
                    >
                      Back
                    </button>
                    <button
                      onClick={!editMode ? handleSubmit : handleHandler}
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
      <div className="p-4">
        <Toaster
          position={window.innerWidth <= 768 ? "bottom-right" : "top-right"}
        />
      </div>
    </>
  );
};

export default BodyFrameAccidentChecklist;
