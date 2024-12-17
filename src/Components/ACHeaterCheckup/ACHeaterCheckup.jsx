import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import api from "../../../utils/url.js";
import { Toaster, toast } from "sonner";
import { addDataToCarDetailsSuccess, updateDataToCarDetailsSuccess } from "../../redux/Slices/CarDetail_id.jsx";

const ACHeaterCheckup = () => {
  const { fullDetaills, carDetailsId } = useSelector(
    (state) => state.carDetailsId
  );
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const [acHeaterData, setAcHeaterData] = useState({
    acHeaterCheckUp: {
      imageValueChecks: [],
    },
  });

  const optionsMapping = {
    acFitted: ["Yes", "No"],
    acOperational: ["Yes", "AC Cooling Slow", "No"],
    blower: ["Excellent Air Throw", "Less Throw"],
    cooling: ["Excellent", "Less Cooling"],
    heating: ["Excellent", "Less Heating"],
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

  const handleImageChange = async (e, item) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      const base64WithPrefix = `data:image/png;base64,${base64.split(",")[1]}`;

      setAcHeaterData((prev) => ({
        ...prev,
        acHeaterCheckUp: {
          ...prev.acHeaterCheckUp,
          imageValueChecks: prev.acHeaterCheckUp.imageValueChecks.map(check => 
            check.name === item 
              ? {
                  ...check,
                  data: {
                    ...check.data,
                    image: { public_id: "", url: base64WithPrefix }
                  }
                }
              : check
          ).concat(
            prev.acHeaterCheckUp.imageValueChecks.find(check => check.name === item)
              ? []
              : [{
                  name: item,
                  data: {
                    image: { public_id: "", url: base64WithPrefix },
                    value: "",
                    percentage: 0
                  }
                }]
          )
        }
      }));
    }
  };

  const handleInputChange = (e, item) => {
    const value = e.target.value;
    const percentage = calculatePercentage(value, optionsMapping[item]);

    setAcHeaterData((prev) => ({
      ...prev,
      acHeaterCheckUp: {
        ...prev.acHeaterCheckUp,
        imageValueChecks: prev.acHeaterCheckUp.imageValueChecks.map(check =>
          check.name === item
            ? {
                ...check,
                data: {
                  ...check.data,
                  value,
                  percentage
                }
              }
            : check
        ).concat(
          prev.acHeaterCheckUp.imageValueChecks.find(check => check.name === item)
            ? []
            : [{
                name: item,
                data: {
                  image: { public_id: "", url: "" },
                  value,
                  percentage
                }
              }]
        )
      }
    }));
  };

  const changeStep = () => {
    dispatch(changeStepSuccess(8));
  };

  const handleSubmit = async () => {
    try {
      if (!acHeaterData.acHeaterCheckUp?.imageValueChecks?.length) {
        alert("Please fill in all required fields");
        return;
      }

      const response = await api.post("/acHeater/add", {
        ...acHeaterData,
        carDetailsId: carDetailsId || "674d962b622d3809925855fe",
      });
      
      if (response.data.success) {
        toast("AC & Heater Added!", {
          style: { padding: "16px" },
        });
        setTimeout(() => {
          dispatch(addDataToCarDetailsSuccess(response?.data?.data));
          changeStep();
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting AC/Heater data:", error);
      alert(error.response?.data?.message || "Error submitting data");
    }
  };

  useEffect(() => {
    if (fullDetaills.length > 7) {
      setAcHeaterData(fullDetaills[7]);
      setEditMode(true);
      console.log(editMode);
    }
  }, [fullDetaills]);

  const editHandler = async () => {
    try {
      const response = await api.put(`/acHeater/update/${fullDetaills[7]._id}`, acHeaterData);

      if (response.data.success) {
        toast("AC/Heater Updated!", { style: { padding: "16px" } });
        setTimeout(() => {
          dispatch(updateDataToCarDetailsSuccess(response?.data?.data));
          dispatch(changeStepSuccess(fullDetaills.length));
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating AC/Heater data:", error);
    }
  };

  return (
    <>
      <div className="container-fluid min-vh-100 pb-md-5 py-3 px-0">
        <div className="container p-0">
          <div className="card border-0">
            <div className="card-header align-items-center d-flex justify-content-center bg-opacity-25 border-0 py-3 ps-0">
              <h4 className="text-center mb-0 carDetailsHeading">
                AC & Heater Checkup
              </h4>
            </div>

            <div
              className="card-body d-flex flex-column justify-content-center align-items-center p-lg-4 p-1"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="row g-4 px-0">
                <div className="col-12 px-0">
                  <div className="row gx-4">
                    {Object.keys(optionsMapping).map((item, index) => (
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
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                              </svg>
                              <span className="d-none d-md-inline" style={{color:"var(--black-color)"}}>
                                {window.innerWidth >= 1025 && "Click to upload image"}
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
                              acHeaterData.acHeaterCheckUp.imageValueChecks.find(
                                (check) => check.name === item
                              )?.data?.value || ""
                            }
                            onChange={(e) => handleInputChange(e, item)}
                          >
                            <option value="">Select Status</option>
                            {optionsMapping[item].map((option, index) => (
                              <option key={index} value={option}>
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
                  <div className="d-flex align-items-center flex-md-row flex-column-reverse justify-content-center gap-3">
                    <button className="backBtn"
                      onClick={() => {
                        dispatch(changeStepSuccess(7));
                      }}
                    >
                      Back
                    </button>
                    <button onClick={editMode ? editHandler : handleSubmit} className="nextBtn">
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

export default ACHeaterCheckup;
