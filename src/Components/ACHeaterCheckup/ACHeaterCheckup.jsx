import { useDispatch } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";

const ACHeaterCheckup = ({ formData, setFormData }) => {
  const dispatch = useDispatch();

  const changeStep = () => {
    dispatch(changeStepSuccess(8));
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

  const handleImageChange = async (e, section, field, item) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      const base64WithPrefix = `data:image/png;base64,${base64.split(",")[1]}`;

      setFormData((prev) => {
        const newData = { ...prev };

        // Handle interior section specifically
        if (section === "interior") {
          // For steering controls
          if (field === "steeringControls") {
            if (!newData[section][field][item]) {
              newData[section][field][item] = {
                image: { url: base64WithPrefix, public_id: "" },
                value: "",
              };
            } else {
              newData[section][field][item].image.url = base64WithPrefix;
            }
          }
          // For seats
          else if (field === "seats") {
            if (!newData[section][field][item]) {
              newData[section][field][item] = {
                image: { url: base64WithPrefix, public_id: "" },
                value: "",
              };
            } else {
              newData[section][field][item].image.url = base64WithPrefix;
            }
          }
          // For equipment
          else if (field === "equipment") {
            if (!newData[section][field][item]) {
              newData[section][field][item] = {
                image: { url: base64WithPrefix, public_id: "" },
                value: "",
              };
            } else {
              newData[section][field][item].image.url = base64WithPrefix;
            }
          }
          // For poshish
          else if (field === "poshish") {
            if (!newData[section][field].imageValueChecks) {
              newData[section][field].imageValueChecks = [];
            }
            const checks = [...newData[section][field].imageValueChecks];
            const existingIndex = checks.findIndex(
              (check) => check.name === item
            );

            if (existingIndex >= 0) {
              checks[existingIndex].data.image.url = base64WithPrefix;
            } else {
              checks.push({
                name: item,
                data: {
                  image: { url: base64WithPrefix, public_id: "" },
                  value: "",
                },
              });
            }
            newData[section][field].imageValueChecks = checks;
          }
        }
        // Handle electrical electronics section
        else if (section === "electricalElectronics") {
          // Handle battery section specifically
          if (field === "battery") {
            if (item === "alternatorOperation") {
              if (!newData[section][field][item]) {
                newData[section][field][item] = {
                  image: { url: base64WithPrefix, public_id: "" },
                  value: "",
                };
              } else {
                newData[section][field][item].image.url = base64WithPrefix;
              }
            }
          }
          // Handle computerCheckUp and other subsections
          else {
            if (!newData[section][field]) {
              newData[section][field] = {};
            }
            if (!newData[section][field].imageValueChecks) {
              newData[section][field].imageValueChecks = [];
            }

            const checks = [...newData[section][field].imageValueChecks];
            const existingIndex = checks.findIndex(
              (check) => check.name === item
            );

            if (existingIndex >= 0) {
              checks[existingIndex].data.image.url = base64WithPrefix;
            } else {
              checks.push({
                name: item,
                data: {
                  image: { url: base64WithPrefix, public_id: "" },
                  value: "",
                },
              });
            }
            newData[section][field].imageValueChecks = checks;
          }
        }
        // Handle other sections
        else {
          // Handle imageValueChecks array case
          if (field === "imageValueChecks") {
            if (!newData[section][field]) {
              newData[section][field] = [];
            }

            const checks = [...newData[section][field]];
            const existingIndex = checks.findIndex(
              (check) => check.name === item
            );

            if (existingIndex >= 0) {
              checks[existingIndex].data.image.url = base64WithPrefix;
            } else {
              checks.push({
                name: item,
                data: {
                  image: { url: base64WithPrefix, public_id: "" },
                  value: "",
                },
              });
            }
            newData[section][field] = checks;
          }
          // Handle nested field case (like fluidsFiltersCheck, mechanicalCheck)
          else if (field && item) {
            // Special case for parkingHandBrake
            if (item === "parkingHandBrake") {
              if (!newData[section][field][item]) {
                newData[section][field][item] = {
                  image: { url: "", public_id: "" },
                  value: "",
                };
              }
              newData[section][field][item].image.url = base64WithPrefix;
            } else {
              // Initialize nested structure if it doesn't exist
              if (!newData[section][field]) {
                newData[section][field] = {};
              }
              if (!newData[section][field].imageValueChecks) {
                newData[section][field].imageValueChecks = [];
              }

              const checks = [...newData[section][field].imageValueChecks];
              const existingIndex = checks.findIndex(
                (check) => check.name === item
              );

              if (existingIndex >= 0) {
                checks[existingIndex].data.image.url = base64WithPrefix;
              } else {
                checks.push({
                  name: item,
                  data: {
                    image: { url: base64WithPrefix, public_id: "" },
                    value: "",
                  },
                });
              }
              newData[section][field].imageValueChecks = checks;
            }
          }
          // Handle regular image field case
          else if (field) {
            if (!newData[section][field]) {
              newData[section][field] = { image: { url: "", public_id: "" } };
            }
            newData[section][field].image.url = base64WithPrefix;
          }
          // Handle root level image
          else {
            if (!newData[section].image) {
              newData[section].image = { url: "", public_id: "" };
            }
            newData[section].image.url = base64WithPrefix;
          }
        }

        return newData;
      });
    }
  };

  const handleInputChange = (e, section, field, subfield) => {
    let value;
    console.log(e.target.type);
    if (e.target.type === "number") {
      value = e.target.type === "number" ? +e.target.value : e.target.value;
    } else {
      value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    }

    setFormData((prev) => {
      const newData = { ...prev };
      if (subfield) {
        newData[section][field][subfield] = value;
      } else if (field) {
        newData[section][field] = value;
      } else {
        newData[section] = value;
      }
      return newData;
    });
  };

  return (
    <>
      <section className="ac-heater-section">
        <h2 className="section-title">AC & Heater Checkup</h2>

        <div className="form-grid">
          <div className="form-group">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="acFitted"
                checked={
                  formData.acHeater.acHeaterCheckUp.booleanChecks.find(
                    (check) => check.name === "acFitted"
                  )?.value || false
                }
                onChange={(e) => {
                  setFormData((prev) => {
                    const newData = { ...prev };
                    const checks = [
                      ...newData.acHeater.acHeaterCheckUp.booleanChecks,
                    ];
                    const existingIndex = checks.findIndex(
                      (check) => check.name === "acFitted"
                    );

                    if (existingIndex >= 0) {
                      checks[existingIndex].value = e.target.checked;
                    } else {
                      checks.push({
                        name: "acFitted",
                        value: e.target.checked,
                      });
                    }

                    newData.acHeater.acHeaterCheckUp.booleanChecks = checks;
                    return newData;
                  });
                }}
                required
              />
              <label htmlFor="acFitted">AC Fitted</label>
            </div>
          </div>

          <div className="form-group">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="acOperational"
                checked={
                  formData.acHeater.acHeaterCheckUp.booleanChecks.find(
                    (check) => check.name === "acOperational"
                  )?.value || false
                }
                onChange={(e) => {
                  setFormData((prev) => {
                    const newData = { ...prev };
                    const checks = [
                      ...newData.acHeater.acHeaterCheckUp.booleanChecks,
                    ];
                    const existingIndex = checks.findIndex(
                      (check) => check.name === "acOperational"
                    );

                    if (existingIndex >= 0) {
                      checks[existingIndex].value = e.target.checked;
                    } else {
                      checks.push({
                        name: "acOperational",
                        value: e.target.checked,
                      });
                    }

                    newData.acHeater.acHeaterCheckUp.booleanChecks = checks;
                    return newData;
                  });
                }}
                required
              />
              <label htmlFor="acOperational">AC Operational</label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="blower">Blower</label>
            <input
              type="text"
              id="blower"
              className="form-control"
              value={
                formData.acHeater.acHeaterCheckUp.stringChecks.find(
                  (check) => check.name === "blower"
                )?.value || ""
              }
              onChange={(e) => {
                setFormData((prev) => {
                  const newData = { ...prev };
                  const checks = [
                    ...newData.acHeater.acHeaterCheckUp.stringChecks,
                  ];
                  const existingIndex = checks.findIndex(
                    (check) => check.name === "blower"
                  );

                  if (existingIndex >= 0) {
                    checks[existingIndex].value = e.target.value;
                  } else {
                    checks.push({
                      name: "blower",
                      value: e.target.value,
                    });
                  }

                  newData.acHeater.acHeaterCheckUp.stringChecks = checks;
                  return newData;
                });
              }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cooling">Cooling</label>
            <input
              type="text"
              id="cooling"
              className="form-control"
              value={
                formData.acHeater.acHeaterCheckUp.stringChecks.find(
                  (check) => check.name === "cooling"
                )?.value || ""
              }
              onChange={(e) => {
                setFormData((prev) => {
                  const newData = { ...prev };
                  const checks = [
                    ...newData.acHeater.acHeaterCheckUp.stringChecks,
                  ];
                  const existingIndex = checks.findIndex(
                    (check) => check.name === "cooling"
                  );

                  if (existingIndex >= 0) {
                    checks[existingIndex].value = e.target.value;
                  } else {
                    checks.push({
                      name: "cooling",
                      value: e.target.value,
                    });
                  }

                  newData.acHeater.acHeaterCheckUp.stringChecks = checks;
                  return newData;
                });
              }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="heating">Heating</label>
            <input
              type="text"
              id="heating"
              className="form-control"
              value={
                formData.acHeater.acHeaterCheckUp.stringChecks.find(
                  (check) => check.name === "heating"
                )?.value || ""
              }
              onChange={(e) => {
                setFormData((prev) => {
                  const newData = { ...prev };
                  const checks = [
                    ...newData.acHeater.acHeaterCheckUp.stringChecks,
                  ];
                  const existingIndex = checks.findIndex(
                    (check) => check.name === "heating"
                  );

                  if (existingIndex >= 0) {
                    checks[existingIndex].value = e.target.value;
                  } else {
                    checks.push({
                      name: "heating",
                      value: e.target.value,
                    });
                  }

                  newData.acHeater.acHeaterCheckUp.stringChecks = checks;
                  return newData;
                });
              }}
              required
            />
          </div>
        </div>

        <style jsx>{`
          .ac-heater-section {
            background: #fff;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .section-title {
            color: #2c3e50;
            font-size: 1.8rem;
            margin-bottom: 2rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #3498db;
          }

          .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #34495e;
            font-weight: 500;
          }

          .form-control {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
            transition: border-color 0.2s;
          }

          .form-control:focus {
            border-color: #3498db;
            outline: none;
            box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
          }

          .checkbox-wrapper {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .checkbox-wrapper input[type="checkbox"] {
            width: 1.2rem;
            height: 1.2rem;
            cursor: pointer;
          }

          .checkbox-wrapper label {
            margin-bottom: 0;
            cursor: pointer;
          }
        `}</style>
      </section>
      <button onClick={() => changeStep()}>Next</button>
    </>
  );
};

export default ACHeaterCheckup;
