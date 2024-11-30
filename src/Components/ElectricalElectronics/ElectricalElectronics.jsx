import { useDispatch } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";

const ElectricalElectronics = ({ formData, setFormData }) => {
  const dispatch = useDispatch();

  const changeStep = () => {
    dispatch(changeStepSuccess(9));
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
          <h2>Electrical & Electronics</h2>

          <div>
            <h3>Computer Checkup</h3>

            <div>
              <label>Malfunction Check</label>
              <input
                type="file"
                onChange={(e) =>
                  handleImageChange(
                    e,
                    "electricalElectronics",
                    "computerCheckUp",
                    "malfunctionCheck"
                  )
                }
                accept="image/*"
                required
              />
              <input
                type="text"
                value={
                  formData.electricalElectronics.computerCheckUp.imageValueChecks.find(
                    (check) => check.name === "malfunctionCheck"
                  )?.data?.value || ""
                }
                onChange={(e) => {
                  setFormData((prev) => {
                    const newData = { ...prev };
                    const checks = [
                      ...newData.electricalElectronics.computerCheckUp
                        .imageValueChecks,
                    ];
                    const existingIndex = checks.findIndex(
                      (check) => check.name === "malfunctionCheck"
                    );

                    if (existingIndex >= 0) {
                      checks[existingIndex].data.value = e.target.value;
                    } else {
                      checks.push({
                        name: "malfunctionCheck",
                        data: {
                          image: { url: "", public_id: "" },
                          value: e.target.value,
                        },
                      });
                    }

                    newData.electricalElectronics.computerCheckUp.imageValueChecks =
                      checks;
                    return newData;
                  });
                }}
                required
              />
            </div>

            <div>
              <label>Rear View Camera</label>
              <input
                type="file"
                onChange={(e) =>
                  handleImageChange(
                    e,
                    "electricalElectronics",
                    "computerCheckUp",
                    "rearViewCamera"
                  )
                }
                accept="image/*"
                required
              />
              <input
                type="text"
                value={
                  formData.electricalElectronics.computerCheckUp.imageValueChecks.find(
                    (check) => check.name === "rearViewCamera"
                  )?.data?.value || ""
                }
                onChange={(e) => {
                  setFormData((prev) => {
                    const newData = { ...prev };
                    const checks = [
                      ...newData.electricalElectronics.computerCheckUp
                        .imageValueChecks,
                    ];
                    const existingIndex = checks.findIndex(
                      (check) => check.name === "rearViewCamera"
                    );

                    if (existingIndex >= 0) {
                      checks[existingIndex].data.value = e.target.value;
                    } else {
                      checks.push({
                        name: "rearViewCamera",
                        data: {
                          image: { url: "", public_id: "" },
                          value: e.target.value,
                        },
                      });
                    }

                    newData.electricalElectronics.computerCheckUp.imageValueChecks =
                      checks;
                    return newData;
                  });
                }}
                required
              />
            </div>

            <div>
              <label>Gauges</label>
              <input
                type="file"
                onChange={(e) =>
                  handleImageChange(
                    e,
                    "electricalElectronics",
                    "computerCheckUp",
                    "gauges"
                  )
                }
                accept="image/*"
                required
              />
              <input
                type="text"
                value={
                  formData.electricalElectronics.computerCheckUp.imageValueChecks.find(
                    (check) => check.name === "gauges"
                  )?.data?.value || ""
                }
                onChange={(e) => {
                  setFormData((prev) => {
                    const newData = { ...prev };
                    const checks = [
                      ...newData.electricalElectronics.computerCheckUp
                        .imageValueChecks,
                    ];
                    const existingIndex = checks.findIndex(
                      (check) => check.name === "gauges"
                    );

                    if (existingIndex >= 0) {
                      checks[existingIndex].data.value = e.target.value;
                    } else {
                      checks.push({
                        name: "gauges",
                        data: {
                          image: { url: "", public_id: "" },
                          value: e.target.value,
                        },
                      });
                    }

                    newData.electricalElectronics.computerCheckUp.imageValueChecks =
                      checks;
                    return newData;
                  });
                }}
                required
              />
            </div>

            <div>
              <label>Battery Warning Light</label>
              <input
                type="checkbox"
                checked={
                  formData.electricalElectronics.computerCheckUp.booleanChecks.find(
                    (check) => check.name === "batteryWarningLight"
                  )?.value || false
                }
                onChange={(e) => {
                  setFormData((prev) => {
                    const newData = { ...prev };
                    const checks = [
                      ...newData.electricalElectronics.computerCheckUp
                        .booleanChecks,
                    ];
                    const existingIndex = checks.findIndex(
                      (check) => check.name === "batteryWarningLight"
                    );

                    if (existingIndex >= 0) {
                      checks[existingIndex].value = e.target.checked;
                    } else {
                      checks.push({
                        name: "batteryWarningLight",
                        value: e.target.checked,
                      });
                    }

                    newData.electricalElectronics.computerCheckUp.booleanChecks =
                      checks;
                    return newData;
                  });
                }}
              />
            </div>

            <div>
              <label>Oil Pressure Low Warning Light</label>
              <input
                type="checkbox"
                checked={
                  formData.electricalElectronics.computerCheckUp.booleanChecks.find(
                    (check) => check.name === "oilPressureLowWarningLight"
                  )?.value || false
                }
                onChange={(e) => {
                  setFormData((prev) => {
                    const newData = { ...prev };
                    const checks = [
                      ...newData.electricalElectronics.computerCheckUp
                        .booleanChecks,
                    ];
                    const existingIndex = checks.findIndex(
                      (check) => check.name === "oilPressureLowWarningLight"
                    );

                    if (existingIndex >= 0) {
                      checks[existingIndex].value = e.target.checked;
                    } else {
                      checks.push({
                        name: "oilPressureLowWarningLight",
                        value: e.target.checked,
                      });
                    }

                    newData.electricalElectronics.computerCheckUp.booleanChecks =
                      checks;
                    return newData;
                  });
                }}
              />
            </div>

            <div>
              <label>Temperature Warning Light</label>
              <input
                type="checkbox"
                checked={
                  formData.electricalElectronics.computerCheckUp.booleanChecks.find(
                    (check) => check.name === "temperatureWarningLight"
                  )?.value || false
                }
                onChange={(e) => {
                  setFormData((prev) => {
                    const newData = { ...prev };
                    const checks = [
                      ...newData.electricalElectronics.computerCheckUp
                        .booleanChecks,
                    ];
                    const existingIndex = checks.findIndex(
                      (check) => check.name === "temperatureWarningLight"
                    );

                    if (existingIndex >= 0) {
                      checks[existingIndex].value = e.target.checked;
                    } else {
                      checks.push({
                        name: "temperatureWarningLight",
                        value: e.target.checked,
                      });
                    }

                    newData.electricalElectronics.computerCheckUp.booleanChecks =
                      checks;
                    return newData;
                  });
                }}
              />
            </div>

            <div>
              <label>Air Bag Warning Light</label>
              <input
                type="checkbox"
                checked={
                  formData.electricalElectronics.computerCheckUp.booleanChecks.find(
                    (check) => check.name === "airBagWarningLight"
                  )?.value || false
                }
                onChange={(e) => {
                  setFormData((prev) => {
                    const newData = { ...prev };
                    const checks = [
                      ...newData.electricalElectronics.computerCheckUp
                        .booleanChecks,
                    ];
                    const existingIndex = checks.findIndex(
                      (check) => check.name === "airBagWarningLight"
                    );

                    if (existingIndex >= 0) {
                      checks[existingIndex].value = e.target.checked;
                    } else {
                      checks.push({
                        name: "airBagWarningLight",
                        value: e.target.checked,
                      });
                    }

                    newData.electricalElectronics.computerCheckUp.booleanChecks =
                      checks;
                    return newData;
                  });
                }}
              />
            </div>

            <div>
              <label>Power Steering Warning Light</label>
              <input
                type="checkbox"
                checked={
                  formData.electricalElectronics.computerCheckUp.booleanChecks.find(
                    (check) => check.name === "powerSteeringWarningLight"
                  )?.value || false
                }
                onChange={(e) => {
                  setFormData((prev) => {
                    const newData = { ...prev };
                    const checks = [
                      ...newData.electricalElectronics.computerCheckUp
                        .booleanChecks,
                    ];
                    const existingIndex = checks.findIndex(
                      (check) => check.name === "powerSteeringWarningLight"
                    );

                    if (existingIndex >= 0) {
                      checks[existingIndex].value = e.target.checked;
                    } else {
                      checks.push({
                        name: "powerSteeringWarningLight",
                        value: e.target.checked,
                      });
                    }

                    newData.electricalElectronics.computerCheckUp.booleanChecks =
                      checks;
                    return newData;
                  });
                }}
              />
            </div>

            <div>
              <label>ABS Warning Light</label>
              <input
                type="checkbox"
                checked={
                  formData.electricalElectronics.computerCheckUp.booleanChecks.find(
                    (check) => check.name === "absWarningLight"
                  )?.value || false
                }
                onChange={(e) => {
                  setFormData((prev) => {
                    const newData = { ...prev };
                    const checks = [
                      ...newData.electricalElectronics.computerCheckUp
                        .booleanChecks,
                    ];
                    const existingIndex = checks.findIndex(
                      (check) => check.name === "absWarningLight"
                    );

                    if (existingIndex >= 0) {
                      checks[existingIndex].value = e.target.checked;
                    } else {
                      checks.push({
                        name: "absWarningLight",
                        value: e.target.checked,
                      });
                    }

                    newData.electricalElectronics.computerCheckUp.booleanChecks =
                      checks;
                    return newData;
                  });
                }}
              />
            </div>

            <div>
              <label>Key Fob Battery Low Light</label>
              <input
                type="checkbox"
                checked={
                  formData.electricalElectronics.computerCheckUp.booleanChecks.find(
                    (check) => check.name === "keyFobBatteryLowLight"
                  )?.value || false
                }
                onChange={(e) => {
                  setFormData((prev) => {
                    const newData = { ...prev };
                    const checks = [
                      ...newData.electricalElectronics.computerCheckUp
                        .booleanChecks,
                    ];
                    const existingIndex = checks.findIndex(
                      (check) => check.name === "keyFobBatteryLowLight"
                    );

                    if (existingIndex >= 0) {
                      checks[existingIndex].value = e.target.checked;
                    } else {
                      checks.push({
                        name: "keyFobBatteryLowLight",
                        value: e.target.checked,
                      });
                    }

                    newData.electricalElectronics.computerCheckUp.booleanChecks =
                      checks;
                    return newData;
                  });
                }}
              />
            </div>
          </div>

          <div>
            <h3>Battery</h3>

            <div>
              <label>Battery Voltage</label>
              <input
                type="number"
                value={formData.electricalElectronics.battery.battery || ""}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    electricalElectronics: {
                      ...prev.electricalElectronics,
                      battery: {
                        ...prev.electricalElectronics.battery,
                        battery: parseFloat(e.target.value),
                      },
                    },
                  }));
                }}
                required
              />
            </div>

            <div>
              <label>Terminal Condition</label>
              <input
                type="checkbox"
                checked={
                  formData.electricalElectronics.battery.booleanChecks.find(
                    (check) => check.name === "terminalCondition"
                  )?.value || false
                }
                onChange={(e) => {
                  setFormData((prev) => {
                    const newData = { ...prev };
                    const checks = [
                      ...newData.electricalElectronics.battery.booleanChecks,
                    ];
                    const existingIndex = checks.findIndex(
                      (check) => check.name === "terminalCondition"
                    );

                    if (existingIndex >= 0) {
                      checks[existingIndex].value = e.target.checked;
                    } else {
                      checks.push({
                        name: "terminalCondition",
                        value: e.target.checked,
                      });
                    }

                    newData.electricalElectronics.battery.booleanChecks =
                      checks;
                    return newData;
                  });
                }}
              />
            </div>

            <div>
              <label>Charging</label>
              <input
                type="checkbox"
                checked={
                  formData.electricalElectronics.battery.booleanChecks.find(
                    (check) => check.name === "charging"
                  )?.value || false
                }
                onChange={(e) => {
                  setFormData((prev) => {
                    const newData = { ...prev };
                    const checks = [
                      ...newData.electricalElectronics.battery.booleanChecks,
                    ];
                    const existingIndex = checks.findIndex(
                      (check) => check.name === "charging"
                    );

                    if (existingIndex >= 0) {
                      checks[existingIndex].value = e.target.checked;
                    } else {
                      checks.push({
                        name: "charging",
                        value: e.target.checked,
                      });
                    }

                    newData.electricalElectronics.battery.booleanChecks =
                      checks;
                    return newData;
                  });
                }}
              />
            </div>

            <div>
              <label>Alternator Operation</label>
              <input
                type="file"
                onChange={(e) =>
                  handleImageChange(
                    e,
                    "electricalElectronics",
                    "battery",
                    "alternatorOperation"
                  )
                }
                accept="image/*"
                required
              />
              <input
                type="text"
                value={
                  formData.electricalElectronics.battery.alternatorOperation
                    ?.value || ""
                }
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    electricalElectronics: {
                      ...prev.electricalElectronics,
                      battery: {
                        ...prev.electricalElectronics.battery,
                        alternatorOperation: {
                          ...prev.electricalElectronics.battery
                            .alternatorOperation,
                          value: e.target.value,
                        },
                      },
                    },
                  }));
                }}
                required
              />
            </div>
          </div>
      </section>
      <button onClick={() => changeStep()}>Next</button>
    </>
  );
    };

export default ElectricalElectronics;
