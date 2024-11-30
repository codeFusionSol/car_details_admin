import { useDispatch } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";

const ExteriorBody = ({ formData, setFormData }) => {
  const dispatch = useDispatch();

  const changeStep = () => {
    dispatch(changeStepSuccess(10));
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
      <section>
        <h2>Exterior Body</h2>

        <div>
          <h3>Car Frame</h3>

          {[
            "frontWindshieldCondition",
            "rearWindshieldCondition",
            "windscreenWiper",
          ].map((item) => (
            <div key={item}>
              <label>{item}</label>
              <input
                type="file"
                onChange={(e) =>
                  handleImageChange(e, "exteriorBody", "carFrame", item)
                }
                accept="image/*"
                required
              />
              <input
                type="text"
                value={
                  formData.exteriorBody.carFrame.imageValueChecks.find(
                    (check) => check.name === item
                  )?.data?.value || ""
                }
                onChange={(e) => {
                  setFormData((prev) => {
                    const newData = { ...prev };
                    const checks = [
                      ...(newData.exteriorBody.carFrame.imageValueChecks || []),
                    ];
                    const existingIndex = checks.findIndex(
                      (check) => check.name === item
                    );

                    if (existingIndex >= 0) {
                      checks[existingIndex].data.value = e.target.value;
                    } else {
                      checks.push({
                        name: item,
                        data: {
                          image: { url: "", public_id: "" },
                          value: e.target.value,
                        },
                      });
                    }

                    newData.exteriorBody.carFrame.imageValueChecks = checks;
                    return newData;
                  });
                }}
                required
              />
            </div>
          ))}

          {[
            "frontRightDoorWindow",
            "frontLeftDoorWindow",
            "rearRightDoorWindow",
            "rearLeftDoorWindow",
            "trunkLock",
          ].map((item) => (
            <div key={item}>
              <label>{item}</label>
              <input
                type="checkbox"
                checked={
                  formData.exteriorBody.carFrame.booleanChecks.find(
                    (check) => check.name === item
                  )?.value || false
                }
                onChange={(e) => {
                  setFormData((prev) => {
                    const newData = { ...prev };
                    const checks = [
                      ...(newData.exteriorBody.carFrame.booleanChecks || []),
                    ];
                    const existingIndex = checks.findIndex(
                      (check) => check.name === item
                    );

                    if (existingIndex >= 0) {
                      checks[existingIndex].value = e.target.checked;
                    } else {
                      checks.push({
                        name: item,
                        value: e.target.checked,
                      });
                    }

                    newData.exteriorBody.carFrame.booleanChecks = checks;
                    return newData;
                  });
                }}
              />
            </div>
          ))}
        </div>

        <div>
          <h3>Exterior Lights</h3>

          {[
            "rightHeadlightWorking",
            "leftHeadlightWorking",
            "rightHeadlightCondition",
            "leftHeadlightCondition",
            "rightTaillightCondition",
            "leftTaillightCondition",
          ].map((item) => (
            <div key={item}>
              <label>{item}</label>
              <input
                type="file"
                onChange={(e) =>
                  handleImageChange(e, "exteriorBody", "exteriorLights", item)
                }
                accept="image/*"
                required
              />
              <input
                type="text"
                value={
                  formData.exteriorBody.exteriorLights.imageValueChecks.find(
                    (check) => check.name === item
                  )?.data?.value || ""
                }
                onChange={(e) => {
                  setFormData((prev) => {
                    const newData = { ...prev };
                    const checks = [
                      ...(newData.exteriorBody.exteriorLights
                        .imageValueChecks || []),
                    ];
                    const existingIndex = checks.findIndex(
                      (check) => check.name === item
                    );

                    if (existingIndex >= 0) {
                      checks[existingIndex].data.value = e.target.value;
                    } else {
                      checks.push({
                        name: item,
                        data: {
                          image: { url: "", public_id: "" },
                          value: e.target.value,
                        },
                      });
                    }

                    newData.exteriorBody.exteriorLights.imageValueChecks =
                      checks;
                    return newData;
                  });
                }}
                required
              />
            </div>
          ))}

          {["rightTaillightWorking", "leftTaillightWorking"].map((item) => (
            <div key={item}>
              <label>{item}</label>
              <input
                type="checkbox"
                checked={
                  formData.exteriorBody.exteriorLights.booleanChecks.find(
                    (check) => check.name === item
                  )?.value || false
                }
                onChange={(e) => {
                  setFormData((prev) => {
                    const newData = { ...prev };
                    const checks = [
                      ...(newData.exteriorBody.exteriorLights.booleanChecks ||
                        []),
                    ];
                    const existingIndex = checks.findIndex(
                      (check) => check.name === item
                    );

                    if (existingIndex >= 0) {
                      checks[existingIndex].value = e.target.checked;
                    } else {
                      checks.push({
                        name: item,
                        value: e.target.checked,
                      });
                    }

                    newData.exteriorBody.exteriorLights.booleanChecks = checks;
                    return newData;
                  });
                }}
              />
            </div>
          ))}
        </div>
      </section>
      <button onClick={() => changeStep()}>Next</button>
    </>
  );
};

export default ExteriorBody;
