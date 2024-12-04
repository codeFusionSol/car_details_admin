import { useDispatch } from "react-redux";
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

  const [carDetails, setCarDetails] = useState({
    image: { url: "", public_id: "" },
    name: "",
    overallRating: 0,
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
  });

  const changeStep = async () => {
    try {
      // Validate required fields
      if (
        !carDetails.image.url ||
        !carDetails.name ||
        !carDetails.overallRating ||
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
          }})
          setTimeout(() => {
            dispatch(changeStepSuccess(1));
            dispatch(changeCarDetailsIdSuccess(response.data.data._id));
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

  return (
    <>
      <div className="container-fluid min-vh-100 bg-light py-md-5 py-3 px-0">
        <div className="container p-0">
          <div className="card shadow">
            <div
              className="text-white p-4"
              style={{ backgroundColor: "#00a5e3" }}
            >
              <h2 className="display-4 form-title text-center fw-bold">
                Car Details
              </h2>
            </div>

            <div className="card-body p-4">
              <div className="row g-4">
                {/* Input fields */}

                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Car Image</label>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="form-control"
                      accept="image/*"
                      required
                    />
                    
                  </div>

                  <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          name="name"
                          value={carDetails.name}
                          onChange={handleInputChange}
                          className="form-control"
                          id="name"
                          placeholder="Your venue public name"
                          required
                        />
                        <label htmlFor="name">Car Name</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="number"
                          name="overallRating"
                          value={carDetails.overallRating}
                          onChange={handleInputChange}
                          className="form-control"
                          id="overallRating"
                          placeholder="Overall Rating"
                          min="0"
                          max="10"
                          required
                        />
                        <label htmlFor="overallRating">Overall Rating</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="number"
                          name="mileage"
                          value={carDetails.mileage}
                          onChange={handleInputChange}
                          className="form-control"
                          id="mileage"
                          placeholder="Mileage"
                          required
                        />
                        <label htmlFor="mileage">Mileage</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="date"
                          name="inspectionDate"
                          value={carDetails.inspectionDate}
                          onChange={handleInputChange}
                          className="form-control"
                          id="inspectionDate"
                          required
                        />
                        <label htmlFor="inspectionDate">Inspection Date</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          name="engineNo"
                          value={carDetails.engineNo}
                          onChange={handleInputChange}
                          className="form-control"
                          id="engineNo"
                          placeholder="Engine Number"
                          required
                        />
                        <label htmlFor="engineNo">Engine Number</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <div className="form-floating">
                        <select
                          name="transmissionType"
                          value={carDetails.transmissionType}
                          onChange={handleInputChange}
                          className="form-select"
                          id="transmissionType"
                          required
                        >
                          <option value="Manual">Manual</option>
                          <option value="Automatic">Automatic</option>
                          <option value="CVT">CVT</option>
                        </select>
                        <label htmlFor="transmissionType">
                          Transmission Type
                        </label>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="number"
                          name="engineCapacity"
                          value={carDetails.engineCapacity}
                          onChange={handleInputChange}
                          className="form-control"
                          id="engineCapacity"
                          placeholder="Engine Capacity"
                          required
                        />
                        <label htmlFor="engineCapacity">Engine Capacity</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          name="chassisNo"
                          value={carDetails.chassisNo}
                          onChange={handleInputChange}
                          className="form-control"
                          id="chassisNo"
                          placeholder="Chassis Number"
                          required
                        />
                        <label htmlFor="chassisNo">Chassis Number</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          name="registeredCity"
                          value={carDetails.registeredCity}
                          onChange={handleInputChange}
                          className="form-control"
                          id="registeredCity"
                          placeholder="Registered City"
                          required
                        />
                        <label htmlFor="registeredCity">Registered City</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="number"
                          name="registeredYear"
                          value={carDetails.registeredYear}
                          onChange={handleInputChange}
                          className="form-control"
                          id="registeredYear"
                          placeholder="Registered Year"
                          required
                        />
                        <label htmlFor="registeredYear">Registered Year</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <div className="form-floating">
                        <select
                          name="driveType"
                          value={carDetails.driveType}
                          onChange={handleInputChange}
                          className="form-select"
                          id="driveType"
                          required
                        >
                          <option value="FWD">FWD</option>
                          <option value="RWD">RWD</option>
                          <option value="AWD">AWD</option>
                          <option value="4WD">4WD</option>
                        </select>
                        <label htmlFor="driveType">Drive Type</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          name="registrationNo"
                          value={carDetails.registrationNo}
                          onChange={handleInputChange}
                          className="form-control"
                          id="registrationNo"
                          placeholder="Registration Number"
                          required
                        />
                        <label htmlFor="registrationNo">
                          Registration Number
                        </label>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          name="colour"
                          value={carDetails.colour}
                          onChange={handleInputChange}
                          className="form-control"
                          id="colour"
                          placeholder="Color"
                          required
                        />
                        <label htmlFor="colour">Color</label>
                      </div>
                    </div>

                    <div className="col-12 mb-3">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="cngInstall"
                          checked={carDetails.cngInstall}
                          onChange={handleInputChange}
                          className="form-check-input"
                          id="cngInstall"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="cngInstall"
                        >
                          CNG Installed
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-end mt-4">
                  <button
                    onClick={changeStep}
                    className="btn btn-primary btn-lg"
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
      </div>
      <div className="p-4">
        <Toaster position={window.innerWidth <= 768 ? 'bottom-right' : 'top-right'} />
      </div>
    </>
  );
};

export default CarDetails;
