import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import api from "../../../utils/url.js";
import { toast } from "sonner";

const EngineTransmissionClutch = () => {
  const dispatch = useDispatch();
  const { carDetailsId } = useSelector((state) => state.carDetailsId);

  const [engineTransmissionData, setEngineTransmissionData] = useState({
    fluidsFiltersCheck: {
      imageValueChecks: [],
    },
    mechanicalCheck: {
      imageValueChecks: [],
    },
    exhaustCheck: {
      imageValueChecks: [],
    },
    engineCoolingSystem: {
      imageValueChecks: [],
    },
    transmissionCheck: {
      imageValueChecks: [],
    },
  });

  const changeStep = () => {
    dispatch(changeStepSuccess(4));
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

  const handleImageChange = async (e, section, field) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      const base64WithPrefix = `data:image/png;base64,${base64.split(",")[1]}`;

      setEngineTransmissionData((prev) => ({
        ...prev,
        [section]: {
          imageValueChecks: prev[section].imageValueChecks.map((check) =>
            check.name === field
              ? {
                  ...check,
                  data: {
                    ...check.data,
                    image: {
                      url: base64WithPrefix,
                      public_id: "",
                    },
                  },
                }
              : check
          ),
        },
      }));
    }
  };

  const handleInputChange = (e, section, field) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setEngineTransmissionData((prev) => ({
      ...prev,
      [section]: {
        imageValueChecks: prev[section].imageValueChecks.map((check) =>
          check.name === field
            ? {
                ...check,
                data: {
                  ...check.data,
                  value,
                },
              }
            : check
        ),
      },
    }));
  };

  useEffect(() => {
    // Initialize state with schema structure
    setEngineTransmissionData({
      fluidsFiltersCheck: {
        imageValueChecks: [
          {
            name: "engineOilLevel",
            data: { image: { url: "", public_id: "" }, value: "" },
          },
          {
            name: "engineOilLeakage",
            data: { image: { url: "", public_id: "" }, value: "" },
          },
          {
            name: "coolantLeakage",
            data: { image: { url: "", public_id: "" }, value: "" },
          },
          {
            name: "brakeOilLeakage",
            data: { image: { url: "", public_id: "" }, value: "" },
          },
          {
            name: "transmissionOilLeakage",
            data: { image: { url: "", public_id: "" }, value: "" },
          },
        ],
      },
      mechanicalCheck: {
        imageValueChecks: [
          {
            name: "wires",
            data: { image: { url: "", public_id: "" }, value: "" },
          },
          {
            name: "hoses",
            data: { image: { url: "", public_id: "" }, value: "" },
          },
          {
            name: "engineBlow",
            data: { image: { url: "", public_id: "" }, value: "" },
          },
          {
            name: "engineNoise",
            data: { image: { url: "", public_id: "" }, value: "" },
          },
          {
            name: "engineVibration",
            data: { image: { url: "", public_id: "" }, value: "" },
          },
          {
            name: "engineMounts",
            data: { image: { url: "", public_id: "" }, value: false },
          },
        ],
      },
      exhaustCheck: {
        imageValueChecks: [
          {
            name: "exhaustSound",
            data: { image: { url: "", public_id: "" }, value: false },
          },
        ],
      },
      engineCoolingSystem: {
        imageValueChecks: [
          {
            name: "radiator",
            data: { image: { url: "", public_id: "" }, value: false },
          },
          {
            name: "suctionFan",
            data: { image: { url: "", public_id: "" }, value: "" },
          },
        ],
      },
      transmissionCheck: {
        imageValueChecks: [
          {
            name: "starterOperation",
            data: { image: { url: "", public_id: "" }, value: false },
          },
        ],
      },
    });
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await api.post("/engineTransmissionClutch/add", {
        ...engineTransmissionData,
        carDetailsId: carDetailsId || "674d962b622d3809925855fe",
      });

      if (response.data.success) {
        toast("Engine Transmission Clutch Added!", {
          style: {
            padding: "16px",
          }})
          setTimeout(() => {
            changeStep();
          }, 2000);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error adding engine transmission clutch");
    }
  };

  useEffect(() => {
    console.log(engineTransmissionData);
  }, [engineTransmissionData]);

  return (
    <div className="container-fluid min-vh-100 bg-light py-md-5 py-3 px-0">
      <div className="container p-0">
        <div className="card shadow">
          <div className="text-white p-4" style={{ backgroundColor: "red" }}>
            <h2 className="display-4 form-title text-center fw-bold">
              Engine, Transmission & Clutch
            </h2>
          </div>

          <div className="card-body p-4">
            <div className="row g-4">
              {Object.entries(engineTransmissionData).map(([section, data]) => (
                <div className="col-12" key={section}>
                  <h3 className="mb-4 text-capitalize">
                    {section.replace(/([A-Z])/g, " $1").trim()}
                  </h3>
                  <div className="row">
                    {data.imageValueChecks.map((item) => (
                      <div className="col-12 col-md-6 mb-3" key={item.name}>
                        <div className="mb-3">
                          <label className="form-label">
                            {item.name.split(/(?=[A-Z])/).join(" ")}
                          </label>
                          <input
                            type="file"
                            onChange={(e) => handleImageChange(e, section, item.name)}
                            accept="image/*"
                            required
                            className="form-control mb-2"
                          />
                          {item.data.image.url && (
                            <img
                              src={item.data.image.url}
                              alt={`${item.name} Preview`}
                              className="mt-2"
                              style={{maxWidth: '200px'}}
                            />
                          )}
                          <div className="form-floating">
                            {typeof item.data.value === "boolean" ? (
                              <select
                                onChange={(e) => handleInputChange(e, section, item.name)}
                                className="form-select"
                                id={`${section}-${item.name}`}
                              >
                                <option value="" >Select the value</option>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                              </select>
                            ) : (
                              <input
                                type="text"
                                value={item.data.value}
                                onChange={(e) => handleInputChange(e, section, item.name)}
                                className="form-control"
                                id={`${section}-${item.name}`}
                                placeholder="Enter value"
                              />
                            )}
                            <label htmlFor={`${section}-${item.name}`}>
                              {item.name.split(/(?=[A-Z])/).join(" ")} Status
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-end mt-4">
              <button onClick={handleSubmit} className="btn btn-primary btn-lg">
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
  );
};

export default EngineTransmissionClutch;
