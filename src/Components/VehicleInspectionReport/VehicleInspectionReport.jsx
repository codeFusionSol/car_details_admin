const VehicleInspectionReport = ({ formData, setFormData }) => {
  return (
    <>
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
    </>
  );
};

export default VehicleInspectionReport;