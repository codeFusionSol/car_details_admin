const EngineTransmissionClutch = ({ formData, setFormData }) => {
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
      <section className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">Engine, Transmission & Clutch</h2>

        <div className="space-y-8">
          {/* Fluids & Filters Check Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Fluids & Filters Check</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["engineOilLevel", "engineOilLeakage", "transmissionOilLeakage"].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {item.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <div className="flex flex-col space-y-3">
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e, "engineTransmissionClutch", "fluidsFiltersCheck", item)}
                      accept="image/*"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <input
                      type="text"
                      value={formData.engineTransmissionClutch.fluidsFiltersCheck.imageValueChecks.find(
                        (check) => check.name === item
                      )?.data?.value || ""}
                      onChange={(e) => {
                        const newChecks = [...formData.engineTransmissionClutch.fluidsFiltersCheck.imageValueChecks];
                        const existingIndex = newChecks.findIndex((check) => check.name === item);
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter value"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {["coolantLeakage", "brakeOilLeakage"].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {item.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type="text"
                    value={formData.engineTransmissionClutch.fluidsFiltersCheck.stringChecks.find(
                      (check) => check.name === item
                    )?.value || ""}
                    onChange={(e) => {
                      const newChecks = [...formData.engineTransmissionClutch.fluidsFiltersCheck.stringChecks];
                      const existingIndex = newChecks.findIndex((check) => check.name === item);
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter value"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mechanical Check Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Mechanical Check</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["wires", "hoses"].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {item}
                  </label>
                  <div className="flex flex-col space-y-3">
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e, "engineTransmissionClutch", "mechanicalCheck", item)}
                      accept="image/*"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <input
                      type="text"
                      value={formData.engineTransmissionClutch.mechanicalCheck.imageValueChecks.find(
                        (check) => check.name === item
                      )?.data?.value || ""}
                      onChange={(e) => {
                        const newChecks = [...formData.engineTransmissionClutch.mechanicalCheck.imageValueChecks];
                        const existingIndex = newChecks.findIndex((check) => check.name === item);
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter value"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {["engineBlow", "engineNoise", "engineVibration"].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {item.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type="text"
                    value={formData.engineTransmissionClutch.mechanicalCheck.stringChecks.find(
                      (check) => check.name === item
                    )?.value || ""}
                    onChange={(e) => {
                      const newChecks = [...formData.engineTransmissionClutch.mechanicalCheck.stringChecks];
                      const existingIndex = newChecks.findIndex((check) => check.name === item);
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter value"
                    required
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.engineTransmissionClutch.mechanicalCheck.engineMounts}
                  onChange={(e) => handleInputChange(e, "engineTransmissionClutch", "mechanicalCheck", "engineMounts")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <span className="text-sm font-medium text-gray-700">Engine Mounts</span>
              </label>
            </div>
          </div>

          {/* Exhaust Check Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Exhaust Check</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.engineTransmissionClutch.exhaustCheck.exhaustSound}
                  onChange={(e) => handleInputChange(e, "engineTransmissionClutch", "exhaustCheck", "exhaustSound")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <span className="text-sm font-medium text-gray-700">Exhaust Sound</span>
              </label>
            </div>
          </div>

          {/* Engine Cooling System Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Engine Cooling System</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.engineTransmissionClutch.engineCoolingSystem.radiator}
                    onChange={(e) => handleInputChange(e, "engineTransmissionClutch", "engineCoolingSystem", "radiator")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                  <span className="text-sm font-medium text-gray-700">Radiator</span>
                </label>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">Suction Fan</label>
                <input
                  type="text"
                  value={formData.engineTransmissionClutch.engineCoolingSystem.suctionFan}
                  onChange={(e) => handleInputChange(e, "engineTransmissionClutch", "engineCoolingSystem", "suctionFan")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter value"
                  required
                />
              </div>
            </div>
          </div>

          {/* Transmission Check Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Transmission Check</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.engineTransmissionClutch.transmissionCheck.starterOperation}
                  onChange={(e) => handleInputChange(e, "engineTransmissionClutch", "transmissionCheck", "starterOperation")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <span className="text-sm font-medium text-gray-700">Starter Operation</span>
              </label>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EngineTransmissionClutch;
