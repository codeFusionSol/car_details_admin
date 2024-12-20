import { useDispatch, useSelector } from "react-redux";
import { changeFormStateSuccess } from "../../redux/Slices/Sidebar";
import {
  changeStepStart,
  changeStepSuccess,
  changeStepFailure,
} from "../../redux/Slices/FormsSteps";
import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../../utils/url";
import { Toaster, toast } from "sonner";
import { addDataToCarDetailsSuccess, updateDataToCarDetailsSuccess } from "../../redux/Slices/CarDetail_id";

const api = axios.create({
  baseURL: url,
});

const TestDrive = () => {
  const dispatch = useDispatch();
  const { fullDetaills, carDetailsId } = useSelector((state) => state.carDetailsId);
  const [editMode, setEditMode] = useState(false);

  const [testDriveDetails, setTestDriveDetails] = useState({
    enginePick: "",
    driveShaftNoise: "",
    gearShiftingAutomatic: "",
    brakePedalOperation: "",
    absOperation: "",
    frontSuspensionWhileDriving: "",
    rearSuspensionWhileDriving: "",
    steeringOperationWhileDriving: "",
    steeringWheelAlignmentWhileDriving: "",
    acOperationWhileDriving: "",
    heaterOperationWhileDriving: "",
    speedometerWhileDriving: "",
    testDriveDoneBy: "",
    tireCondition: "",
    batteryHealth: "",
    oilLevel: "",
    overallVehicleCondition: ""
  });

  const optionsMap = {
    enginePick: ["Ok", "Not Ok"],
    driveShaftNoise: ["No Noise", "Noisy"],
    gearShiftingAutomatic: ["Smooth", "Rough"],
    brakePedalOperation: ["Timely Response", "Delayed Response"],
    absOperation: ["Timely Response", "Delayed Response"],
    frontSuspensionWhileDriving: ["No Noise", "Noisy"],
    rearSuspensionWhileDriving: ["No Noise", "Noisy"],
    steeringOperationWhileDriving: ["Smooth", "Rough"],
    steeringWheelAlignmentWhileDriving: ["Centered", "Misaligned"],
    acOperationWhileDriving: ["Perfect", "Imperfect"],
    heaterOperationWhileDriving: ["Satisfactory", "Unsatisfactory"],
    speedometerWhileDriving: ["Working", "Not Working"],
    testDriveDoneBy: ["Seller", "Buyer"],
    tireCondition: ["Good", "Bad"],
    batteryHealth: ["Excellent", "Poor"],
    oilLevel: ["Normal", "Abnormal"],
    overallVehicleCondition: ["Satisfactory", "Unsatisfactory"]
  };

  useEffect(() => {
    if (fullDetaills?.length > 11) {
      setTestDriveDetails(fullDetaills[11]);
      setEditMode(true);
    }
  }, [fullDetaills]);

  useEffect(() => {
    const fullDetaills = JSON.parse(localStorage.getItem("fullDetaills"));
    if (fullDetaills?.length > 11) {
      setTestDriveDetails(fullDetaills[11]);
      setEditMode(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestDriveDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeStep = async () => {
    try {
      // Validate required fields
      if (Object.values(testDriveDetails).some(value => !value)) {
        throw new Error("Please fill in all required fields");
      }

      dispatch(changeStepStart());

      const response = await api.post("/testDrive/add", {
        ...testDriveDetails,
        carDetailsId: carDetailsId
      });

      if (response.data) {
        toast("Test Drive Details Added!", {
          style: {
            padding: "16px",
          },
        });
        setTimeout(() => {
          dispatch(addDataToCarDetailsSuccess(response?.data?.data));
          dispatch(changeStepSuccess(12));
        }, 2000);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(changeStepFailure(error.message));
      alert(error.message);
    }
  };

  const editHandler = async () => {
    try {
      dispatch(changeStepStart());
      const response = await api.put(
        `/testDrive/update/${fullDetaills[11]._id}`,
        testDriveDetails
      );

      if (response.data) {
        toast("Test Drive Details Updated!", {
          style: {
            padding: "16px",
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
      alert(error.message);
    }
  };

  return (
    <>
      <div className="container-fluid min-vh-100 pb-md-5 py-3 px-0">
        <div className="container p-0">
          <div className="card border-0">
            <div className="card-header align-items-center d-flex justify-content-center bg-opacity-25 border-0 py-3 ps-0">
              <h4 className="text-center mb-0 carDetailsHeading">
                Test Drive
              </h4>
            </div>

            <div className="card-body d-flex flex-column justify-content-center align-items-center p-md-4 p-1" style={{ backgroundColor: "#f8f9fa" }}>
              <div className="row g-4 ps-0 w-100">
                {Object.keys(optionsMap).map((key) => (
                  <div key={key} className="col-12 col-md-4 px-md-2 px-0" style={{ marginBottom: "10px" }}>
                    <label htmlFor={key} className="form-label">
                      {key.split(/(?=[A-Z])/).join(" ")}
                    </label>
                    <select
                      style={{ height: "60px", backgroundColor: "transparent" }}
                      name={key}
                      value={testDriveDetails[key]}
                      onChange={handleInputChange}
                      className="form-select my-0"
                      id={key}
                      required
                    >
                      <option value="">Select option</option>
                      {optionsMap[key].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                <div className="col-12 ps-0">
                  <div className="d-flex align-items-center flex-md-row flex-column-reverse justify-content-center gap-3">
                    <button
                      onClick={() => {
                        dispatch(changeStepSuccess(0));
                      }}
                      className="backBtn"
                    >
                      Back
                    </button>
                    <button
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
        <Toaster position={window.innerWidth <= 768 ? "bottom-right" : "top-right"} />
      </div>
    </>
  );
};

export default TestDrive;
