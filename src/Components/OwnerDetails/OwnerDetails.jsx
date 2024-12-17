import { useDispatch, useSelector } from "react-redux";
import { changeFormStateSuccess } from "../../redux/Slices/Sidebar";
import {
  changeStepStart,
  changeStepSuccess,
  changeStepFailure,
} from "../../redux/Slices/FormsSteps";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../utils/url";
import { Toaster, toast } from "sonner";
import { changeOwnerIdSuccess } from "../../redux/Slices/Owner_id.jsx";
import { addDataToCarDetailsSuccess, updateDataToCarDetailsSuccess } from "../../redux/Slices/CarDetail_id.jsx";

const api = axios.create({
  baseURL: url,
});

const OwnerDetails = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?.user?._id);
  console.log(userId);
  const [editMode, setEditMode] = useState(false);
  const [ownerDetails, setOwnerDetails] = useState({
    name: "",
    city: "",
    cnicNumber: "",
    contactNumber: "",
    userId: userId,
    carId: null // Initialize carId as null instead of empty string
  });

  const fullCarDetails = useSelector((state) => state?.carDetailsId?.fullDetaills);
  console.log(fullCarDetails);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOwnerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (fullCarDetails.length > 0) {
      setOwnerDetails(fullCarDetails[0]);
      setEditMode(true);
    }
  }, [fullCarDetails]);

  const changeStep = async () => {
    try {
      // Validate required fields
      if (
        !ownerDetails.name ||
        !ownerDetails.city ||
        !ownerDetails.cnicNumber ||
        !ownerDetails.contactNumber
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Validate CNIC format (13 digits)
      const cnicRegex = /^\d{13}$/;
      if (!cnicRegex.test(ownerDetails.cnicNumber)) {
        throw new Error("CNIC number must be 13 digits");
      }

      // Validate contact number format (11 digits)
      const contactRegex = /^\d{11}$/;
      if (!contactRegex.test(ownerDetails.contactNumber)) {
        throw new Error("Contact number must be 11 digits");
      }

      dispatch(changeStepStart());

      // Remove carId if it's null before sending to API
      const ownerDetailsToSend = { ...ownerDetails, userId: userId };
      if (!ownerDetailsToSend.carId) {
        delete ownerDetailsToSend.carId;
      }

      const response = await api.post("/ownerDetails/add", ownerDetailsToSend);

      if (response.data.success) {
        toast("Owner Details Added!", {
          style: {
            padding: "16px",
          },
        });
        dispatch(changeOwnerIdSuccess(response.data.data._id));
        dispatch(addDataToCarDetailsSuccess(response.data?.data));
        setTimeout(() => {
          dispatch(changeStepSuccess(1));
        }, 2000);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(changeStepFailure(error.message));
      alert(error.message);
    }
  };

  const updateStep = async () => {
    try {
      // Remove carId if it's null before sending to API
      const ownerDetailsToSend = { ...ownerDetails };
      if (!ownerDetailsToSend.carId) {
        delete ownerDetailsToSend.carId;
      }

      const response = await api.post(
        `/ownerDetails/update/${ownerDetails?._id}`,
        ownerDetailsToSend
      );

      if (response.data.success) {
        toast("Owner Details Updated!", {
          style: {
            padding: "16px",
          },
        });
        dispatch(updateDataToCarDetailsSuccess(response.data?.data));
        setTimeout(() => {
          dispatch(changeStepSuccess(fullCarDetails.length));
        }, 2000);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(changeStepFailure(error.message));
      alert(error.message);
    }
  };

  return (
    <>
      <div className="container-fluid min-vh-100 pb-md-5 py-3 px-0">
        <div className="container p-0">
          <div className="card border-0">
            <div className="card-header align-items-center d-flex justify-content-center bg-opacity-25 border-0 pb-3 ps-0">
              <h4 className="text-center  carDetailsHeading">
                Owner Details
              </h4>
            </div>

            <div
              className="card-body d-flex flex-column justify-content-center align-items-center p-md-4 p-1"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="row g-4 ps-0">
                <div className="col-12 pe-0 ">
                  <div className="row gx-4">
                    <div className="col-12 col-md-6 px-md-2 px-0 mb-3">
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input
                        style={{ height: "60px" }}
                        type="text"
                        name="name"
                        value={ownerDetails.name}
                        onChange={handleInputChange}
                        className="form-control my-0"
                        id="name"
                        placeholder="Enter full name"
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6 px-md-2 px-0 mb-3">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <select
                        style={{
                          height: "60px",
                          backgroundColor: "transparent",
                        }}
                        name="city"
                        value={ownerDetails.city}
                        onChange={handleInputChange}
                        className="form-select my-0"
                        id="city"
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
                      </select>
                    </div>

                    <div className="col-12 col-md-6 px-md-2 px-0 mb-3">
                      <label htmlFor="cnicNumber" className="form-label">
                        CNIC Number
                      </label>
                      <input
                        style={{ height: "60px" }}
                        type="text"
                        name="cnicNumber"
                        value={ownerDetails.cnicNumber}
                        onChange={handleInputChange}
                        className="form-control my-0"
                        id="cnicNumber"
                        placeholder="Enter 13-digit CNIC number"
                        maxLength="13"
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6 px-md-2 px-0 mb-3">
                      <label htmlFor="contactNumber" className="form-label">
                        Contact Number
                      </label>
                      <input
                        style={{ height: "60px" }}
                        type="text"
                        name="contactNumber"
                        value={ownerDetails.contactNumber}
                        onChange={handleInputChange}
                        className="form-control my-0"
                        id="contactNumber"
                        placeholder="Enter 11-digit contact number"
                        maxLength="11"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 ps-0">
                  <div className="d-flex justify-content-center gap-3">
                    <button
                      onClick={!editMode ? changeStep : updateStep}
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

export default OwnerDetails;
