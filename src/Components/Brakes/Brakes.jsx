const Brakes = ({ formData, setFormData }) => {
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
    <div className="brakes-container">
      <section className="brakes-section">
        <h2 className="section-title">Brakes Inspection</h2>

        <div className="mechanical-check-section">
          <h3 className="subsection-title">Mechanical Check</h3>
          <div className="mechanical-checks-grid">
            {[
              { display: "Front Right Disc", field: "frontRightDisc" },
              { display: "Front Left Disc", field: "frontLeftDisc" },
              { display: "Front Right Brake Pad", field: "frontRightBrakePad" },
              { display: "Front Left Brake Pad", field: "frontLeftBrakePad" },
            ].map((item, index) => (
              <div key={index} className="input-group">
                <label className="input-label">{item.display}</label>
                <input
                  type="text"
                  className="text-input"
                  value={
                    formData.brakes.mechanicalCheck.stringChecks.find(
                      (check) => check.name === item.field
                    )?.value || ""
                  }
                  onChange={(e) => {
                    const newChecks = [
                      ...formData.brakes.mechanicalCheck.stringChecks,
                    ];
                    const existingIndex = newChecks.findIndex(
                      (check) => check.name === item.field
                    );
                    if (existingIndex >= 0) {
                      newChecks[existingIndex].value = e.target.value;
                    } else {
                      newChecks.push({
                        name: item.field,
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
                  placeholder={`Enter ${item.display} details`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="parking-brake-section">
          <h3 className="subsection-title">Parking Hand Brake</h3>
          <div className="parking-brake-container">
            <div className="input-group">
              <label className="input-label">Upload Image</label>
              <input
                type="file"
                className="file-input"
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
            </div>
            <div className="input-group">
              <label className="input-label">Condition</label>
              <input
                type="text"
                className="text-input"
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
                placeholder="Enter parking brake condition"
              />
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .brakes-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .brakes-section {
          background: white;
          border-radius: 10px;
          padding: 2rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .section-title {
          color: #2c3e50;
          font-size: 2rem;
          margin-bottom: 2rem;
          text-align: center;
          border-bottom: 2px solid #3498db;
          padding-bottom: 1rem;
        }

        .subsection-title {
          color: #34495e;
          font-size: 1.5rem;
          margin: 1.5rem 0;
        }

        .mechanical-checks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .input-group {
          margin-bottom: 1.5rem;
        }

        .input-label {
          display: block;
          margin-bottom: 0.5rem;
          color: #7f8c8d;
          font-weight: 500;
        }

        .text-input {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #bdc3c7;
          border-radius: 5px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .text-input:focus {
          border-color: #3498db;
          outline: none;
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
        }

        .file-input {
          width: 100%;
          padding: 0.5rem;
          border: 1px dashed #bdc3c7;
          border-radius: 5px;
          cursor: pointer;
        }

        .file-input:hover {
          border-color: #3498db;
        }

        .parking-brake-container {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
        }

        @media (max-width: 768px) {
          .brakes-container {
            padding: 1rem;
          }

          .mechanical-checks-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Brakes;
