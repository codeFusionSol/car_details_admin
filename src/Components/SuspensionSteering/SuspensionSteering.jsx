const SuspensionSteering = ({ formData, setFormData }) => {
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
          <h2>Suspension & Steering</h2>

          <h3>Front Suspension</h3>
          <div>
            <label>Steering Wheel Play</label>
            <input
              type="text"
              value={
                formData.suspensionSteering.frontSuspension.steeringWheelPlay
              }
              onChange={(e) =>
                handleInputChange(
                  e,
                  "suspensionSteering",
                  "frontSuspension",
                  "steeringWheelPlay"
                )
              }
              required
            />
          </div>

          {[
            "rightBallJoint",
            "leftBallJoint",
            "rightZLinks",
            "leftZLinks",
            "rightTieRodEnd",
            "leftTieRodEnd",
            "frontRightBoots",
            "frontLeftBoots",
            "frontRightBushes",
            "frontLeftBushes",
            "frontRightShock",
            "frontLeftShock",
          ].map((item) => (
            <div key={item}>
              <h4>{item}</h4>
              <label>Image</label>
              <input
                type="file"
                onChange={(e) =>
                  handleImageChange(
                    e,
                    "suspensionSteering",
                    "frontSuspension",
                    item
                  )
                }
                accept="image/*"
                required
              />
              <label>Value</label>
              <input
                type="text"
                value={
                  formData.suspensionSteering.frontSuspension.imageValueChecks.find(
                    (check) => check.name === item
                  )?.data?.value || ""
                }
                onChange={(e) => {
                  const newChecks = [
                    ...formData.suspensionSteering.frontSuspension
                      .imageValueChecks,
                  ];
                  const existingIndex = newChecks.findIndex(
                    (check) => check.name === item
                  );
                  if (existingIndex >= 0) {
                    newChecks[existingIndex].data.value = e.target.value;
                  } else {
                    newChecks.push({
                      name: item,
                      data: {
                        image: { url: "", public_id: "" },
                        value: e.target.value,
                      },
                    });
                  }
                  setFormData((prev) => ({
                    ...prev,
                    suspensionSteering: {
                      ...prev.suspensionSteering,
                      frontSuspension: {
                        ...prev.suspensionSteering.frontSuspension,
                        imageValueChecks: newChecks,
                      },
                    },
                  }));
                }}
                required
              />
            </div>
          ))}

          <h3>Rear Suspension</h3>
          {[
            "rearRightBushes",
            "rearLeftBushes",
            "rearRightShock",
            "rearLeftShock",
          ].map((item) => (
            <div key={item}>
              <h4>{item}</h4>
              <label>Image</label>
              <input
                type="file"
                onChange={(e) =>
                  handleImageChange(
                    e,
                    "suspensionSteering",
                    "rearSuspension",
                    item
                  )
                }
                accept="image/*"
                required
              />
              <label>Value</label>
              <input
                type="text"
                value={
                  formData.suspensionSteering.rearSuspension.imageValueChecks.find(
                    (check) => check.name === item
                  )?.data?.value || ""
                }
                onChange={(e) => {
                  const newChecks = [
                    ...formData.suspensionSteering.rearSuspension
                      .imageValueChecks,
                  ];
                  const existingIndex = newChecks.findIndex(
                    (check) => check.name === item
                  );
                  if (existingIndex >= 0) {
                    newChecks[existingIndex].data.value = e.target.value;
                  } else {
                    newChecks.push({
                      name: item,
                      data: {
                        image: { url: "", public_id: "" },
                        value: e.target.value,
                      },
                    });
                  }
                  setFormData((prev) => ({
                    ...prev,
                    suspensionSteering: {
                      ...prev.suspensionSteering,
                      rearSuspension: {
                        ...prev.suspensionSteering.rearSuspension,
                        imageValueChecks: newChecks,
                      },
                    },
                  }));
                }}
                required
              />
            </div>
          ))}
        </section>
    </>
  );
    };

export default SuspensionSteering;