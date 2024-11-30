import { useDispatch } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";

const Tyres = ({ formData, setFormData }) => {
  const dispatch = useDispatch();

  const changeStep = () => {
    dispatch(changeStepSuccess(11));
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
    e.preventDefault();
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
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Tyres Inspection
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tyre Brand Checks */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              Tyre Brand Verification
            </h3>
            <div className="space-y-3">
              {[
                "frontRightTyreBrand",
                "frontLeftTyreBrand",
                "rearRightTyreBrand",
                "rearLeftTyreBrand",
              ].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600"
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
                  <label className="text-gray-700 capitalize">
                    {item.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Tyre Inspection Images */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              Tyre Condition Images
            </h3>
            <div className="space-y-4">
              {[
                "frontRightTyre",
                "frontLeftTyre",
                "rearRightTyre",
                "rearLeftTyre",
                "wheelsCaps",
              ].map((item) => (
                <div key={item} className="space-y-2">
                  <label className="block text-gray-700 capitalize">
                    {item.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="file"
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      onChange={(e) =>
                        handleImageChange(e, "tyres", "tyres", item)
                      }
                    />
                    <input
                      type="text"
                      className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter condition"
                      value={
                        formData.tyres.tyres.imageValueChecks.find(
                          (check) => check.name === item
                        )?.data?.value || ""
                      }
                      onChange={(e) => {
                        setFormData((prev) => {
                          const newData = { ...prev };
                          const checks = [
                            ...newData.tyres.tyres.imageValueChecks,
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

                          newData.tyres.tyres.imageValueChecks = checks;
                          return newData;
                        });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Additional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Tyre Size</label>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter tyre size"
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
                <label className="block text-gray-700 mb-2">Rims</label>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter rims details"
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
          </div>
        </div>
      </section>
      <button onClick={() => changeStep()}>Next</button>
    </>
  );
};

export default Tyres;
