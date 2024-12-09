import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import { useEffect, useState } from "react";
import api from "../../../utils/url.js";
import { Toaster, toast } from "sonner";

const SuspensionSteering = () => {
  const dispatch = useDispatch();
  const carDetailsId = useSelector((state) => state.carDetailsId.carDetailsId);

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

      setSuspensionData((prev) => {
        const newData = { ...prev };
        const checks = [...newData[section].imageValueChecks];
        const existingIndex = checks.findIndex((check) => check.name === item);

        if (existingIndex >= 0) {
          checks[existingIndex].data.image.url = base64WithPrefix;
        } else {
          checks.push({
            name: item,
            data: {
              image: { url: base64WithPrefix, public_id: "" },
              value: "",
              percentage: "",
            },
          });
        }

        newData[section].imageValueChecks = checks;
        return newData;
      });
    }
  };

  const handleValueChange = (section, item, value, options) => {
    const percentage = calculatePercentage(value, options);

    setSuspensionData((prev) => {
      const newData = { ...prev };
      const checks = [...newData[section].imageValueChecks];
      const existingIndex = checks.findIndex((check) => check.name === item);

      if (existingIndex >= 0) {
        checks[existingIndex].data.value = value;
        checks[existingIndex].data.percentage = percentage;
      } else {
        checks.push({
          name: item,
          data: {
            image: { url: "", public_id: "" },
            value: value,
            percentage: percentage,
          },
        });
      }

      newData[section].imageValueChecks = checks;
      return newData;
    });
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
          dispatch(changeStepSuccess(6));
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting suspension data:", error);
      alert(error.response?.data?.message || "Error submitting data");
    }
  };

  useEffect(() => {
    console.log(suspensionData);
  }, [suspensionData]);

  return (
    <>
      <div className="container-fluid min-vh-100 bg-light pb-md-5 py-3 px-0">
        <div className="container p-0">
          <div className="card shadow">
            <div
              className="text-white p-4"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              <h2 className="display-4 form-title text-center fw-bold">
                Suspension & Steering
              </h2>
            </div>

            <div className="card-body p-4 d-flex flex-column justify-content-center align-items-center">
              {["frontSuspension", "rearSuspension"].map((section) => (
                <div className="col-12 px-0 mb-4" key={section}>
                  <h3 className="fw-bold mb-3">
                    {section === "frontSuspension"
                      ? "Front Suspension"
                      : "Rear Suspension"}
                  </h3>
                  <div className="row">
                    {Object.keys(dropdownOptions[section]).map(
                      (item, index) => (
                        <div
                          className="col-12 col-md-6 mb-3 mx-0 px-0"
                          key={index}
                        >
                          <label className="form-label">
                            {item.split(/(?=[A-Z])/).join(" ")}
                          </label>
                          <select
                            className="form-select"
                            onChange={(e) =>
                              handleValueChange(
                                section,
                                item,
                                e.target.value,
                                dropdownOptions[section][item]
                              )
                            }
                          >
                            <option value="">Select the value</option>
                            {dropdownOptions[section][item].map((option, i) => (
                              <option key={i} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          <input
                            type="file"
                            className="form-control mt-2"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageChange(e, section, item)
                            }
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
              <button
                onClick={changeStep}
                className="btn btn-lg"
                style={{ backgroundColor: "var(--primary-color)" }}
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
      <Toaster position="top-right" />
    </>
  );
};

export default SuspensionSteering;
