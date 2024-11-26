const CarDetails = ({ formData, setFormData }) => {
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
    <div className="bg-gray-100 min-h-screen p-8">
      <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Car Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Car Image</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, "carDetails")}
              accept="image/*"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              value={formData?.carDetails?.name}
              onChange={(e) => handleInputChange(e, "carDetails", "name")}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Overall Rating</label>
            <input
              type="number"
              min="0"
              max="10"
              value={formData?.carDetails?.overallRating}
              onChange={(e) => handleInputChange(e, "carDetails", "overallRating")}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Mileage</label>
            <input
              type="number"
              min="0"
              value={formData?.carDetails?.mileage}
              onChange={(e) => handleInputChange(e, "carDetails", "mileage")}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Inspection Date</label>
            <input
              type="date"
              value={formData?.carDetails?.inspectionDate}
              onChange={(e) => handleInputChange(e, "carDetails", "inspectionDate")}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Engine Number</label>
            <input
              type="text"
              value={formData?.carDetails?.engineNo}
              onChange={(e) => handleInputChange(e, "carDetails", "engineNo")}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Transmission Type</label>
            <select
              value={formData?.carDetails?.transmissionType}
              onChange={(e) => handleInputChange(e, "carDetails", "transmissionType")}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
              <option value="CVT">CVT</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="flex items-center text-gray-700 font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={formData?.carDetails?.cngInstall}
                onChange={(e) => handleInputChange(e, "carDetails", "cngInstall")}
                className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-400"
              />
              CNG Installed
            </label>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Engine Capacity (CC)</label>
            <input
              type="number"
              min="0"
              value={formData?.carDetails?.engineCapacity}
              onChange={(e) => handleInputChange(e, "carDetails", "engineCapacity")}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Chassis Number</label>
            <input
              type="text"
              value={formData?.carDetails?.chassisNo}
              onChange={(e) => handleInputChange(e, "carDetails", "chassisNo")}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Registered City</label>
            <input
              type="text"
              value={formData?.carDetails?.registeredCity}
              onChange={(e) => handleInputChange(e, "carDetails", "registeredCity")}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Registered Year</label>
            <input
              type="number"
              value={formData?.carDetails?.registeredYear}
              onChange={(e) => handleInputChange(e, "carDetails", "registeredYear")}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Drive Type</label>
            <select
              value={formData?.carDetails?.driveType}
              onChange={(e) => handleInputChange(e, "carDetails", "driveType")}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="FWD">FWD</option>
              <option value="RWD">RWD</option>
              <option value="AWD">AWD</option>
              <option value="4WD">4WD</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Registration Number</label>
            <input
              type="text"
              value={formData?.carDetails?.registrationNo}
              onChange={(e) => handleInputChange(e, "carDetails", "registrationNo")}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Color</label>
            <input
              type="text"
              value={formData?.carDetails?.colour}
              onChange={(e) => handleInputChange(e, "carDetails", "colour")}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarDetails;
