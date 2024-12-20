import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import { useState, useEffect } from "react";
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

const Tyres = () => {
  const { carDetailsId, fullDetaills } = useSelector(
    (state) => state.carDetailsId
  );
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const [tyresData, setTyresData] = useState({
    tyres: {
      imageValueChecks: [],
    },
  });

  useEffect(() => {
    if (fullDetaills.length > 10) {
      // Create a deep copy of the data to avoid mutating read-only objects
      const tyresDataCopy = JSON.parse(JSON.stringify(fullDetaills[10]));
      setTyresData(tyresDataCopy);
      setEditMode(true);
    }
  }, [fullDetaills]);

  useEffect(() => {
    const fullDetaills = JSON.parse(localStorage.getItem("fullDetaills"));
    if (fullDetaills.length > 10) {
      // Create a deep copy of the data to avoid mutating read-only objects
      const tyresDataCopy = JSON.parse(JSON.stringify(fullDetaills[10]));
      setTyresData(tyresDataCopy);
      setEditMode(true);
    }
  }, []);

  const changeStep = () => {
    dispatch(changeStepSuccess(11));
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

      setTyresData((prev) => {
        // Create deep copy of previous state
        const newData = JSON.parse(JSON.stringify(prev));
        if (!newData.tyres) {
          newData.tyres = { imageValueChecks: [] };
        }
        const checks = newData.tyres.imageValueChecks;
        const existingIndex = checks.findIndex((check) => check.name === item);

        if (existingIndex >= 0) {
          checks[existingIndex] = {
            ...checks[existingIndex],
            data: {
              ...checks[existingIndex].data,
              image: { url: base64WithPrefix, public_id: "" },
            },
          };
        } else {
          checks.push({
            name: item,
            data: {
              image: { url: base64WithPrefix, public_id: "" },
              value: "",
            },
          });
        }
        return newData;
      });
    }
  };

  const handleValueChange = (item, value) => {
    setTyresData((prev) => {
      // Create deep copy of previous state
      const newData = JSON.parse(JSON.stringify(prev));
      if (!newData.tyres) {
        newData.tyres = { imageValueChecks: [] };
      }
      const checks = newData.tyres.imageValueChecks;
      const existingIndex = checks.findIndex((check) => check.name === item);

      if (existingIndex >= 0) {
        checks[existingIndex] = {
          ...checks[existingIndex],
          data: {
            ...checks[existingIndex].data,
            value: value,
          },
        };
      } else {
        checks.push({
          name: item,
          data: {
            image: { url: "", public_id: "" },
            value: value,
          },
        });
      }
      return newData;
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("/tyres/add", {
        ...tyresData,
        carDetailsId: carDetailsId || "674d962b622d3809925855fe",
      });

      if (response.data.success) {
        toast("Tyres Added!", {
          style: {
            padding: "16px",
          },
        });
        setTimeout(() => {
          dispatch(addDataToCarDetailsSuccess(response?.data?.tyres));
          changeStep();
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting tyres data:", error);
      alert("Error adding tyres data");
    }
  };

  const editHandler = async () => {
    try {
      const response = await api.put(
        `/tyres/update/${fullDetaills[10]._id}`,
        tyresData
      );

      if (response.data.success) {
        toast("Tyres Updated!", { style: { padding: "16px" } });
        setTimeout(() => {
          dispatch(updateDataToCarDetailsSuccess(response?.data?.tyres));
          dispatch(changeStepSuccess(fullDetaills.length));
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating tyres data:", error);
    }
  };

  useEffect(() => {
    console.log(tyresData);
  }, [tyresData]);

  return (
    <>
      <div className="container-fluid min-vh-100 pb-md-5 py-3 px-0">
        <div className="container p-0">
          <div className="card border-0">
            <div className="card-header align-items-center d-flex justify-content-center bg-opacity-25 border-0 py-3 ps-0">
              <h4 className="text-center mb-0 carDetailsHeading">
                Tyres Inspection
              </h4>
            </div>

            <div
              className="card-body d-flex flex-column justify-content-center align-items-center p-lg-4 p-1"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="row g-4 px-0">
                <div className="col-12 px-0">
                  <div className="row gx-4">
                    {[
                      "frontRightTyre",
                      "frontLeftTyre",
                      "rearRightTyre",
                      "rearLeftTyre",
                      "wheelsCaps",
                      "frontRightTyreBrand",
                      "frontLeftTyreBrand",
                      "rearRightTyreBrand",
                      "rearLeftTyreBrand",
                      "tyreSize",
                      "rims",
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
                              {tyresData?.tyres?.imageValueChecks?.find(
                                (check) => check.name === item
                              )?.data?.image?.url ? (
                                <img
                                  src={
                                    tyresData.tyres.imageValueChecks.find(
                                      (check) => check.name === item
                                    ).data.image.url
                                  }
                                  style={{
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                    maxWidth: "50px",
                                    maxHeight: "50px",
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
                                tyresData?.tyres?.imageValueChecks?.find(
                                  (check) => check.name === item
                                )?.data?.image?.url
                                  ? "Change Image"
                                  : "Upload Image"}
                              </span>
                            </label>
                          </div>

                          <input
                            type="text"
                            style={{
                              height: "50px",
                              backgroundColor: "#fff",
                              marginTop: "15px",
                              border: "1px solid #ccc",
                              borderRadius: "6px",
                              padding: "0 10px",
                            }}
                            className="form-control"
                            value={
                              tyresData?.tyres?.imageValueChecks?.find(
                                (check) => check.name === item
                              )?.data?.value || ""
                            }
                            onChange={(e) =>
                              handleValueChange(item, e.target.value)
                            }
                            placeholder="Enter value"
                          />
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
                        dispatch(changeStepSuccess(10));
                      }}
                    >
                      Back
                    </button>
                    <button
                      onClick={editMode ? editHandler : handleSubmit}
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

export default Tyres;
