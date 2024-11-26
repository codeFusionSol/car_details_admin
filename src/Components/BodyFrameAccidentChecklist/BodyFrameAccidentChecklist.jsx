const BodyFrameAccidentChecklist = ({ formData, setFormData }) => {
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
    <div className="container mx-auto p-6">
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Body Frame & Accident Checklist
        </h2>

        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-6">
            Image Value Checks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {item.split(/(?=[A-Z])/).join(" ")}
                </label>
                <div className="flex flex-col space-y-3">
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
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                      focus:border-blue-500 focus:ring-blue-500 sm:text-sm
                      p-2 border"
                    placeholder="Enter value"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-6">
            Pillar Checks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "rightAPillar",
              "leftAPillar",
              "rightBPillar",
              "leftBPillar",
              "rightCPillar",
              "leftCPillar",
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
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
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  {item.split(/(?=[A-Z])/).join(" ")}
                </label>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BodyFrameAccidentChecklist;
