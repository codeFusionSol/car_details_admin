import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../utils/url";
import CarDetails from "../../Components/CarDetails/CarDetails.jsx";
import VehicleInspectionReport from "../../Components/VehicleInspectionReport/VehicleInspectionReport.jsx";
import BodyFrameAccidentChecklist from "../../Components/BodyFrameAccidentChecklist/BodyFrameAccidentChecklist.jsx";
import EngineTransmissionClutch from "../../Components/EngineTransmissionClutch/EngineTransmissionClutch.jsx";
import Brakes from "../../Components/Brakes/Brakes.jsx";
import SuspensionSteering from "../../Components/SuspensionSteering/SuspensionSteering.jsx";
import Interior from "../../Components/Interior/Interior.jsx";
import ACHeaterCheckup from "../../Components/ACHeaterCheckup/ACHeaterCheckup.jsx";
import ElectricalElectronics from "../../Components/ElectricalElectronics/ElectricalElectronics.jsx";
import ExteriorBody from "../../Components/ExteriorBody/ExteriorBody.jsx";
import Tyres from "../../Components/Tyres/Tyres.jsx";
import AdditionalPictures from "../../Components/AdditionalPictures/AdditionalPictures.jsx";

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
          { name: "bonnetReleaseLever", value: false }, // Fixed typo here
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validatedPictures = formData.pictures.map(pic => ({
      ...pic,
      public_id: pic.public_id || `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }));


    // Add public_id to any pics in formData that don't have one
    const addPublicIds = (obj) => {
      if (!obj) return obj;
      
      // Handle arrays
      if (Array.isArray(obj)) {
        return obj.map(item => addPublicIds(item));
      }

      // Handle objects
      if (typeof obj === 'object') {
        const newObj = {...obj};
        
        // Add public_id to image objects that don't have one
        if (newObj.image && !newObj.image.public_id) {
          newObj.image.public_id = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        }
        
        // Recursively process all object properties
        Object.keys(newObj).forEach(key => {
          newObj[key] = addPublicIds(newObj[key]);
        });
        
        return newObj;
      }

      return obj;
    };

    const formDataWithIds = addPublicIds({...formData});

    const dataToSubmit = {
      ...formData,
      pictures: validatedPictures
    };
    console.log(formData);
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
    <form className="car-inspection-form" onSubmit={(e) => e.preventDefault()}>
      {currentStep === 0 && (
        <CarDetails formData={formData} setFormData={setFormData} />
      )}

      {currentStep === 1 && (
        <VehicleInspectionReport
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {currentStep === 2 && (
        <BodyFrameAccidentChecklist
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {currentStep === 3 && (
        <EngineTransmissionClutch
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {currentStep === 4 && (
        <Brakes formData={formData} setFormData={setFormData} />
      )}

      {currentStep === 5 && (
        <SuspensionSteering formData={formData} setFormData={setFormData} />
      )}

      {currentStep === 6 && (
        <Interior formData={formData} setFormData={setFormData} />
      )}

      {currentStep === 7 && (
        <ACHeaterCheckup formData={formData} setFormData={setFormData} />
      )}

      {currentStep === 8 && (
        <ElectricalElectronics formData={formData} setFormData={setFormData} />
      )}

      {currentStep === 9 && (
        <ExteriorBody formData={formData} setFormData={setFormData} />
      )}

      {currentStep === 10 && (
        <Tyres formData={formData} setFormData={setFormData} />
      )}

      {currentStep === 11 && (
        <AdditionalPictures formData={formData} setFormData={setFormData} />
      )}

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
          <button type="button" onClick={handleSubmit}>
            Submit Inspection Report
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;
