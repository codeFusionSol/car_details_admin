import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../utils/url";

const api = axios.create({
  baseURL: url,
});

const Form = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 12;

  const [formData, setFormData] = useState({
    carDetails: {
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
    },
    vehicleInspectionReport: {
      ratings: [],
    },
    bodyFrameAccidentChecklist: {
      imageValueChecks: [],
      booleanChecks: [
        { name: "rightAPillar", value: false },
        { name: "leftAPillar", value: false },
        { name: "rightBPillar", value: false },
        { name: "leftBPillar", value: false },
        { name: "rightCPillar", value: false },
        { name: "leftCPillar", value: false },
      ],
    },
    engineTransmissionClutch: {
      fluidsFiltersCheck: {
        imageValueChecks: [],
        stringChecks: [],
      },
      mechanicalCheck: {
        imageValueChecks: [],
        stringChecks: [],
        engineMounts: false,
      },
      exhaustCheck: {
        exhaustSound: false,
      },
      engineCoolingSystem: {
        radiator: false,
        suctionFan: "",
      },
      transmissionCheck: {
        starterOperation: false,
      },
    },
    brakes: {
      mechanicalCheck: {
        stringChecks: [],
        parkingHandBrake: {
          image: { url: "", public_id: "" },
          value: "",
        },
      },
    },
    suspensionSteering: {
      frontSuspension: {
        steeringWheelPlay: "",
        imageValueChecks: [],
      },
      rearSuspension: {
        imageValueChecks: [],
      },
    },
    interior: {
      steeringControls: {
        steeringWheelCondition: {
          image: { url: "", public_id: "" },
          value: "",
        },
        wiperWasherLever: {
          image: { url: "", public_id: "" },
          value: "",
        },
        booleanChecks: [
          { name: "horn", value: false },
          { name: "lightsLeverSwitch", value: false },
        ],
      },
      mirrors: {
        booleanChecks: [
          { name: "leftSideMirror", value: false },
          { name: "rightSideMirror", value: false },
        ],
        rearViewMirrorDimmer: "",
      },
      seats: {
        booleanChecks: [
          { name: "rightSeatAdjusterRecliner", value: false },
          { name: "leftSeatAdjusterRecliner", value: false },
          { name: "rightSeatAdjusterLearTrack", value: false },
          { name: "leftSeatAdjusterLearTrack", value: false },
          { name: "rightSeatBelt", value: false },
          { name: "leftSeatBelt", value: false },
          { name: "rearSeatBelt", value: false },
        ],
        gloveBox: {
          image: { url: "", public_id: "" },
          value: "",
        },
      },
      powerAndCentralLocking: {
        booleanChecks: [
          { name: "frontRightPowerWindowLever", value: false },
          { name: "frontLeftPowerWindowLever", value: false },
          { name: "rearRightPowerWindowLever", value: false },
          { name: "rearLeftPowerWindowLever", value: false },
          { name: "autoLockButton", value: false },
          { name: "windowSafetyLock", value: false },
        ],
      },
      dashRoofControls: {
        booleanChecks: [
          { name: "interiorLightings", value: false },
          { name: "dashControlsAC", value: false },
          { name: "dashControlsDeFog", value: false },
          { name: "dashontrolsHazzardLights", value: false },
          { name: "audioVideo", value: false },
          { name: "trunkReleaseLever", value: false },
          { name: "fuelCapReleaseLever", value: false },
          { name: "bonnetReleaseLeve", value: false },
        ],
      },
      poshish: {
        imageValueChecks: [],
      },
      equipment: {
        spareTire: {
          image: { url: "", public_id: "" },
          value: "",
        },
        jack: "",
        tools: {
          image: { url: "", public_id: "" },
          value: "",
        },
      },
    },
    acHeater: {
      acHeaterCheckUp: {
        booleanChecks: [
          { name: "acFitted", value: false },
          { name: "acOperational", value: false },
        ],
        stringChecks: [],
      },
    },
    electricalElectronics: {
      computerCheckUp: {
        imageValueChecks: [],
        booleanChecks: [
          { name: "batteryWarningLight", value: false },
          { name: "oilPressureLowWarningLight", value: false },
          { name: "temperatureWarningLight", value: false },
          { name: "airBagWarningLight", value: false },
          { name: "powerSteeringWarningLight", value: false },
          { name: "absWarningLight", value: false },
          { name: "keyFobBatteryLowLight", value: false },
        ],
      },
      battery: {
        battery: 0,
        booleanChecks: [
          { name: "terminalCondition", value: false },
          { name: "charging", value: false },
        ],
        alternatorOperation: {
          image: { url: "", public_id: "" },
          value: "",
        },
      },
    },
    exteriorBody: {
      carFrame: {
        imageValueChecks: [],
        booleanChecks: [
          { name: "frontRightDoorWindow", value: false },
          { name: "frontLeftDoorWindow", value: false },
          { name: "rearRightDoorWindow", value: false },
          { name: "rearLeftDoorWindow", value: false },
          { name: "trunkLock", value: false },
        ],
      },
      exteriorLights: {
        imageValueChecks: [],
        booleanChecks: [
          { name: "rightTaillightWorking", value: false },
          { name: "leftTaillightWorking", value: false },
        ],
      },
    },
    tyres: {
      tyres: {
        booleanChecks: [
          { name: "frontRightTyreBrand", value: false },
          { name: "frontLeftTyreBrand", value: false },
          { name: "rearRightTyreBrand", value: false },
          { name: "rearLeftTyreBrand", value: false },
        ],
        imageValueChecks: [],
        tyreSize: "",
        rims: "",
      },
    },
    pictures: [],
    comments: "",
    disclaimer: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/car/add", formData);
      if (response.data.success) {
        alert("Car added successfully!");
      }
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Error adding car");
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <form onSubmit={handleSubmit} className="car-inspection-form">
      {currentStep === 0 && (
        <section>
          <h2>Car Details</h2>
          <div>
            <label>Car Image</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, "carDetails")}
              accept="image/*"
              required
            />
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={formData.carDetails.name}
              onChange={(e) => handleInputChange(e, "carDetails", "name")}
              required
            />
          </div>
          <div>
            <label>Overall Rating</label>
            <input
              type="number"
              min="0"
              max="10"
              value={formData.carDetails.overallRating}
              onChange={(e) =>
                handleInputChange(e, "carDetails", "overallRating")
              }
              required
            />
          </div>
          <div>
            <label>Mileage</label>
            <input
              type="number"
              min="0"
              value={formData.carDetails.mileage}
              onChange={(e) => handleInputChange(e, "carDetails", "mileage")}
              required
            />
          </div>
          <div>
            <label>Inspection Date</label>
            <input
              type="date"
              value={formData.carDetails.inspectionDate}
              onChange={(e) =>
                handleInputChange(e, "carDetails", "inspectionDate")
              }
              required
            />
          </div>
          <div>
            <label>Engine Number</label>
            <input
              type="text"
              value={formData.carDetails.engineNo}
              onChange={(e) => handleInputChange(e, "carDetails", "engineNo")}
              required
            />
          </div>
          <div>
            <label>Transmission Type</label>
            <select
              value={formData.carDetails.transmissionType}
              onChange={(e) =>
                handleInputChange(e, "carDetails", "transmissionType")
              }
              required
            >
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
              <option value="CVT">CVT</option>
            </select>
          </div>
          <div>
            <label>CNG Installed</label>
            <input
              type="checkbox"
              checked={formData.carDetails.cngInstall}
              onChange={(e) => handleInputChange(e, "carDetails", "cngInstall")}
            />
          </div>
          <div>
            <label>Engine Capacity (CC)</label>
            <input
              type="number"
              min="0"
              value={formData.carDetails.engineCapacity}
              onChange={(e) =>
                handleInputChange(e, "carDetails", "engineCapacity")
              }
              required
            />
          </div>
          <div>
            <label>Chassis Number</label>
            <input
              type="text"
              value={formData.carDetails.chassisNo}
              onChange={(e) => handleInputChange(e, "carDetails", "chassisNo")}
              required
            />
          </div>
          <div>
            <label>Registered City</label>
            <input
              type="text"
              value={formData.carDetails.registeredCity}
              onChange={(e) =>
                handleInputChange(e, "carDetails", "registeredCity")
              }
              required
            />
          </div>
          <div>
            <label>Registered Year</label>
            <input
              type="number"
              value={formData.carDetails.registeredYear}
              onChange={(e) =>
                handleInputChange(e, "carDetails", "registeredYear")
              }
              required
            />
          </div>
          <div>
            <label>Drive Type</label>
            <select
              value={formData.carDetails.driveType}
              onChange={(e) => handleInputChange(e, "carDetails", "driveType")}
              required
            >
              <option value="FWD">FWD</option>
              <option value="RWD">RWD</option>
              <option value="AWD">AWD</option>
              <option value="4WD">4WD</option>
            </select>
          </div>
          <div>
            <label>Registration Number</label>
            <input
              type="text"
              value={formData.carDetails.registrationNo}
              onChange={(e) =>
                handleInputChange(e, "carDetails", "registrationNo")
              }
              required
            />
          </div>
          <div>
            <label>Color</label>
            <input
              type="text"
              value={formData.carDetails.colour}
              onChange={(e) => handleInputChange(e, "carDetails", "colour")}
              required
            />
          </div>
        </section>
      )}

      {currentStep === 1 && (
        <section>
          <h2>Vehicle Inspection Report</h2>
          {[
            "acHeater",
            "engineTransmissionClutch",
            "exterior",
            "skeleton",
            "accidentChecklist",
            "brakes",
            "suspensionSteering",
            "interior",
            "electricalElectronics",
            "tyres",
          ].map((item, index) => (
            <div key={index}>
              <label>{item}</label>
              <input
                type="number"
                min="0"
                max="100"
                value={
                  formData.vehicleInspectionReport.ratings.find(
                    (r) => r.name === item
                  )?.value || 0
                }
                onChange={(e) => {
                  const newRatings = [
                    ...formData.vehicleInspectionReport.ratings,
                  ];
                  const existingIndex = newRatings.findIndex(
                    (r) => r.name === item
                  );
                  if (existingIndex >= 0) {
                    newRatings[existingIndex].value = Number(e.target.value);
                  } else {
                    newRatings.push({
                      name: item,
                      value: Number(e.target.value),
                    });
                  }
                  setFormData((prev) => ({
                    ...prev,
                    vehicleInspectionReport: { ratings: newRatings },
                  }));
                }}
                required
              />
            </div>
          ))}
        </section>
      )}

      {currentStep === 2 && (
        <section>
          <h2>Body Frame & Accident Checklist</h2>

          <h3>Image Value Checks</h3>
          {[
            "radiatorCoreSupport",
            "rightStrutTowerApon",
            "leftStrutTowerApon",
            "rightFrontRail",
            "leftFrontRail",
            "cowlPanelFirewall",
            "bootFloor",
            "bootLockPillar",
            "rearSubFrame",
            "frontSubFrame",
          ].map((item, index) => (
            <div key={index}>
              <label>{item}</label>
              <input
                type="file"
                onChange={(e) =>
                  handleImageChange(
                    e,
                    "bodyFrameAccidentChecklist",
                    "imageValueChecks",
                    item
                  )
                }
                accept="image/*"
                required
              />
              <input
                type="text"
                value={
                  formData.bodyFrameAccidentChecklist.imageValueChecks.find(
                    (check) => check.name === item
                  )?.data?.value || ""
                }
                onChange={(e) => {
                  const newChecks = [
                    ...formData.bodyFrameAccidentChecklist.imageValueChecks,
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
                    bodyFrameAccidentChecklist: {
                      ...prev.bodyFrameAccidentChecklist,
                      imageValueChecks: newChecks,
                    },
                  }));
                }}
                required
              />
            </div>
          ))}

          <h3>Pillar Checks</h3>
          {[
            "rightAPillar",
            "leftAPillar",
            "rightBPillar",
            "leftBPillar",
            "rightCPillar",
            "leftCPillar",
          ].map((item, index) => (
            <div key={index}>
              <label>{item}</label>
              <input
                type="checkbox"
                checked={
                  formData.bodyFrameAccidentChecklist.booleanChecks.find(
                    (check) => check.name === item
                  )?.value || false
                }
                onChange={(e) => {
                  const newChecks = [
                    ...formData.bodyFrameAccidentChecklist.booleanChecks,
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
                    bodyFrameAccidentChecklist: {
                      ...prev.bodyFrameAccidentChecklist,
                      booleanChecks: newChecks,
                    },
                  }));
                }}
                required
              />
            </div>
          ))}
        </section>
      )}

      {currentStep === 3 && (
        <section>
          <h2>Engine, Transmission & Clutch</h2>

          <h3>Fluids & Filters Check</h3>
          {["engineOilLevel", "engineOilLeakage", "transmissionOilLeakage"].map(
            (item, index) => (
              <div key={index}>
                <label>{item}</label>
                <input
                  type="file"
                  onChange={(e) =>
                    handleImageChange(
                      e,
                      "engineTransmissionClutch",
                      "fluidsFiltersCheck",
                      item
                    )
                  }
                  accept="image/*"
                />
                <input
                  type="text"
                  value={
                    formData.engineTransmissionClutch.fluidsFiltersCheck.imageValueChecks.find(
                      (check) => check.name === item
                    )?.data?.value || ""
                  }
                  onChange={(e) => {
                    const newChecks = [
                      ...formData.engineTransmissionClutch.fluidsFiltersCheck
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
                      engineTransmissionClutch: {
                        ...prev.engineTransmissionClutch,
                        fluidsFiltersCheck: {
                          ...prev.engineTransmissionClutch.fluidsFiltersCheck,
                          imageValueChecks: newChecks,
                        },
                      },
                    }));
                  }}
                  required
                />
              </div>
            )
          )}

          {["coolantLeakage", "brakeOilLeakage"].map((item, index) => (
            <div key={index}>
              <label>{item}</label>
              <input
                type="text"
                value={
                  formData.engineTransmissionClutch.fluidsFiltersCheck.stringChecks.find(
                    (check) => check.name === item
                  )?.value || ""
                }
                onChange={(e) => {
                  const newChecks = [
                    ...formData.engineTransmissionClutch.fluidsFiltersCheck
                      .stringChecks,
                  ];
                  const existingIndex = newChecks.findIndex(
                    (check) => check.name === item
                  );
                  if (existingIndex >= 0) {
                    newChecks[existingIndex].value = e.target.value;
                  } else {
                    newChecks.push({
                      name: item,
                      value: e.target.value,
                    });
                  }
                  setFormData((prev) => ({
                    ...prev,
                    engineTransmissionClutch: {
                      ...prev.engineTransmissionClutch,
                      fluidsFiltersCheck: {
                        ...prev.engineTransmissionClutch.fluidsFiltersCheck,
                        stringChecks: newChecks,
                      },
                    },
                  }));
                }}
                required
              />
            </div>
          ))}

          <h3>Mechanical Check</h3>
          {["wires", "hoses"].map((item, index) => (
            <div key={index}>
              <label>{item}</label>
              <input
                type="file"
                onChange={(e) =>
                  handleImageChange(
                    e,
                    "engineTransmissionClutch",
                    "mechanicalCheck",
                    item
                  )
                }
                accept="image/*"
              />
              <input
                type="text"
                value={
                  formData.engineTransmissionClutch.mechanicalCheck.imageValueChecks.find(
                    (check) => check.name === item
                  )?.data?.value || ""
                }
                onChange={(e) => {
                  const newChecks = [
                    ...formData.engineTransmissionClutch.mechanicalCheck
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
                    engineTransmissionClutch: {
                      ...prev.engineTransmissionClutch,
                      mechanicalCheck: {
                        ...prev.engineTransmissionClutch.mechanicalCheck,
                        imageValueChecks: newChecks,
                      },
                    },
                  }));
                }}
                required
              />
            </div>
          ))}

          {["engineBlow", "engineNoise", "engineVibration"].map(
            (item, index) => (
              <div key={index}>
                <label>{item}</label>
                <input
                  type="text"
                  value={
                    formData.engineTransmissionClutch.mechanicalCheck.stringChecks.find(
                      (check) => check.name === item
                    )?.value || ""
                  }
                  onChange={(e) => {
                    const newChecks = [
                      ...formData.engineTransmissionClutch.mechanicalCheck
                        .stringChecks,
                    ];
                    const existingIndex = newChecks.findIndex(
                      (check) => check.name === item
                    );
                    if (existingIndex >= 0) {
                      newChecks[existingIndex].value = e.target.value;
                    } else {
                      newChecks.push({
                        name: item,
                        value: e.target.value,
                      });
                    }
                    setFormData((prev) => ({
                      ...prev,
                      engineTransmissionClutch: {
                        ...prev.engineTransmissionClutch,
                        mechanicalCheck: {
                          ...prev.engineTransmissionClutch.mechanicalCheck,
                          stringChecks: newChecks,
                        },
                      },
                    }));
                  }}
                  required
                />
              </div>
            )
          )}

          <div>
            <label>Engine Mounts</label>
            <input
              type="checkbox"
              checked={
                formData.engineTransmissionClutch.mechanicalCheck.engineMounts
              }
              onChange={(e) =>
                handleInputChange(
                  e,
                  "engineTransmissionClutch",
                  "mechanicalCheck",
                  "engineMounts"
                )
              }
              required
            />
          </div>

          <h3>Exhaust Check</h3>
          <div>
            <label>Exhaust Sound</label>
            <input
              type="checkbox"
              checked={
                formData.engineTransmissionClutch.exhaustCheck.exhaustSound
              }
              onChange={(e) =>
                handleInputChange(
                  e,
                  "engineTransmissionClutch",
                  "exhaustCheck",
                  "exhaustSound"
                )
              }
              required
            />
          </div>

          <h3>Engine Cooling System</h3>
          <div>
            <label>Radiator</label>
            <input
              type="checkbox"
              checked={
                formData.engineTransmissionClutch.engineCoolingSystem.radiator
              }
              onChange={(e) =>
                handleInputChange(
                  e,
                  "engineTransmissionClutch",
                  "engineCoolingSystem",
                  "radiator"
                )
              }
              required
            />
          </div>
          <div>
            <label>Suction Fan</label>
            <input
              type="text"
              value={
                formData.engineTransmissionClutch.engineCoolingSystem.suctionFan
              }
              onChange={(e) =>
                handleInputChange(
                  e,
                  "engineTransmissionClutch",
                  "engineCoolingSystem",
                  "suctionFan"
                )
              }
              required
            />
          </div>

          <h3>Transmission Check</h3>
          <div>
            <label>Starter Operation</label>
            <input
              type="checkbox"
              checked={
                formData.engineTransmissionClutch.transmissionCheck
                  .starterOperation
              }
              onChange={(e) =>
                handleInputChange(
                  e,
                  "engineTransmissionClutch",
                  "transmissionCheck",
                  "starterOperation"
                )
              }
              required
            />
          </div>
        </section>
      )}

      {currentStep === 4 && (
        <section>
          <h2>Brakes</h2>

          <h3>Mechanical Check</h3>
          {[
            "frontRightDisc",
            "frontLeftDisc",
            "frontRightBrakePad",
            "frontLeftBrakePad",
          ].map((item, index) => (
            <div key={index}>
              <label>{item}</label>
              <input
                type="text"
                value={
                  formData.brakes.mechanicalCheck.stringChecks.find(
                    (check) => check.name === item
                  )?.value || ""
                }
                onChange={(e) => {
                  const newChecks = [
                    ...formData.brakes.mechanicalCheck.stringChecks,
                  ];
                  const existingIndex = newChecks.findIndex(
                    (check) => check.name === item
                  );
                  if (existingIndex >= 0) {
                    newChecks[existingIndex].value = e.target.value;
                  } else {
                    newChecks.push({
                      name: item,
                      value: e.target.value,
                    });
                  }
                  setFormData((prev) => ({
                    ...prev,
                    brakes: {
                      ...prev.brakes,
                      mechanicalCheck: {
                        ...prev.brakes.mechanicalCheck,
                        stringChecks: newChecks,
                      },
                    },
                  }));
                }}
                required
              />
            </div>
          ))}

          <h3>Parking Hand Brake</h3>
          <div>
            <label>Image</label>
            <input
              type="file"
              onChange={(e) =>
                handleImageChange(
                  e,
                  "brakes",
                  "mechanicalCheck",
                  "parkingHandBrake"
                )
              }
              accept="image/*"
              required
            />
            <label>Value</label>
            <input
              type="text"
              value={
                formData.brakes.mechanicalCheck.parkingHandBrake?.value || ""
              }
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  brakes: {
                    ...prev.brakes,
                    mechanicalCheck: {
                      ...prev.brakes.mechanicalCheck,
                      parkingHandBrake: {
                        ...prev.brakes.mechanicalCheck.parkingHandBrake,
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
      )}

      {currentStep === 5 && (
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
      )}

      {currentStep === 6 && (
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
                        ...prev.interior.steeringControls
                          .steeringWheelCondition,
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
                  const newChecks = [
                    ...formData.interior.mirrors.booleanChecks,
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
      )}

      {currentStep === 7 && (
        <section>
          <h2>AC & Heater Checkup</h2>

          <div>
            <label>AC Fitted</label>
            <input
              type="checkbox"
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
          </div>

          <div>
            <label>AC Operational</label>
            <input
              type="checkbox"
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
          </div>

          <div>
            <label>Blower</label>
            <input
              type="text"
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

          <div>
            <label>Cooling</label>
            <input
              type="text"
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

          <div>
            <label>Heating</label>
            <input
              type="text"
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
        </section>
      )}

      {currentStep === 8 && (
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
      )}

      {currentStep === 9 && (
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
                        ...(newData.exteriorBody.carFrame.imageValueChecks ||
                          []),
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

                      newData.exteriorBody.exteriorLights.booleanChecks =
                        checks;
                      return newData;
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {currentStep === 10 && (
        <section>
          <h2>Tyres</h2>
          <div>
            {[
              "frontRightTyreBrand",
              "frontLeftTyreBrand",
              "rearRightTyreBrand",
              "rearLeftTyreBrand",
            ].map((item) => (
              <div key={item}>
                <label>{item}</label>
                <input
                  type="checkbox"
                  checked={
                    formData.tyres.tyres.booleanChecks.find(
                      (check) => check.name === item
                    )?.value || false
                  }
                  onChange={(e) => {
                    setFormData((prev) => {
                      const newData = { ...prev };
                      const checks = [
                        ...(newData.tyres.tyres.booleanChecks || []),
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

                      newData.tyres.tyres.booleanChecks = checks;
                      return newData;
                    });
                  }}
                />
              </div>
            ))}

            {[
              "frontRightTyre",
              "frontLeftTyre",
              "rearRightTyre",
              "rearLeftTyre",
              "wheelsCaps",
            ].map((item) => (
              <div key={item}>
                <label>{item}</label>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, "tyres", "tyres", item)}
                />
                <input
                  type="text"
                  value={
                    formData.tyres.tyres.imageValueChecks.find(
                      (check) => check.name === item
                    )?.data?.value || ""
                  }
                  onChange={(e) => {
                    setFormData((prev) => {
                      const newData = { ...prev };
                      const checks = [...newData.tyres.tyres.imageValueChecks];
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

                      newData.tyres.tyres.imageValueChecks = checks;
                      return newData;
                    });
                  }}
                />
              </div>
            ))}

            <div>
              <label>Tyre Size</label>
              <input
                type="text"
                value={formData.tyres.tyres.tyreSize}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    tyres: {
                      ...prev.tyres,
                      tyres: {
                        ...prev.tyres.tyres,
                        tyreSize: e.target.value,
                      },
                    },
                  }));
                }}
              />
            </div>

            <div>
              <label>Rims</label>
              <input
                type="text"
                value={formData.tyres.tyres.rims}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    tyres: {
                      ...prev.tyres,
                      tyres: {
                        ...prev.tyres.tyres,
                        rims: e.target.value,
                      },
                    },
                  }));
                }}
              />
            </div>
          </div>
        </section>
      )}

      {currentStep === 11 && (
        <section>
          <h2>Additional Pictures</h2>
          <div className="form-section">
            <div>
              <label>Upload Additional Car Photos</label>
              <input
                type="file"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  Promise.all(files.map((file) => getBase64(file))).then(
                    (base64Array) => {
                      setFormData((prev) => ({
                        ...prev,
                        pictures: [
                          ...prev.pictures,
                          ...base64Array.map((base64) => ({
                            url: `data:image/png;base64,${
                              base64.split(",")[1]
                            }`,
                            public_id: "",
                          })),
                        ],
                      }));
                    }
                  );
                }}
              />
              <button
                type="button"
                onClick={() => {
                  // Trigger file input click
                  document.querySelector('input[type="file"]').click();
                }}
              >
                Add More Images
              </button>
            </div>

            <div>
              <label>Comments</label>
              <textarea
                value={formData.comments}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    comments: e.target.value,
                  }));
                }}
              />
            </div>

            <div>
              <label>Disclaimer</label>
              <textarea
                value={formData.disclaimer}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    disclaimer: e.target.value,
                  }));
                }}
              />
            </div>

            {formData.pictures.length > 0 && (
              <div className="image-preview">
                {formData.pictures.map((pic, index) => (
                  <div key={index} className="preview-item">
                    <img
                      src={pic.url}
                      alt={`Additional car photo ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          pictures: prev.pictures.filter((_, i) => i !== index),
                        }));
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Continue with similar pattern for other sections */}
      {/* Each section wrapped in currentStep === N condition */}

      <div className="navigation-buttons">
        {currentStep > 0 && (
          <button type="button" onClick={() => setCurrentStep(currentStep - 1)}>
            Previous
          </button>
        )}

        {currentStep < totalSteps - 1 ? (
          <button type="button" onClick={() => setCurrentStep(currentStep + 1)}>
            Next
          </button>
        ) : (
          <button type="submit">Submit Inspection Report</button>
        )}
      </div>
    </form>
  );
};

export default Form;
