import { useDispatch, useSelector } from "react-redux";
import { changeFormStateSuccess } from "../../redux/Slices/Sidebar";
import {
  changeStepStart,
  changeStepSuccess,
  changeStepFailure,
} from "../../redux/Slices/FormsSteps";
import {
  changeCarDetailsIdStart,
  changeCarDetailsIdSuccess,
  changeCarDetailsIdFailure,
  addDataToCarDetailsSuccess,
  updateDataToCarDetailsSuccess,
} from "../../redux/Slices/CarDetail_id";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../utils/url";
import "./CarDetails.css";
import { Toaster, toast } from "sonner";

// ...

const api = axios.create({
  baseURL: url,
});

const CarDetails = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?.user?._id);
  const ownerId = useSelector((state) => state?.ownerId?.ownerId);
  const { carDetailsId, fullDetaills } = useSelector(
    (state) => state.carDetailsId
  );
  const [editMode, setEditMode] = useState(false);

  const [carDetails, setCarDetails] = useState({
    image: { url: "", public_id: "" },
    name: "",
    mileage: 0,
    inspectionDate: "",
    engineNo: "",
    transmissionType: "Manual",
    cngInstall: false,
    engineCapacity: 0,
    chassisNo: "",
    registeredCity: "",
    registeredYear: 0,
    driveType: "FWD",
    registrationNo: "",
    colour: "",
    userId: userId,
    ownerId: ownerId,
  });

  useEffect(() => {
    if (fullDetaills.length > 1) {
      setCarDetails(fullDetaills[1]);
      setEditMode(true);
    }
  }, [fullDetaills]);

  useEffect(() => {
    console.log(carDetails);
  }, [carDetails]);

  const changeStep = async () => {
    try {
      // Validate required fields
      if (
        !carDetails.image.url ||
        !carDetails.name ||
        !carDetails.mileage ||
        !carDetails.inspectionDate ||
        !carDetails.engineNo ||
        !carDetails.transmissionType ||
        carDetails.cngInstall === undefined ||
        !carDetails.engineCapacity ||
        !carDetails.chassisNo ||
        !carDetails.registeredCity ||
        !carDetails.registeredYear ||
        !carDetails.registrationNo ||
        !carDetails.colour
      ) {
        throw new Error("Please fill in all required fields");
      }

      dispatch(changeStepStart());
      dispatch(changeCarDetailsIdStart());

      const response = await api.post("/carDetails/add", carDetails);

      if (response.data.success) {
        toast("Car Details Added!", {
          style: {
            padding: "16px",
            // Set desired padding here
          },
        });
        setTimeout(() => {
          dispatch(changeCarDetailsIdSuccess(response?.data?.data?._id));
          dispatch(addDataToCarDetailsSuccess(response?.data?.data));
          dispatch(changeStepSuccess(2));
        }, 2000);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(changeStepFailure(error.message));
      dispatch(changeCarDetailsIdFailure(error.message));
      alert(error.message);
    }
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      const base64WithPrefix = `data:image/png;base64,${base64.split(",")[1]}`;

      setCarDetails((prev) => ({
        ...prev,
        image: {
          url: base64WithPrefix,
          public_id: "",
        },
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    let inputValue;

    if (type === "number") {
      inputValue = Number(value);
    } else if (type === "checkbox") {
      inputValue = checked;
    } else {
      inputValue = value;
    }

    setCarDetails((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const editHandler = async () => {
    try {
      setCarDetails((prev) => ({
        ...prev,
        userId: userId,
      }));
      dispatch(changeStepStart());
      const response = await api.put(
        `/carDetails/update/${carDetailsId}`,
        carDetails
      );

      if (response.data.success) {
        toast("Car Details Updated!", {
          style: {
            padding: "16px",
            // Set desired padding here
          },
        });

        setTimeout(() => {
          dispatch(updateDataToCarDetailsSuccess(response?.data?.data));
          dispatch(changeStepSuccess(fullDetaills.length));
        }, 2000);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(changeStepFailure(error.message));
      dispatch(changeCarDetailsIdFailure(error.message));
      alert(error.message);
    }
  };

  return (
    <>
      <div className="container-fluid min-vh-100  pb-md-5 py-3 px-0">
        <div className="container p-0">
          <div className="card border-0">
            <div className="card-header align-items-center d-flex justify-content-center bg-opacity-25 border-0 py-3 ps-0">
              <h4 className="text-center mb-0 carDetailsHeading">
                CAR Details
              </h4>
            </div>

            <div
              className="card-body d-flex flex-column justify-content-center align-items-center p-md-4 p-1"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="row g-4 ps-0">
                <div className="col-12 ps-0">
                  <div className="row  gx-4 ">
                    <div
                      className="col-12 col-md-4  px-md-2 px-0 "
                      style={{
                        marginBottom: "30px",
                      }}
                    >
                      <label
                        htmlFor="carImage"
                        className="form-label"
                        style={{ marginBottom: "8px" }}
                      >
                        Car Image
                      </label>
                      <div
                        className=" rounded p-3 text-center"
                        style={{
                          height: "60px",
                          backgroundColor: "var(--primary-light-color)",
                        }}
                      >
                        <input
                          type="file"
                          onChange={handleImageChange}
                          className="d-none my-0"
                          accept="image/*"
                          required
                          id="carImage"
                        />
                        <label
                          htmlFor="carImage"
                          className="d-flex align-items-center mt-0 pt-0 justify-content-center gap-2 mb-0 cursor-pointer"
                        >
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
                          {window.innerWidth > 1024 &&
                            (carDetails.image.url
                              ? "Change Image"
                              : "Upload Image")}
                        </label>
                      </div>
                    </div>

                    <div
                      className="col-12 col-md-4  px-md-2 px-0"
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <label htmlFor="name" className="form-label">
                        Car Name
                      </label>
                      <input
                        style={{ height: "60px" }}
                        type="text"
                        name="name"
                        value={carDetails.name}
                        onChange={handleInputChange}
                        className="form-control my-0"
                        id="name"
                        placeholder="Enter car name"
                        required
                      />
                    </div>

                    <div
                      className="col-12 col-md-4  px-md-2 px-0"
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <label htmlFor="mileage" className="form-label">
                        Mileage (km)
                      </label>
                      <div>
                        <input
                          style={{ height: "60px" }}
                          type="number"
                          name="mileage"
                          value={carDetails.mileage}
                          onChange={handleInputChange}
                          className="form-control my-0"
                          id="mileage"
                          placeholder="Enter mileage"
                          required
                        />
                      </div>
                    </div>
                    <div
                      className="col-12 col-md-4  px-md-2 px-0"
                      style={{
                        marginBottom: "30px",
                      }}
                    >
                      <label htmlFor="inspectionDate" className="form-label">
                        Inspection Date
                      </label>
                      <input
                        style={{ height: "60px" }}
                        type="date"
                        name="inspectionDate"
                        value={
                          carDetails.inspectionDate
                            ? new Date(carDetails.inspectionDate)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={handleInputChange}
                        className="form-control my-0"
                        id="inspectionDate"
                        required
                      />
                    </div>

                    <div
                      className="col-12 col-md-4  px-md-2 px-0"
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <label htmlFor="engineNo" className="form-label">
                        Engine Number
                      </label>
                      <input
                        style={{ height: "60px" }}
                        type="text"
                        name="engineNo"
                        value={carDetails.engineNo}
                        onChange={handleInputChange}
                        className="form-control my-0"
                        id="engineNo"
                        placeholder="Enter engine number"
                        required
                      />
                    </div>

                    <div
                      className="col-12 col-md-4  px-md-2 px-0"
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <label htmlFor="transmissionType" className="form-label">
                        Transmission Type
                      </label>
                      <select
                        style={{
                          height: "60px",
                          backgroundColor: "transparent",
                        }}
                        name="transmissionType"
                        value={carDetails.transmissionType}
                        onChange={handleInputChange}
                        className="form-select my-0"
                        id="transmissionType"
                        required
                      >
                        <option value="">Select transmission</option>
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                        <option value="CVT">CVT</option>
                      </select>
                    </div>

                    <div
                      className="col-12 col-md-4  px-md-2 px-0"
                      style={{
                        marginBottom: "30px",
                      }}
                    >
                      <label htmlFor="engineCapacity" className="form-label">
                        Engine Capacity (cc)
                      </label>
                      <input
                        style={{ height: "60px" }}
                        type="number"
                        name="engineCapacity"
                        value={carDetails.engineCapacity}
                        onChange={handleInputChange}
                        className="form-control my-0"
                        id="engineCapacity"
                        placeholder="Enter engine capacity"
                        required
                      />
                    </div>

                    <div
                      className="col-12 col-md-4  px-md-2 px-0"
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <label htmlFor="chassisNo" className="form-label">
                        Chassis Number
                      </label>
                      <input
                        style={{ height: "60px" }}
                        type="text"
                        name="chassisNo"
                        value={carDetails.chassisNo}
                        onChange={handleInputChange}
                        className="form-control my-0"
                        id="chassisNo"
                        placeholder="Enter chassis number"
                        required
                      />
                    </div>

                    <div
                      className="col-12 col-md-4  px-md-2 px-0"
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <label htmlFor="registeredCity" className="form-label ">
                        Registered City
                      </label>
                      <select
                        style={{
                          height: "60px",
                          backgroundColor: "transparent",
                        }}
                        name="registeredCity"
                        value={carDetails.registeredCity}
                        onChange={handleInputChange}
                        className="form-select my-0"
                        id="registeredCity"
                        required
                      >
                        <option value="">Select city</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Multan">Multan</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value="Quetta">Quetta</option>
                        <option value="Sialkot">Sialkot</option>
                        <option value="Gujranwala">Gujranwala</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Sukkur">Sukkur</option>
                        <option value="Bahawalpur">Bahawalpur</option>
                        <option value="Sargodha">Sargodha</option>
                        <option value="Mirpur">Mirpur</option>
                        <option value="Muzaffarabad">Muzaffarabad</option>
                        <option value="Gwadar">Gwadar</option>
                      </select>
                    </div>

                    <div
                      className="col-12 col-md-4  px-md-2 px-0"
                      style={{
                        marginBottom: "30px",
                      }}
                    >
                      <label htmlFor="registeredYear" className="form-label">
                        Registered Year
                      </label>
                      <select
                        style={{
                          height: "60px",
                          backgroundColor: "transparent",
                        }}
                        name="registeredYear"
                        value={carDetails.registeredYear}
                        onChange={handleInputChange}
                        className="form-select my-0"
                        id="registeredYear"
                        required
                      >
                        <option value="">Select year</option>
                        {[...Array(35)].map((_, i) => (
                          <option key={2024 - i} value={2024 - i}>
                            {2024 - i}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div
                      className="col-12 col-md-4  px-md-2 px-0"
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <label htmlFor="driveType" className="form-label">
                        Drive Type
                      </label>
                      <select
                        style={{
                          height: "60px",
                          backgroundColor: "transparent",
                        }}
                        name="driveType"
                        value={carDetails.driveType}
                        onChange={handleInputChange}
                        className="form-select my-0"
                        id="driveType"
                        required
                      >
                        <option value="">Select drive type</option>
                        <option value="FWD">FWD</option>
                        <option value="RWD">RWD</option>
                        <option value="AWD">AWD</option>
                        <option value="4WD">4WD</option>
                      </select>
                    </div>

                    <div
                      className="col-12 col-md-4  px-md-2 px-0"
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <label htmlFor="registrationNo" className="form-label">
                        Registration Number
                      </label>
                      <input
                        style={{ height: "60px" }}
                        type="text"
                        name="registrationNo"
                        value={carDetails.registrationNo}
                        onChange={handleInputChange}
                        className="form-control my-0"
                        id="registrationNo"
                        placeholder="Enter registration number"
                        required
                      />
                    </div>

                    <div
                      className="col-12 col-md-4  px-md-2 px-0"
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <label htmlFor="colour" className="form-label">
                        Color
                      </label>
                      <input
                        style={{ height: "60px" }}
                        type="text"
                        name="colour"
                        value={carDetails.colour}
                        onChange={handleInputChange}
                        className="form-control my-0"
                        id="colour"
                        placeholder="Enter color"
                        required
                      />
                    </div>

                    <div className="col-md-4 my-auto ">
                      <div className="d-flex align-items-center ">
                        <input
                          style={{
                            height: "30px",
                            width: "30px",
                          }}
                          type="checkbox"
                          name="cngInstall"
                          checked={carDetails.cngInstall}
                          onChange={handleInputChange}
                          className="form-check-input"
                          id="cngInstall"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="cngInstall"
                        >
                          CNG Installed
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 ps-0">
                  <div className="d-flex justify-content-center gap-3">
                    <button
                      className="backBtn"
                      style={{
                        padding: "25px 7%",
                        fontSize: "1.2rem",
                        borderRadius: "40px",
                      }}
                    >
                      Back
                    </button>
                    <button
                      style={{
                        padding: "25px 7%",
                        fontSize: "1.2rem",
                        borderRadius: "40px",
                      }}
                      onClick={() => {
                        if (editMode) {
                          editHandler();
                        } else {
                          changeStep();
                        }
                      }}
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

export default CarDetails;
