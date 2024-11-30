import { useDispatch } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";

const Interior = ({ formData, setFormData }) => {
  const dispatch = useDispatch();

  const changeStep = () => {
    dispatch(changeStepSuccess(7));
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
        <h2>Interior</h2>

        <h3>Steering Controls</h3>
        <div>
          <label>Steering Wheel Condition</label>
          <input
            type="file"
            onChange={(e) =>
              handleImageChange(
                e,
                "interior",
                "steeringControls",
                "steeringWheelCondition"
              )
            }
            accept="image/*"
            required
          />
          <input
            type="text"
            value={
              formData.interior.steeringControls.steeringWheelCondition
                ?.value || ""
            }
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                interior: {
                  ...prev.interior,
                  steeringControls: {
                    ...prev.interior.steeringControls,
                    steeringWheelCondition: {
                      ...prev.interior.steeringControls.steeringWheelCondition,
                      value: e.target.value,
                    },
                  },
                },
              }));
            }}
            required
          />
        </div>

        <div>
          <label>Wiper Washer Lever</label>
          <input
            type="file"
            onChange={(e) =>
              handleImageChange(
                e,
                "interior",
                "steeringControls",
                "wiperWasherLever"
              )
            }
            accept="image/*"
            required
          />
          <input
            type="text"
            value={
              formData.interior.steeringControls.wiperWasherLever?.value || ""
            }
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                interior: {
                  ...prev.interior,
                  steeringControls: {
                    ...prev.interior.steeringControls,
                    wiperWasherLever: {
                      ...prev.interior.steeringControls.wiperWasherLever,
                      value: e.target.value,
                    },
                  },
                },
              }));
            }}
            required
          />
        </div>

        {["horn", "lightsLeverSwitch"].map((item) => (
          <div key={item}>
            <label>{item}</label>
            <input
              type="checkbox"
              checked={
                formData.interior.steeringControls.booleanChecks.find(
                  (check) => check.name === item
                )?.value || false
              }
              onChange={(e) => {
                const newChecks = [
                  ...formData.interior.steeringControls.booleanChecks,
                ];
                const existingIndex = newChecks.findIndex(
                  (check) => check.name === item
                );
                if (existingIndex >= 0) {
                  newChecks[existingIndex].value = e.target.checked;
                } else {
                  newChecks.push({
                    name: item,
                    value: e.target.checked,
                  });
                }
                setFormData((prev) => ({
                  ...prev,
                  interior: {
                    ...prev.interior,
                    steeringControls: {
                      ...prev.interior.steeringControls,
                      booleanChecks: newChecks,
                    },
                  },
                }));
              }}
              required
            />
          </div>
        ))}

        <h3>Mirrors</h3>
        {["rightSideMirror", "leftSideMirror"].map((item) => (
          <div key={item}>
            <label>{item}</label>
            <input
              type="checkbox"
              checked={
                formData.interior.mirrors.booleanChecks.find(
                  (check) => check.name === item
                )?.value || false
              }
              onChange={(e) => {
                const newChecks = [...formData.interior.mirrors.booleanChecks];
                const existingIndex = newChecks.findIndex(
                  (check) => check.name === item
                );
                if (existingIndex >= 0) {
                  newChecks[existingIndex].value = e.target.checked;
                } else {
                  newChecks.push({
                    name: item,
                    value: e.target.checked,
                  });
                }
                setFormData((prev) => ({
                  ...prev,
                  interior: {
                    ...prev.interior,
                    mirrors: {
                      ...prev.interior.mirrors,
                      booleanChecks: newChecks,
                    },
                  },
                }));
              }}
              required
            />
          </div>
        ))}

        <div>
          <label>Rear View Mirror Dimmer</label>
          <input
            type="text"
            value={formData.interior.mirrors.rearViewMirrorDimmer || ""}
            onChange={(e) =>
              handleInputChange(
                e,
                "interior",
                "mirrors",
                "rearViewMirrorDimmer"
              )
            }
            required
          />
        </div>

        <h3>Seats</h3>
        {[
          "rightSeatAdjusterRecliner",
          "leftSeatAdjusterRecliner",
          "rightSeatAdjusterLearTrack",
          "leftSeatAdjusterLearTrack",
          "rightSeatBelt",
          "leftSeatBelt",
          "rearSeatBelt",
        ].map((item) => (
          <div key={item}>
            <label>{item}</label>
            <input
              type="checkbox"
              checked={
                formData.interior.seats.booleanChecks.find(
                  (check) => check.name === item
                )?.value || false
              }
              onChange={(e) => {
                const newChecks = [...formData.interior.seats.booleanChecks];
                const existingIndex = newChecks.findIndex(
                  (check) => check.name === item
                );
                if (existingIndex >= 0) {
                  newChecks[existingIndex].value = e.target.checked;
                } else {
                  newChecks.push({
                    name: item,
                    value: e.target.checked,
                  });
                }
                setFormData((prev) => ({
                  ...prev,
                  interior: {
                    ...prev.interior,
                    seats: {
                      ...prev.interior.seats,
                      booleanChecks: newChecks,
                    },
                  },
                }));
              }}
              required
            />
          </div>
        ))}

        <div>
          <label>Glove Box</label>
          <input
            type="file"
            onChange={(e) =>
              handleImageChange(e, "interior", "seats", "gloveBox")
            }
            accept="image/*"
            required
          />
          <input
            type="text"
            value={formData.interior.seats.gloveBox?.value || ""}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                interior: {
                  ...prev.interior,
                  seats: {
                    ...prev.interior.seats,
                    gloveBox: {
                      ...prev.interior.seats.gloveBox,
                      value: e.target.value,
                    },
                  },
                },
              }));
            }}
            required
          />
        </div>

        <h3>Power and Central Locking</h3>
        {[
          "frontRightPowerWindowLever",
          "frontLeftPowerWindowLever",
          "rearRightPowerWindowLever",
          "rearLeftPowerWindowLever",
          "autoLockButton",
          "windowSafetyLock",
        ].map((item) => (
          <div key={item}>
            <label>{item}</label>
            <input
              type="checkbox"
              checked={
                formData.interior.powerAndCentralLocking.booleanChecks.find(
                  (check) => check.name === item
                )?.value || false
              }
              onChange={(e) => {
                const newChecks = [
                  ...formData.interior.powerAndCentralLocking.booleanChecks,
                ];
                const existingIndex = newChecks.findIndex(
                  (check) => check.name === item
                );
                if (existingIndex >= 0) {
                  newChecks[existingIndex].value = e.target.checked;
                } else {
                  newChecks.push({
                    name: item,
                    value: e.target.checked,
                  });
                }
                setFormData((prev) => ({
                  ...prev,
                  interior: {
                    ...prev.interior,
                    powerAndCentralLocking: {
                      ...prev.interior.powerAndCentralLocking,
                      booleanChecks: newChecks,
                    },
                  },
                }));
              }}
              required
            />
          </div>
        ))}

        <h3>Dash & Roof Controls</h3>
        {[
          "interiorLightings",
          "dashControlsAC",
          "dashControlsDeFog",
          "dashontrolsHazzardLights",
          "audioVideo",
          "trunkReleaseLever",
          "fuelCapReleaseLever",
          "bonnetReleaseLever",
        ].map((item) => (
          <div key={item}>
            <label>{item}</label>
            <input
              type="checkbox"
              checked={
                formData.interior.dashRoofControls.booleanChecks.find(
                  (check) => check.name === item
                )?.value || false
              }
              onChange={(e) => {
                const newChecks = [
                  ...formData.interior.dashRoofControls.booleanChecks,
                ];
                const existingIndex = newChecks.findIndex(
                  (check) => check.name === item
                );
                if (existingIndex >= 0) {
                  newChecks[existingIndex].value = e.target.checked;
                } else {
                  newChecks.push({
                    name: item,
                    value: e.target.checked,
                  });
                }
                setFormData((prev) => ({
                  ...prev,
                  interior: {
                    ...prev.interior,
                    dashRoofControls: {
                      ...prev.interior.dashRoofControls,
                      booleanChecks: newChecks,
                    },
                  },
                }));
              }}
              required
            />
          </div>
        ))}

        <h3>Poshish</h3>
        {[
          "roofPoshish",
          "floorMat",
          "frontRightSeatPoshish",
          "frontleftSeatPoshish",
          "rearSeatPoshish",
          "dashboardCondition",
        ].map((item) => (
          <div key={item}>
            <label>{item}</label>
            <input
              type="file"
              onChange={(e) =>
                handleImageChange(e, "interior", "poshish", item)
              }
              accept="image/*"
              required
            />
            <input
              type="text"
              value={
                formData.interior.poshish.imageValueChecks.find(
                  (check) => check.name === item
                )?.data?.value || ""
              }
              onChange={(e) => {
                const newChecks = [
                  ...formData.interior.poshish.imageValueChecks,
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
                  interior: {
                    ...prev.interior,
                    poshish: {
                      ...prev.interior.poshish,
                      imageValueChecks: newChecks,
                    },
                  },
                }));
              }}
              required
            />
          </div>
        ))}

        <h3>Equipment</h3>
        <div>
          <label>Spare Tire</label>
          <input
            type="file"
            onChange={(e) =>
              handleImageChange(e, "interior", "equipment", "spareTire")
            }
            accept="image/*"
            required
          />
          <input
            type="text"
            value={formData.interior.equipment.spareTire?.value || ""}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                interior: {
                  ...prev.interior,
                  equipment: {
                    ...prev.interior.equipment,
                    spareTire: {
                      ...prev.interior.equipment.spareTire,
                      value: e.target.value,
                    },
                  },
                },
              }));
            }}
            required
          />
        </div>

        <div>
          <label>Jack</label>
          <input
            type="text"
            value={formData.interior.equipment.jack || ""}
            onChange={(e) =>
              handleInputChange(e, "interior", "equipment", "jack")
            }
            required
          />
        </div>

        <div>
          <label>Tools</label>
          <input
            type="file"
            onChange={(e) =>
              handleImageChange(e, "interior", "equipment", "tools")
            }
            accept="image/*"
            required
          />
          <input
            type="text"
            value={formData.interior.equipment.tools?.value || ""}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                interior: {
                  ...prev.interior,
                  equipment: {
                    ...prev.interior.equipment,
                    tools: {
                      ...prev.interior.equipment.tools,
                      value: e.target.value,
                    },
                  },
                },
              }));
            }}
            required
          />
        </div>
      </section>
      <button onClick={() => changeStep()}>Next</button>
    </>
  );
};

export default Interior;
