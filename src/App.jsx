import React, { useEffect, useState } from "react";

import axios from "axios";
import { url } from "../utils/url.js";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase.js";

const api = axios.create({
  baseURL: url,
});

function App() {
  const [carDetails, setCarDetails] = useState({
    img: "",
    name: "",
    overallRating: "",
    mileage: "",
    inspectionDate: "",
    engineNo: "",
    transmissionType: "",
    cngInstall: "",
    engineCapacity: "",
    chassisNo: "",
    registeredCity: "",
    registeredYear: "",
    driveType: "",
    registrationNo: "",
    colour: "",
  });
  const [vehicleInspectionReport, setVehicleInspectionReport] = useState({
    acHeater: "",
    engineTransmissionClutch: "",
    exterior: "",
    skeleton: "",
    accidentChecklist: "",
    brakes: "",
    suspensionSteering: "",
    interior: "",
    electricalElectronics: "",
    tyres: "",
  });
  const [bodyFrameAccidentChecklist, setBodyFrameAccidentChecklist] = useState({
    radiatorCoreSupport: {
      img: "",
      val: "",
    },
    rightStrutTowerApon: {
      img: "",
      val: "",
    },
    leftStrutTowerApon: {
      img: "",
      val: "",
    },
    rightFrontRail: {
      img: "",
      val: "",
    },
    leftFrontRail: {
      img: "",
      val: "",
    },
    cowlPanelFirewall: {
      img: "",
      val: "",
    },
    rightAPillar: "",
    leftAPillar: "",
    rightBPillar: "",
    leftBPillar: "",
    rightCPillar: "",
    leftCPillar: "",
    bootFloor: {
      img: "",
      val: "",
    },
    bootLockPillar: {
      img: "",
      val: "",
    },
    rearSubFrame: {
      img: "",
      val: "",
    },
    frontSubFrame: {
      img: "",
      val: "",
    },
  });
  const [engineTransmissionClutch, setEngineTransmissionClutch] = useState({
    engineTransmissionClutch: {
      fluidsFiltersCheck: {
        engineOilLevel: {
          img: "",
          val: "",
        },
        engineOilLeakage: {
          img: "",
          val: "",
        },
        transmissionOilLeakage: {
          img: "",
          val: "",
        },
        coolantLeakage: "",
        brakeOilLeakage: "",
      },
    },
    mechanicalCheck: {
      wires: {
        img: "",
        val: "",
      },
      engineBlow: "",
      engineNoise: "",
      engineVibration: "",
      engineMounts: "",
      hoses: {
        img: "",
        val: "",
      },
    },
    exhaustCheck: {
      exhaustSound: "",
    },
    engineCoolingSystem: {
      radiator: "",
      suctionFan: "",
    },
    transmissionCheck: {
      starterOperation: "",
    },
  });
  const [brakes, setBrakes] = useState({
    mechanicalCheck: {
      frontRightDisc: "",
      frontLeftDisc: "",
      frontRightBrakePad: "",
      frontLeftBrakePad: "",
      parkingHandBrake: {
        img: "",
        val: "",
      },
    },
  });
  const [suspensionSteering, setSuspensionSteering] = useState({
    frontSuspension: {
      steeringWheelPlay: "",
      rightBallJoint: {
        img: "",
        val: "",
      },
      leftBallJoint: {
        img: "",
        val: "",
      },
      rightZLinks: {
        img: "",
        val: "",
      },
    },
    leftZLinks: {
      img: "",
      val: "",
    },
    rightTieRodEnd: {
      img: "",
      val: "",
    },
    leftTieRodEnd: {
      img: "",
      val: "",
    },
    frontRightBoots: {
      img: "",
      val: "",
    },
    frontLeftBoots: {
      img: "",
      val: "",
    },
    frontRightBushes: {
      img: "",
      val: "",
    },
    frontLeftBushes: {
      img: "",
      val: "",
    },
    frontRightShock: {
      img: "",
      val: "",
    },
    frontLeftShock: {
      img: "",
      val: "",
    },
    rearSuspension: {
      rearRightBushes: "",
      rearLeftBushes: {
        img: "",
        val: "",
      },
      rearRightShock: {
        img: "",
        val: "",
      },
      rearLeftShock: {
        img: "",
        val: "",
      },
    },
  });
  const [interior, setInterior] = useState({
    steeringControls: {
      steeringWheelCondition: {
        img: "",
        val: "",
      },
      horn: true,
      lightsLeverSwitch: true,
      wiperWasherLever: true,
    },
    mirrors: {
      rightSideMirror: true,
      leftSideMirror: "",
      rearViewMirrorDimmer: "",
    },
    seats: {
      rightSeatAdjusterRecliner: "",
      leftSeatAdjusterRecliner: "",
      rightSeatAdjusterLearTrack: "",
      leftSeatAdjusterLearTrack: "",
      rightSeatBelt: "",
      leftSeatBelt: "",
      rearSeatBelt: "",
      gloveBox: {
        img: "",
        val: "",
      },
    },
    powerAndCentralLocking: {
      frontRightPowerWindowLever: "",
      frontLeftPowerWindowLever: "",
      rearRightPowerWindowLever: "",
      rearLeftPowerWindowLever: "",
      autoLockButton: "",
      windowSafetyLock: "",
    },
    dashRoofControls: {
      interiorLightings: "",
      dashControlsAC: "",
      dashControlsDeFog: "",
      dashontrolsHazzardLights: "",
      audioVideo: "",
      trunkReleaseLever: "",
      fuelCapReleaseLever: "",
      bonnetReleaseLever: "",
    },
    poshish: {
      roofPoshish: {
        img: "",
        val: "",
      },
      floorMat: {
        img: "",
        val: "",
      },
      frontRightSeatPoshish: {
        img: "",
        val: "",
      },
      frontleftSeatPoshish: {
        img: "",
        val: "",
      },
      rearSeatPoshish: {
        img: "",
        val: "",
      },
      dashboardCondition: {
        img: "",
        val: "",
      },
    },
    equipment: {
      spareTire: {
        img: "",
        val: "",
      },
      jack: "",
      tools: {
        img: "",
        val: "",
      },
    },
  });
  const [acHeater, setAcHeater] = useState({
    acHeaterCheckUp: {
      acFitted: "",
      acOperational: "",
      blower: "",
      cooling: "",
      heating: "",
    },
  });
  const [electricalElectronics, setElectricalElectronics] = useState({
    computerCheckUp: {
      malfunctionCheck: {
        img: "",
        val: "",
      },
      rearViewCamera: {
        img: "",
        val: "",
      },
      batteryWarningLight: "",
      oilPressureLowWarningLight: "",
      temperatureWarningLight: "",
      gauges: {
        img: "",
        val: "",
      },
      airBagWarningLight: "",
      powerSteeringWarningLight: "",
      absWarningLight: "",
      keyFobBatteryLowLight: "",
    },
    battery: {
      battery: "",
      terminalCondition: "",
      charging: "",
      alternatorOperation: "",
    },
  });
  const [exteriorBody, setExteriorBody] = useState({
    carFrame: {
      trunkLock: "",
      frontWindshieldCondition: {
        img: "",
        val: "",
      },
      rearWindshieldCondition: {
        img: "",
        val: "",
      },
      frontRightDoorWindow: "",
      frontLeftDoorWindow: "",
      rearRightDoorWindow: "",
      rearLeftDoorWindow: "",
      windscreenWiper: {
        img: "",
        val: "",
      },
    },
    exteriorLights: {
      rightHeadlightWorking: {
        img: "",
        val: "",
      },
      leftHeadlightWorking: {
        img: "",
        val: "",
      },
      rightHeadlightCondition: {
        img: "",
        val: "",
      },
      leftHeadlightCondition: {
        img: "",
        val: "",
      },
      rightTaillightWorking: "",
      leftTaillightWorking: "",
      rightTaillightCondition: "",
      leftTaillightCondition: {
        img: "",
        val: "",
      },
    },
  });
  const [tyres, setTyres] = useState({
    tyres: {
      frontRightTyreBrand: "",
      frontRightTyre: {
        img: "",
        val: "",
      },
      frontLeftTyreBrand: "",
      frontLeftTyre: {
        img: "",
        val: "",
      },
      rearRightTyreBrand: "",
      rearRightTyre: {
        img: "",
        val: "",
      },
      rearLeftTyreBrand: "",
      rearLeftTyre: {
        img: "",
        val: "",
      },
      tyreSize: "",
      rims: "",
      wheelsCaps: {
        img: "",
        val: "",
      },
    },
  });

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   const fileName = new Date().getTime() + file.name;
  //   const storage = getStorage(app);
  //   const storageRef = ref(storage, fileName);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log("Upload is " + progress + "% done");
  //       switch (snapshot.state) {
  //         case "paused":
  //           console.log("Upload is paused");
  //           break;
  //         case "running":
  //           console.log("Upload is running");
  //           break;
  //         default:
  //       }
  //     },
  //     (error) => {
  //       console.log("Upload failed: ", error);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         const carData = {};
  //         api
  //           .post("/car", carData)
  //           .then((res) => {
  //             console.log(res);
  //             alert("car created successfully");
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //             alert(err);
  //           });
  //       });
  //     }
  //   );
  // };

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState([
    {
      heading: "carDetails",
      img: { type: "file", label: "upload image" },
      name: { type: "text", label: "car name" },
      overallRating: { type: "number", label: "overall rating" },
      mileage: { type: "number", label: "mileage" },
      engineNo: { type: "text", label: "engine no" },
      transmissionType: { type: "text", label: "transmission type" },
      cngInstall: { type: "boolean", label: "cng install" },
      engineCapacity: { type: "number", label: "engine capacity" },
      chassisNo: { type: "text", label: "chassis no" },
      registeredCity: { type: "text", label: "registered city" },
      registeredYear: { type: "number", label: "registered year" },
      driveType: { type: "text", label: "drive type" },
      registrationNo: { type: "text", label: "registration no" },
      colour: { type: "text", label: "colour" },
    },
    {
      heading: "vehicleInspectionReport",
      acHeater: { type: "number", label: "ac heater" },
      engineTransmissionClutch: {
        type: "number",
        label: "engine transmission clutch",
      },
      exterior: { type: "number", label: "exterior" },
      skeleton: { type: "number", label: "skeleton" },
      accidentChecklist: { type: "number", label: "accident checklist" },
      brakes: { type: "number", label: "brakes" },
      suspensionSteering: { type: "number", label: "suspension steering" },
      interior: { type: "number", label: "interior" },
      electricalElectronics: {
        type: "number",
        label: "electrical electronics",
      },
      tyres: { type: "number", label: "tyres" },
    },
    {
      heading: "bodyFrameAccidentChecklist",
      radiatorCoreSupport: {
        img: { type: "file", label: "radiatorCoreSupport image" },
        val: { type: "boolean", label: "radiatorCoreSupport value" },
      },
      rightStrutTowerApon: {
        img: { type: "file", label: "rightStrutTowerApon image" },
        val: { type: "boolean", label: "rightStrutTowerApon value" },
      },
      leftStrutTowerApon: {
        img: { type: "file", label: "leftStrutTowerApon image" },
        val: { type: "boolean", label: "leftStrutTowerApon value" },
      },
      rightFrontRail: {
        img: { type: "file", label: "rightFrontRail image" },
        val: { type: "boolean", label: "rightFrontRail value" },
      },
      leftFrontRail: {
        img: { type: "file", label: "leftFrontRail image" },
        val: { type: "boolean", label: "leftFrontRail value" },
      },
      cowlPanelFirewall: {
        img: { type: "file", label: "cowlPanelFirewall image" },
        val: { type: "boolean", label: "cowlPanelFirewall value" },
      },
      rightAPillar: { type: "boolean", label: "rightAPillar" },
      leftAPillar: { type: "boolean", label: "leftAPillar" },
      rightBPillar: { type: "boolean", label: "rightBPillar" },
      leftBPillar: { type: "boolean", label: "leftBPillar" },
      rightCPillar: { type: "boolean", label: "rightCPillar" },
      leftCPillar: { type: "boolean", label: "leftCPillar" },

      bootFloor: {
        img: { type: "file", label: "bootFloor image" },
        val: { type: "boolean", label: "bootFloor value" },
      },
      bootLockPillar: {
        img: { type: "file", label: "bootLockPillar image" },
        val: { type: "boolean", label: "bootLockPillar value" },
      },
      rearSubFrame: {
        img: { type: "file", label: "rearSubFrame image" },
        val: { type: "boolean", label: "rearSubFrame value" },
      },
      frontSubFrame: {
        img: { type: "file", label: "frontSubFrame image" },
        val: { type: "boolean", label: "frontSubFrame value" },
      },
    },
    {
      heading: "engineTransmissionClutch",
      fluidsFiltersCheck: {
        fluidsFiltersCheck: {
          img: { type: "file", label: "fluidsFiltersCheck image" },
          val: { type: "text", label: "fluidsFiltersCheck value" },
        },
        engineOilLeakage: {
          img: { type: "file", label: "engineOilLeakage image" },
          val: { type: "text", label: "engineOilLeakage value" },
        },
        transmissionOilLeakage: {
          img: { type: "file", label: "transmissionOilLeakage image" },
          val: { type: "text", label: "transmissionOilLeakage value" },
        },
        coolantLeakage: { type: "text", label: "coolantLeakage" },
        brakeOilLeakage: { type: "text", label: "brakeOilLeakage" },
      },
      mechanicalCheck: {
        wires: {
          img: { type: "file", label: "wires image" },
          val: { type: "boolean", label: "wires value" },
        },
        engineBlow: { type: "text", label: "engineBlow" },
        engineNoise: { type: "text", label: "engineNoise" },
        engineVibration: { type: "text", label: "engineVibration" },
        engineMounts: { type: "boolean", label: "engineMounts" },
        hoses: {
          img: { type: "file", label: "hoses image" },
          val: { type: "boolean", label: "hoses value" },
        },
      },
      exhaustCheck: {
        exhaustSound: { type: "boolean", label: "exhaustSound" },
      },
      engineCoolingSystem: {
        radiator: { type: "boolean", label: "radiator" },
        suctionFan: { type: "text", label: "suctionFan" },
      },
      transmissionCheck: {
        starterOperation: { type: "boolean", label: "starterOperation" },
      },
    },
    {
      heading: "brakes",
      mechanicalCheck: {
        frontRightDisc: { type: "text", label: "frontRightDisc" },
        frontLeftDisc: { type: "text", label: "frontLeftDisc" },
        frontRightBrakePad: { type: "text", label: "frontRightBrakePad" },
        frontLeftBrakePad: { type: "text", label: "frontLeftBrakePad" },
        parkingHandBrake: {
          img: { type: "file", label: "parkingHandBrake image" },
          val: { type: "text", label: "parkingHandBrake value" },
        },
      },
    },
    {
      heading: "suspensionSteering",
      frontSuspension: {
        steeringWheelPlay: { type: "text", label: "steeringWheelPlay" },
        rightBallJoint: {
          img: { type: "file", label: "rightBallJoint image" },
          val: { type: "text", label: "rightBallJoint value" },
        },
        leftBallJoint: {
          img: { type: "file", label: "leftBallJoint image" },
          val: { type: "text", label: "leftBallJoint value" },
        },
        rightZLinks: {
          img: { type: "file", label: "rightZLinks image" },
          val: { type: "text", label: "rightZLinks value" },
        },
        leftZLinks: {
          img: { type: "file", label: "leftZLinks image" },
          val: { type: "text", label: "leftZLinks value" },
        },
        rightTieRodEnd: {
          img: { type: "file", label: "rightTieRodEnd image" },
          val: { type: "text", label: "rightTieRodEnd value" },
        },
        leftTieRodEnd: {
          img: { type: "file", label: "leftTieRodEnd image" },
          val: { type: "text", label: "leftTieRodEnd value" },
        },
        frontRightBoots: {
          img: { type: "file", label: "frontRightBoots image" },
          val: { type: "text", label: "frontRightBoots value" },
        },
        frontLeftBoots: {
          img: { type: "file", label: "frontLeftBoots image" },
          val: { type: "text", label: "frontLeftBoots value" },
        },
        frontRightBushes: {
          img: { type: "file", label: "frontRightBushes image" },
          val: { type: "text", label: "frontRightBushes value" },
        },
        frontLeftBushes: {
          img: { type: "file", label: "frontLeftBushes image" },
          val: { type: "text", label: "frontLeftBushes value" },
        },
        frontRightShock: {
          img: { type: "file", label: "frontRightShock image" },
          val: { type: "text", label: "frontRightShock value" },
        },
        frontLeftShock: {
          img: { type: "file", label: "frontLeftShock image" },
          val: { type: "text", label: "frontLeftShock value" },
        },
      },
      rearSuspension: {
        rearRightBushes: {
          img: { type: "file", label: "rearLeftBushes image" },
          val: { type: "text", label: "rearLeftBushes value" },
        },
        rearLeftBushes: {
          img: { type: "file", label: "rearLeftBushes image" },
          val: { type: "text", label: "rearLeftBushes value" },
        },
        rearRightShock: {
          img: { type: "file", label: "rearRightShock image" },
          val: { type: "text", label: "rearRightShock value" },
        },
        rearLeftShock: {
          img: { type: "file", label: "rearLeftShock image" },
          val: { type: "text", label: "rearLeftShock value" },
        },
      },
    },

    {
      heading: "interior",
      steeringControls: {
        steeringWheelCondition: {
          img: { type: "file", label: "steeringWheelCondition image" },
          val: { type: "text", label: "steeringWheelCondition value" },
        },
        horn: { type: "boolean", label: "horn" },
        lightsLeverSwitch: { type: "boolean", label: "lightsLeverSwitch" },
        wiperWasherLever: { type: "boolean", label: "wiperWasherLever" },
      },
      mirrors: {
        rightSideMirror: { type: "boolean", label: "rightSideMirror" },
        leftSideMirror: { type: "boolean", label: "leftSideMirror" },
        rearViewMirrorDimmer: { type: "text", label: "rearViewMirrorDimmer" },
      },
      seats: {
        rightSeatAdjusterRecliner: {
          type: "boolean",
          label: "rightSeatAdjusterRecliner",
        },
        leftSeatAdjusterRecliner: {
          type: "boolean",
          label: "leftSeatAdjusterRecliner",
        },
        rightSeatAdjusterLearTrack: {
          type: "boolean",
          label: "rightSeatAdjusterLearTrack",
        },
        leftSeatAdjusterLearTrack: {
          type: "boolean",
          label: "leftSeatAdjusterLearTrack",
        },
        rightSeatBelt: { type: "boolean", label: "rightSeatBelt" },
        leftSeatBelt: { type: "boolean", label: "leftSeatBelt" },
        rearSeatBelt: { type: "boolean", label: "rearSeatBelt" },
        gloveBox: {
          img: { type: "file", label: "gloveBox image" },
          val: { type: "boolean", label: "gloveBox value" },
        },
      },
      powerAndCentralLocking: {
        frontRightPowerWindowLever: {
          type: "boolean",
          label: "frontRightPowerWindowLever",
        },
        frontLeftPowerWindowLever: {
          type: "boolean",
          label: "frontLeftPowerWindowLever",
        },
        rearRightPowerWindowLever: {
          type: "boolean",
          label: "rearRightPowerWindowLever",
        },
        rearLeftPowerWindowLever: {
          type: "boolean",
          label: "rearLeftPowerWindowLever",
        },
        autoLockButton: { type: "boolean", label: "autoLockButton" },
        windowSafetyLock: { type: "boolean", label: "windowSafetyLock" },
      },
      dashRoofControls: {
        interiorLightings: { type: "boolean", label: "interiorLightings" },
        dashControlsAC: { type: "boolean", label: "dashControlsAC" },
        dashControlsDeFog: { type: "boolean", label: "dashControlsDeFog" },
        dashontrolsHazzardLights: {
          type: "boolean",
          label: "dashontrolsHazzardLights",
        },
        audioVideo: { type: "boolean", label: "audioVideo" },
        trunkReleaseLever: { type: "boolean", label: "trunkReleaseLever" },
        fuelCapReleaseLever: { type: "boolean", label: "fuelCapReleaseLever" },
        bonnetReleaseLever: { type: "boolean", label: "bonnetReleaseLever" },
      },
      poshish: {
        roofPoshish: {
          img: { type: "file", label: "roofPoshish image" },
          val: { type: "text", label: "roofPoshish value" },
        },
        floorMat: {
          img: { type: "file", label: "floorMat image" },
          val: { type: "text", label: "floorMat value" },
        },
        frontRightSeatPoshish: {
          img: { type: "file", label: "frontRightSeatPoshish image" },
          val: { type: "text", label: "frontRightSeatPoshish value" },
        },
        frontleftSeatPoshish: {
          img: { type: "file", label: "frontleftSeatPoshish image" },
          val: { type: "text", label: "frontleftSeatPoshish value" },
        },
        rearSeatPoshish: {
          img: { type: "file", label: "rearSeatPoshish image" },
          val: { type: "text", label: "rearSeatPoshish value" },
        },
        dashboardCondition: {
          img: { type: "file", label: "dashboardCondition image" },
          val: { type: "text", label: "dashboardCondition value" },
        },
      },
      equipment: {
        spareTire: {
          img: { type: "file", label: "spareTire image" },
          val: { type: "boolean", label: "spareTire value" },
        },
        jack: { type: "text", label: "jack" },
        tools: {
          img: { type: "file", label: "tools image" },
          val: { type: "boolean", label: "tools value" },
        },
      },
    },
    {
      heading: "acHeater",
      acHeaterCheckUp: {
        acFitted: { type: "boolean", label: "acFitted" },
        acOperational: { type: "boolean", label: "acOperational" },
        blower: { type: "text", label: "blower" },
        cooling: { type: "text", label: "cooling" },
        heating: { type: "text", label: "heating" },
      },
    },

    {
      heading: "electricalElectronics",
      computerCheckUp: {
        malfunctionCheck: {
          img: { type: "file", label: "malfunctionCheck image" },
          val: { type: "boolean", label: "malfunctionCheck value" },
        },
        rearViewCamera: {
          img: { type: "file", label: "rearViewCamera image" },
          val: { type: "boolean", label: "rearViewCamera value" },
        },
        batteryWarningLight: {
          type: "boolean",
          label: "batteryWarningLight",
        },
        oilPressureLowWarningLight: {
          type: "boolean",
          label: "oilPressureLowWarningLight",
        },
        temperatureWarningLight: {
          type: "boolean",
          label: "temperatureWarningLight",
        },
        gauges: {
          img: { type: "file", label: "gauges image" },
          val: { type: "boolean", label: "gauges value" },
        },
        airBagWarningLight: {
          type: "boolean",
          label: "airBagWarningLight",
        },
        powerSteeringWarningLight: {
          type: "boolean",
          label: "powerSteeringWarningLight",
        },
        absWarningLight: {
          type: "boolean",
          label: "absWarningLight",
        },
        keyFobBatteryLowLight: {
          type: "boolean",
          label: "keyFobBatteryLowLight",
        },
      },
      battery: {
        battery: {
          type: "number",
          label: "battery",
        },
        terminalCondition: {
          type: "boolean",
          label: "terminalCondition",
        },
        charging: {
          type: "boolean",
          label: "charging",
        },
        alternatorOperation: {
          type: "boolean",
          label: "alternatorOperation",
        },
      },
    },
    {
      heading: "exteriorBody",
      carFrame: {
        trunkLock: { type: "boolean", label: "trunkLock" },
        frontWindshieldCondition: {
          img: { type: "file", label: "frontWindshieldCondition image" },
          val: { type: "text", label: "frontWindshieldCondition value" },
        },
        rearWindshieldCondition: {
          img: { type: "file", label: "rearWindshieldCondition image" },
          val: { type: "boolean", label: "rearWindshieldCondition value" },
        },
        frontRightDoorWindow: {
          type: "boolean",
          label: "frontRightDoorWindow",
        },
        frontLeftDoorWindow: { type: "boolean", label: "frontLeftDoorWindow" },
        rearRightDoorWindow: { type: "boolean", label: "rearRightDoorWindow" },
        rearLeftDoorWindow: { type: "boolean", label: "rearLeftDoorWindow" },
        windscreenWiper: {
          img: { type: "file", label: "windscreenWiper image" },
          val: { type: "text", label: "windscreenWiper value" },
        },
      },
      exteriorLights: {
        rightHeadlightWorking: {
          img: { type: "file", label: "rightHeadlightWorking image" },
          val: { type: "boolean", label: "rightHeadlightWorking value" },
        },
        leftHeadlightWorking: {
          img: { type: "file", label: "leftHeadlightWorking image" },
          val: { type: "boolean", label: "leftHeadlightWorking value" },
        },
        rightHeadlightCondition: {
          img: { type: "file", label: "rightHeadlightCondition image" },
          val: { type: "text", label: "rightHeadlightCondition value" },
        },
        leftHeadlightCondition: {
          img: { type: "file", label: "leftHeadlightCondition image" },
          val: { type: "text", label: "leftHeadlightCondition value" },
        },
        rightTaillightWorking: {
          type: "boolean",
          label: "rightTaillightWorking",
        },
        leftTaillightWorking: {
          type: "boolean",
          label: "leftTaillightWorking",
        },
        rightTaillightCondition: {
          img: { type: "file", label: "rightTaillightCondition image" },
          val: { type: "text", label: "rightTaillightCondition value" },
        },
        leftTaillightCondition: {
          img: { type: "file", label: "leftTaillightCondition image" },
          val: { type: "text", label: "leftTaillightCondition value" },
        },
      },
    },
    {
      heading: "tyres",
      tyres: {
        frontRightTyreBrand: {
          type: "boolean",
          label: "frontRightTyreBrand",
        },
        frontRightTyre: {
          img: { type: "file", label: "frontRightTyre image" },
          val: { type: "number", label: "frontRightTyre value" },
        },
        frontLeftTyreBrand: {
          type: "boolean",
          label: "frontLeftTyreBrand",
        },
        frontLeftTyre: {
          img: { type: "file", label: "frontLeftTyre image" },
          val: { type: "number", label: "frontLeftTyre value" },
        },
        rearRightTyreBrand: {
          type: "boolean",
          label: "rearRightTyreBrand",
        },
        rearRightTyre: {
          img: { type: "file", label: "rearRightTyre image" },
          val: { type: "number", label: "rearRightTyre value" },
        },
        rearLeftTyreBrand: {
          type: "boolean",
          label: "rearLeftTyreBrand",
        },
        rearLeftTyre: {
          img: { type: "file", label: "rearLeftTyre image" },
          val: { type: "number", label: "rearLeftTyre value" },
        },
        tyreSize: { type: "text", label: "tyreSize" },
        rims: {
          type: "text",
          label: "rims",
        },
        wheelsCaps: {
          img: { type: "file", label: "wheelsCaps image" },
          val: { type: "boolean", label: "wheelsCaps value" },
        },
      },
    },
  ]);

  useEffect(() => {
    console.log(tyres);
  }, [tyres]);

  const handleClick = async (e) => {
    e.preventDefault();

    const storage = getStorage(app);

    // Helper function to upload an image and get the URL
    const uploadImage = async (file) => {
      if (!file) return null;
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      await uploadBytesResumable(storageRef, file);
      return await getDownloadURL(storageRef);
    };

    // Recursive function to process formData
    const processData = async (data) => {
      const result = {};

      for (const key in data) {
        const field = data[key];

        if (field?.img && field?.val) {
          const fileInput = document.querySelector(
            `input[type="file"][data-key="${key}-img"]`
          );
          const file = fileInput?.files[0];
          result[key] = {
            img: file ? await uploadImage(file) : null,
            val:
              document.querySelector(`input[data-key="${key}-val"]`)?.value ||
              "",
          };
        } else if (field?.type === "file") {
          const fileInput = document.querySelector(
            `input[type="file"][data-key="${key}"]`
          );
          const file = fileInput?.files[0];
          result[key] = file ? await uploadImage(file) : null;
        } else if (typeof field === "object" && !field.type) {
          result[key] = await processData(field);
        } else if (field?.type) {
          result[key] =
            document.querySelector(`input[data-key="${key}"]`)?.value || "";
        }
      }

      return result;
    };

    try {
      const apiPayload = {};

      // Process each step in formData and add it to apiPayload
      for (const step of formData) {
        const stepData = await processData(step);
        apiPayload[step.heading] = stepData;
      }

      // Make the API call
      await api.post("/car/add", apiPayload);
      alert("Car data uploaded successfully!");
    } catch (error) {
      console.error("Error uploading data: ", error);
      alert("An error occurred while uploading data.");
    }
  };

  const handleNext = () => {
    if (currentStep < formData.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // const renderInput = (field, key) => {
  //   if (!field || typeof field !== "object") return null;

  //   // For fields with "img" and "val" keys
  //   if (field.img && field.val) {
  //     return (
  //       <div key={key} className="col-12">
  //         <label>{field.img.label}</label>
  //         <input
  //           type={field.img.type}
  //           className="form-control"
  //           data-key={`${key}-img`}
  //         />
  //         <label>{field.val.label}</label>
  //         <input
  //           type={field.val.type}
  //           className="form-control"
  //           data-key={`${key}-val`}
  //         />
  //       </div>
  //     );
  //   }

  //   // For regular fields
  //   return (
  //     <div key={key} className="col-12">
  //       <label>{field.label}</label>
  //       <input type={field.type} className="form-control" data-key={key} />
  //     </div>
  //   );
  // };

  return (
    <div className="container-fluid">
      <form>
        {/* <h2 className="my-4 text-center">{formData[currentStep]?.heading}</h2>

        <div className="row">
          {Object.keys(formData[currentStep]).map((key) => {
            if (key === "heading") return null; // Skip the heading field

            const field = formData[currentStep][key];

            // Handle nested objects
            if (typeof field === "object" && !field.type) {
              return (
                <div key={key} className="col-12 text-start">
                  <h4 className="my-4">{key}</h4>
                  {Object.keys(field).map((nestedKey) => {
                    const nestedField = field[nestedKey];
                    return renderInput(nestedField, `${key}-${nestedKey}`);
                  })}
                </div>
              );
            }

            // Render regular input fields
            return renderInput(field, key);
          })}
        </div> */}

        <div className="row">
          {currentStep === 0 ? (
            <>
              <h2 className="my-4 text-center">
                {formData[currentStep]?.heading}
              </h2>

              {/* inputs */}
              <div className="col-12">
                {/* 1 */}
                <label>{formData[currentStep]?.img?.label}</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    setCarDetails({ ...carDetails, img: e.target.files[0] });
                  }}
                  data-key="img"
                />

                {/* 2 */}
                <label>{formData[currentStep]?.name?.label}</label>
                <input
                  type="text"
                  placeholder="Honda City"
                  className="form-control"
                  onChange={(e) =>
                    setCarDetails({ ...carDetails, name: e.target.value })
                  }
                  data-key="val"
                />

                {/* 3 */}
                <label>{formData[currentStep]?.overallRating?.label}</label>
                <input
                  type="number"
                  placeholder="150"
                  className="form-control"
                  onChange={(e) =>
                    setCarDetails({
                      ...carDetails,
                      overallRating: e.target.value,
                    })
                  }
                  data-key="val"
                />

                {/* 4 */}
                <label>{formData[currentStep]?.mileage?.label}</label>
                <input
                  type="number"
                  placeholder="15000"
                  className="form-control"
                  onChange={(e) =>
                    setCarDetails({ ...carDetails, mileage: e.target.value })
                  }
                  data-key="val"
                />

                {/* 5 */}
                <label>{formData[currentStep]?.engineNo?.label}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="engine no"
                  onChange={(e) =>
                    setCarDetails({
                      ...carDetails,
                      engineNo: e.target.value,
                    })
                  }
                  data-key="val"
                />

                {/* 6 */}
                <label>{formData[currentStep]?.transmissionType?.label}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="transmission type"
                  onChange={(e) =>
                    setCarDetails({
                      ...carDetails,
                      transmissionType: e.target.value,
                    })
                  }
                  data-key="val"
                />

                {/* 7 */}
                <label>{formData[currentStep]?.cngInstall?.label}</label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-select"
                  onChange={(e) =>
                    setCarDetails({
                      ...carDetails,
                      cngInstall: e.target.value === "true",
                    })
                  }
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>

                {/* 8 */}
                <label>{formData[currentStep]?.engineCapacity?.label}</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="1496"
                  onChange={(e) =>
                    setCarDetails({
                      ...carDetails,
                      engineCapacity: e.target.value,
                    })
                  }
                  data-key="val"
                />

                {/* 9 */}
                <label>{formData[currentStep]?.chassisNo?.label}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="chassisNo"
                  onChange={(e) =>
                    setCarDetails({ ...carDetails, chassisNo: e.target.value })
                  }
                  data-key="val"
                />

                {/* 10 */}
                <label>{formData[currentStep]?.registeredCity?.label}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Karachi"
                  onChange={(e) =>
                    setCarDetails({
                      ...carDetails,
                      registeredCity: e.target.value,
                    })
                  }
                  data-key="val"
                />

                {/* 11 */}
                <label>{formData[currentStep]?.registeredYear?.label}</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="2020"
                  onChange={(e) =>
                    setCarDetails({
                      ...carDetails,
                      registeredYear: e.target.value,
                    })
                  }
                  data-key="val"
                />

                {/* 12 */}
                <label>{formData[currentStep]?.driveType?.label}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="drive type"
                  onChange={(e) =>
                    setCarDetails({ ...carDetails, driveType: e.target.value })
                  }
                  data-key="val"
                />

                {/* 13 */}
                <label>{formData[currentStep]?.registrationNo?.label}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="registration no"
                  onChange={(e) =>
                    setCarDetails({
                      ...carDetails,
                      registrationNo: e.target.value,
                    })
                  }
                  data-key="val"
                />

                {/* 14 */}
                <label>{formData[currentStep]?.colour?.label}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="color"
                  onChange={(e) =>
                    setCarDetails({ ...carDetails, colour: e.target.value })
                  }
                  data-key="val"
                />
              </div>
            </>
          ) : currentStep === 1 ? (
            <>
              <h2 className="my-4 text-center">
                {formData[currentStep]?.heading}
              </h2>

              {/* inputs */}
              <div className="col-12">
                {/* 1 */}
                <label>{formData[currentStep]?.acHeater?.label}</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="20"
                  onChange={(e) =>
                    setVehicleInspectionReport({
                      ...vehicleInspectionReport,
                      acHeater: e.target.value,
                    })
                  }
                  data-key="val"
                />

                {/* 2 */}
                <label>
                  {formData[currentStep]?.engineTransmissionClutch?.label}
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="20"
                  onChange={(e) =>
                    setVehicleInspectionReport({
                      ...vehicleInspectionReport,
                      engineTransmissionClutch: e.target.value,
                    })
                  }
                  data-key="val"
                />

                {/* 3 */}
                <label>{formData[currentStep]?.exterior?.label}</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="20"
                  onChange={(e) =>
                    setVehicleInspectionReport({
                      ...vehicleInspectionReport,
                      exterior: e.target.value,
                    })
                  }
                  data-key="val"
                />

                {/* 4 */}
                <label>{formData[currentStep]?.skeleton?.label}</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="20"
                  onChange={(e) =>
                    setVehicleInspectionReport({
                      ...vehicleInspectionReport,
                      skeleton: e.target.value,
                    })
                  }
                  data-key="val"
                />

                {/* 5 */}
                <label>{formData[currentStep]?.accidentChecklist?.label}</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="20"
                  onChange={(e) =>
                    setVehicleInspectionReport({
                      ...vehicleInspectionReport,
                      accidentChecklist: e.target.value,
                    })
                  }
                  data-key="val"
                />

                {/* 6 */}
                <label>{formData[currentStep]?.brakes?.label}</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="20"
                  onChange={(e) =>
                    setVehicleInspectionReport({
                      ...vehicleInspectionReport,
                      brakes: e.target.value,
                    })
                  }
                  data-key="val"
                />

                {/* 7 */}
                <label>
                  {formData[currentStep]?.suspensionSteering?.label}
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="20"
                  onChange={(e) =>
                    setVehicleInspectionReport({
                      ...vehicleInspectionReport,
                      suspensionSteering: e.target.value,
                    })
                  }
                  data-key="val"
                />

                {/* 8 */}
                <label>{formData[currentStep]?.interior?.label}</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="20"
                  onChange={(e) =>
                    setVehicleInspectionReport({
                      ...vehicleInspectionReport,
                      interior: e.target.value,
                    })
                  }
                  data-key="val"
                />

                {/* 9 */}
                <label>
                  {formData[currentStep]?.electricalElectronics?.label}
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="20"
                  onChange={(e) =>
                    setVehicleInspectionReport({
                      ...vehicleInspectionReport,
                      electricalElectronics: e.target.value,
                    })
                  }
                  data-key="val"
                />

                {/* 10 */}
                <label>{formData[currentStep]?.tyres?.label}</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="20"
                  onChange={(e) =>
                    setVehicleInspectionReport({
                      ...vehicleInspectionReport,
                      tyres: e.target.value,
                    })
                  }
                  data-key="val"
                />
              </div>
            </>
          ) : currentStep === 2 ? (
            <>
              <h2 className="my-4 text-center">
                {formData[currentStep]?.heading}
              </h2>

              {/* inputs */}
              <div className="col-12">
                {/* 1 */}
                <label>
                  {formData[currentStep]?.radiatorCoreSupport?.img?.label}
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      radiatorCoreSupport: {
                        ...bodyFrameAccidentChecklist.radiatorCoreSupport,
                        img: e.target.files[0],
                      },
                    })
                  }
                  data-key="val"
                />
                {/* 2 */}
                <label>
                  {formData[currentStep]?.radiatorCoreSupport?.val?.label}
                </label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      radiatorCoreSupport: {
                        ...bodyFrameAccidentChecklist.radiatorCoreSupport,
                        val: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 3 */}
                <label>
                  {formData[currentStep]?.rightStrutTowerApon?.img?.label}
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      rightStrutTowerApon: {
                        ...bodyFrameAccidentChecklist.rightStrutTowerApon,
                        img: e.target.files[0],
                      },
                    })
                  }
                  data-key="val"
                />

                {/* 4 */}
                <label>
                  {formData[currentStep]?.rightStrutTowerApon?.val?.label}
                </label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      rightStrutTowerApon: {
                        ...bodyFrameAccidentChecklist.rightStrutTowerApon,
                        val: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 5 */}
                <label>
                  {formData[currentStep]?.leftStrutTowerApon?.img?.label}
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      leftStrutTowerApon: {
                        ...bodyFrameAccidentChecklist.leftStrutTowerApon,
                        img: e.target.files[0],
                      },
                    })
                  }
                  data-key="val"
                />

                {/* 6 */}
                <label>
                  {formData[currentStep]?.leftStrutTowerApon?.val?.label}
                </label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      leftStrutTowerApon: {
                        ...bodyFrameAccidentChecklist.leftStrutTowerApon,
                        val: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 7 */}
                <label>
                  {formData[currentStep]?.rightFrontRail?.img?.label}
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      rightFrontRail: {
                        ...bodyFrameAccidentChecklist.rightFrontRail,
                        img: e.target.files[0],
                      },
                    })
                  }
                  data-key="val"
                />

                {/* 8 */}
                <label>
                  {formData[currentStep]?.rightFrontRail?.val?.label}
                </label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      rightFrontRail: {
                        ...bodyFrameAccidentChecklist.rightFrontRail,
                        val: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 9 */}
                <label>
                  {formData[currentStep]?.leftFrontRail?.img?.label}
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      leftFrontRail: {
                        ...bodyFrameAccidentChecklist.leftFrontRail,
                        img: e.target.files[0],
                      },
                    })
                  }
                  data-key="val"
                />

                {/* 10 */}
                <label>
                  {formData[currentStep]?.leftFrontRail?.val?.label}
                </label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      leftFrontRail: {
                        ...bodyFrameAccidentChecklist.leftFrontRail,
                        val: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 11 */}
                <label>
                  {formData[currentStep]?.cowlPanelFirewall?.img?.label}
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      cowlPanelFirewall: {
                        ...bodyFrameAccidentChecklist.cowlPanelFirewall,
                        img: e.target.files[0],
                      },
                    })
                  }
                  data-key="val"
                />

                {/* 12 */}
                <label>
                  {formData[currentStep]?.cowlPanelFirewall?.val?.label}
                </label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,

                      cowlPanelFirewall: {
                        ...bodyFrameAccidentChecklist.cowlPanelFirewall,
                        val: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 13 */}
                <label> {formData[currentStep]?.rightAPillar?.label}</label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      rightAPillar: e.target.value === "true",
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 14 */}
                <label> {formData[currentStep]?.leftAPillar?.label}</label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      leftAPillar: e.target.value === "true",
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 15 */}
                <label> {formData[currentStep]?.rightBPillar?.label}</label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      rightBPillar: e.target.value === "true",
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 16 */}
                <label> {formData[currentStep]?.leftBPillar?.label}</label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      leftBPillar: e.target.value === "true",
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 17 */}
                <label> {formData[currentStep]?.rightCPillar?.label}</label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      rightCPillar: e.target.value === "true",
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 18 */}
                <label> {formData[currentStep]?.leftCPillar?.label}</label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      leftCPillar: e.target.value === "true",
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 19 */}
                <label>{formData[currentStep]?.bootFloor?.img?.label}</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      bootFloor: {
                        ...bodyFrameAccidentChecklist.bootFloor,
                        img: e.target.files[0],
                      },
                    })
                  }
                  data-key="val"
                />

                {/* 20 */}
                <label>{formData[currentStep]?.bootFloor?.val?.label}</label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      bootFloor: {
                        ...bodyFrameAccidentChecklist.bootFloor,
                        val: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 21 */}
                <label>
                  {formData[currentStep]?.bootLockPillar?.img?.label}
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      bootLockPillar: {
                        ...bodyFrameAccidentChecklist.bootLockPillar,
                        img: e.target.files[0],
                      },
                    })
                  }
                  data-key="val"
                />

                {/* 22 */}
                <label>
                  {formData[currentStep]?.bootLockPillar?.val?.label}
                </label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      bootLockPillar: {
                        ...bodyFrameAccidentChecklist.bootLockPillar,
                        val: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 23 */}
                <label>{formData[currentStep]?.rearSubFrame?.img?.label}</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      rearSubFrame: {
                        ...bodyFrameAccidentChecklist.rearSubFrame,
                        img: e.target.files[0],
                      },
                    })
                  }
                  data-key="val"
                />

                {/* 24 */}
                <label>{formData[currentStep]?.rearSubFrame?.val?.label}</label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      rearSubFrame: {
                        ...bodyFrameAccidentChecklist.rearSubFrame,
                        val: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 25 */}
                <label>
                  {formData[currentStep]?.frontSubFrame?.img?.label}
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      frontSubFrame: {
                        ...bodyFrameAccidentChecklist.frontSubFrame,
                        img: e.target.files[0],
                      },
                    })
                  }
                  data-key="val"
                />

                {/* 24 */}
                <label>
                  {formData[currentStep]?.frontSubFrame?.val?.label}
                </label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    setBodyFrameAccidentChecklist({
                      ...bodyFrameAccidentChecklist,
                      frontSubFrame: {
                        ...bodyFrameAccidentChecklist.frontSubFrame,
                        val: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>
              </div>
            </>
          ) : currentStep === 3 ? (
            <>
              <h2 className="my-4 text-center">
                {formData[currentStep]?.heading}
              </h2>

              {/* inputs */}

              <div className="col-12">
                {/* 01 */}
                <label>
                  {
                    formData[currentStep]?.fluidsFiltersCheck
                      ?.fluidsFiltersCheck?.img?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      fluidsFiltersCheck: {
                        ...engineTransmissionClutch.fluidsFiltersCheck,
                        fluidsFiltersCheck: {
                          ...engineTransmissionClutch.fluidsFiltersCheck
                            .fluidsFiltersCheck,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                  data-key="val"
                />

                {/* 02 */}
                <label>
                  {
                    formData[currentStep]?.fluidsFiltersCheck
                      ?.fluidsFiltersCheck?.val?.label
                  }
                </label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      fluidsFiltersCheck: {
                        ...engineTransmissionClutch.fluidsFiltersCheck,
                        fluidsFiltersCheck: {
                          ...engineTransmissionClutch.fluidsFiltersCheck
                            .fluidsFiltersCheck,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />

                {/* 03 */}
                <label>
                  {
                    formData[currentStep]?.fluidsFiltersCheck?.engineOilLeakage
                      ?.img?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      fluidsFiltersCheck: {
                        ...engineTransmissionClutch?.fluidsFiltersCheck,
                        engineOilLeakage: {
                          ...engineTransmissionClutch?.fluidsFiltersCheck
                            ?.engineOilLeakage,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                  data-key="val"
                />

                {/* 04 */}
                <label>
                  {
                    formData[currentStep]?.fluidsFiltersCheck?.engineOilLeakage
                      ?.val?.label
                  }
                </label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      fluidsFiltersCheck: {
                        ...engineTransmissionClutch.fluidsFiltersCheck,
                        engineOilLeakage: {
                          ...engineTransmissionClutch.fluidsFiltersCheck
                            .engineOilLeakage,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />

                {/* 05 */}
                <label>
                  {
                    formData[currentStep]?.fluidsFiltersCheck
                      ?.transmissionOilLeakage?.img?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      fluidsFiltersCheck: {
                        ...engineTransmissionClutch?.fluidsFiltersCheck,
                        transmissionOilLeakage: {
                          ...engineTransmissionClutch?.fluidsFiltersCheck
                            ?.transmissionOilLeakage,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                  data-key="val"
                />

                {/* 06 */}
                <label>
                  {
                    formData[currentStep]?.fluidsFiltersCheck
                      ?.transmissionOilLeakage?.val?.label
                  }
                </label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      fluidsFiltersCheck: {
                        ...engineTransmissionClutch.fluidsFiltersCheck,
                        transmissionOilLeakage: {
                          ...engineTransmissionClutch.fluidsFiltersCheck
                            .transmissionOilLeakage,

                          val: e.target.value,
                        },
                      },
                    })
                  }
                />

                {/* 07 */}
                <label>
                  {
                    formData[currentStep]?.fluidsFiltersCheck?.coolantLeakage
                      ?.label
                  }
                </label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      fluidsFiltersCheck: {
                        ...engineTransmissionClutch.fluidsFiltersCheck,
                        coolantLeakage: e.target.value,
                      },
                    })
                  }
                />

                {/* 08 */}
                <label>
                  {
                    formData[currentStep]?.fluidsFiltersCheck?.brakeOilLeakage
                      ?.label
                  }
                </label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      fluidsFiltersCheck: {
                        ...engineTransmissionClutch.fluidsFiltersCheck,
                        brakeOilLeakage: e.target.value,
                      },
                    })
                  }
                />

                {/* 09 */}
                <label>
                  {formData[currentStep]?.mechanicalCheck?.wires?.img?.label}
                </label>
                <br />
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      mechanicalCheck: {
                        ...engineTransmissionClutch.mechanicalCheck,
                        wires: { img: e.target.files[0] },
                      },
                    })
                  }
                />

                {/* 10 */}
                <label>
                  {formData[currentStep]?.mechanicalCheck?.wires?.val?.label}
                </label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      mechanicalCheck: {
                        ...engineTransmissionClutch.mechanicalCheck,
                        wires: { val: e.target.value === "true" },
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 11 */}
                <label>
                  {formData[currentStep]?.mechanicalCheck?.engineBlow?.label}
                </label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      mechanicalCheck: {
                        ...engineTransmissionClutch.mechanicalCheck,
                        engineBlow: e.target.value,
                      },
                    })
                  }
                />

                {/* 12 */}
                <label>
                  {formData[currentStep]?.mechanicalCheck?.engineNoise?.label}
                </label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      mechanicalCheck: {
                        ...engineTransmissionClutch.mechanicalCheck,
                        engineNoise: e.target.value,
                      },
                    })
                  }
                />

                {/* 13 */}
                <label>
                  {
                    formData[currentStep]?.mechanicalCheck?.engineVibration
                      ?.label
                  }
                </label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      mechanicalCheck: {
                        ...engineTransmissionClutch.mechanicalCheck,
                        engineVibration: e.target.value,
                      },
                    })
                  }
                />

                {/* 14 */}
                <label>
                  {formData[currentStep]?.mechanicalCheck?.engineMounts?.label}
                </label>
                <br />
                <select
                  className="form-control"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      mechanicalCheck: {
                        ...engineTransmissionClutch.mechanicalCheck,
                        engineVibration: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 15 */}
                <label>
                  {formData[currentStep]?.mechanicalCheck?.hoses?.img?.label}
                </label>
                <br />
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      mechanicalCheck: {
                        ...engineTransmissionClutch.mechanicalCheck,
                        hoses: {
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 16 */}
                <label>
                  {formData[currentStep]?.mechanicalCheck?.hoses?.val?.label}
                </label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  placeholder="Enter Value"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      mechanicalCheck: {
                        ...engineTransmissionClutch.mechanicalCheck,
                        hoses: { val: e.target.value === "true" },
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 17 */}
                <label>
                  {formData[currentStep]?.exhaustCheck?.exhaustSound?.label}
                </label>
                <br />
                <select
                  className="form-control"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      exhaustCheck: {
                        ...engineTransmissionClutch.exhaustCheck,
                        exhaustSound: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 18 */}
                <label>
                  {formData[currentStep]?.engineCoolingSystem?.radiator?.label}
                </label>
                <br />
                <select
                  className="form-control"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      exhaustCheck: {
                        ...engineTransmissionClutch.engineCoolingSystem,
                        radiator: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 19 */}
                <label>
                  {
                    formData[currentStep]?.engineCoolingSystem?.suctionFan
                      ?.label
                  }
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Value"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      engineCoolingSystem: {
                        ...engineTransmissionClutch.engineCoolingSystem,
                        suctionFan: e.target.value,
                      },
                    })
                  }
                />

                {/* 20 */}
                <label>
                  {
                    formData[currentStep]?.transmissionCheck?.starterOperation
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Value"
                  onChange={(e) =>
                    setEngineTransmissionClutch({
                      ...engineTransmissionClutch,
                      transmissionCheck: {
                        ...engineTransmissionClutch.engineCoolingSystem,
                        starterOperation: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </>
          ) : currentStep === 4 ? (
            <>
              <h2 className="text-center mt-4">
                {formData[currentStep]?.heading}
              </h2>

              {/* inputs */}
              <div className="col-12">
                {/* 1 */}
                <label>
                  {
                    formData[currentStep]?.mechanicalCheck?.frontRightDisc
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setBrakes({
                      ...brakes,
                      mechanicalCheck: {
                        ...brakes.mechanicalCheck,
                        frontRightDisc: e.target.value,
                      },
                    })
                  }
                />

                {/* 2 */}
                <label>
                  {formData[currentStep]?.mechanicalCheck?.frontLeftDisc?.label}
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setBrakes({
                      ...brakes,
                      mechanicalCheck: {
                        ...brakes.mechanicalCheck,
                        frontLeftDisc: e.target.value,
                      },
                    })
                  }
                />

                {/* 3 */}
                <label>
                  {
                    formData[currentStep]?.mechanicalCheck?.frontRightBrakePad
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setBrakes({
                      ...brakes,
                      mechanicalCheck: {
                        ...brakes.mechanicalCheck,
                        frontRightBrakePad: e.target.value,
                      },
                    })
                  }
                />

                {/* 4 */}
                <label>
                  {
                    formData[currentStep]?.mechanicalCheck?.frontLeftBrakePad
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setBrakes({
                      ...brakes,
                      mechanicalCheck: {
                        ...brakes.mechanicalCheck,
                        frontLeftBrakePad: e.target.value,
                      },
                    })
                  }
                />

                {/* 5 */}
                <label>
                  {
                    formData[currentStep]?.mechanicalCheck?.parkingHandBrake
                      ?.val?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setBrakes({
                      ...brakes,
                      mechanicalCheck: {
                        ...brakes.mechanicalCheck,
                        parkingHandBrake: {
                          ...brakes.mechanicalCheck.parkingHandBrake,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />

                {/* 6 */}
                <label>
                  {
                    formData[currentStep]?.mechanicalCheck?.parkingHandBrake
                      ?.img?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  data-key="mechanicalCheck-parkingHandBrake-img"
                  onChange={(e) =>
                    setBrakes({
                      ...brakes,
                      mechanicalCheck: {
                        ...brakes.mechanicalCheck,
                        parkingHandBrake: {
                          ...brakes.mechanicalCheck.parkingHandBrake,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />
              </div>
            </>
          ) : currentStep === 5 ? (
            <>
              <h2 className="text-center mt-4">
                {formData[currentStep]?.heading}
              </h2>

              {/* inputs */}

              <div className="col-12">
                {/* 01 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.steeringWheelPlay
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        steeringWheelPlay: e.target.value,
                      },
                    })
                  }
                />
                {/* 02 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.rightBallJoint?.img
                      ?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Enter Value"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        rightBallJoint: {
                          ...suspensionSteering.frontSuspension.rightBallJoint,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />
                {/* 03 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.rightBallJoint?.val
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Value"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        rightBallJoint: {
                          ...suspensionSteering.frontSuspension.rightBallJoint,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />
                {/* 04 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.leftBallJoint?.img
                      ?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Enter Value"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        leftBallJoint: {
                          ...suspensionSteering.frontSuspension.leftBallJoint,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />
                {/* 05 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.leftBallJoint?.val
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        leftBallJoint: {
                          ...suspensionSteering.frontSuspension.leftBallJoint,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />
                {/* 06 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.rightZLinks?.img
                      ?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Enter Value"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        rightZLinks: {
                          ...suspensionSteering.frontSuspension.rightZLinks,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />
                {/* 07 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.rightZLinks?.val
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        rightZLinks: {
                          ...suspensionSteering.frontSuspension.rightZLinks,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />
                {/* 08 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.leftZLinks?.img
                      ?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Enter Value"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        leftZLinks: {
                          ...suspensionSteering.frontSuspension.leftZLinks,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />
                {/* 09 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.leftZLinks?.val
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        leftZLinks: {
                          ...suspensionSteering.frontSuspension.leftZLinks,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />
                {/* 10 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.rightTieRodEnd?.img
                      ?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Enter Value"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        rightTieRodEnd: {
                          ...suspensionSteering.frontSuspension.rightTieRodEnd,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />
                {/* 11 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.rightTieRodEnd?.val
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        rightTieRodEnd: {
                          ...suspensionSteering.frontSuspension.rightTieRodEnd,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />
                {/* 12 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.leftTieRodEnd?.img
                      ?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Enter Value"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        leftTieRodEnd: {
                          ...suspensionSteering.frontSuspension.leftTieRodEnd,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />
                {/* 13 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.leftTieRodEnd?.val
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        leftTieRodEnd: {
                          ...suspensionSteering.frontSuspension.leftTieRodEnd,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />
                {/* 14 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.frontRightBoots?.img
                      ?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Enter Value"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        frontRightBoots: {
                          ...suspensionSteering.frontSuspension.frontRightBoots,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />
                {/* 15 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.frontRightBoots?.val
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        frontRightBoots: {
                          ...suspensionSteering.frontSuspension.frontRightBoots,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />
                {/* 16 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.frontLeftBoots?.img
                      ?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Enter Value"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        frontLeftBoots: {
                          ...suspensionSteering.frontSuspension.frontLeftBoots,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />
                {/* 17 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.frontLeftBoots?.val
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        frontLeftBoots: {
                          ...suspensionSteering.frontSuspension.frontLeftBoots,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />
                {/* 18 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.frontRightBushes
                      ?.img?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Enter Value"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        frontRightBushes: {
                          ...suspensionSteering.frontSuspension
                            .frontRightBushes,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />
                {/* 19 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.frontRightBushes
                      ?.val?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        frontRightBushes: {
                          ...suspensionSteering.frontSuspension
                            .frontRightBushes,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />
                {/* 20 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.frontLeftBushes?.img
                      ?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Enter Value"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        frontLeftBushes: {
                          ...suspensionSteering.frontSuspension.frontLeftBushes,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />
                {/* 21 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.frontLeftBushes?.val
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        frontLeftBushes: {
                          ...suspensionSteering.frontSuspension.frontLeftBushes,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />
                {/* 22 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.frontRightShock?.img
                      ?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Enter Value"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        frontRightShock: {
                          ...suspensionSteering.frontSuspension.frontRightShock,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />
                {/* 23 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.frontRightShock?.val
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        frontRightShock: {
                          ...suspensionSteering.frontSuspension.frontRightShock,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />
                {/* 24 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.frontLeftShock?.img
                      ?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Enter Value"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        frontLeftShock: {
                          ...suspensionSteering.frontSuspension.frontLeftShock,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />
                {/* 25 */}
                <label>
                  {
                    formData[currentStep]?.frontSuspension?.frontLeftShock?.val
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      frontSuspension: {
                        ...suspensionSteering.frontSuspension,
                        frontLeftShock: {
                          ...suspensionSteering.frontSuspension.frontLeftShock,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />

                {/* 26 */}
                <label>
                  {
                    formData[currentStep]?.rearSuspension?.rearRightBushes?.img
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      rearSuspension: {
                        ...suspensionSteering.rearSuspension,
                        rearRightBushes: {
                          ...suspensionSteering.rearSuspension.rearRightBushes,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 27 */}
                <label>
                  {
                    formData[currentStep]?.rearSuspension?.rearRightBushes?.val
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      rearSuspension: {
                        ...suspensionSteering.rearSuspension,
                        rearRightBushes: {
                          ...suspensionSteering.rearSuspension.rearRightBushes,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />

                {/* 28 */}
                <label>
                  {
                    formData[currentStep]?.rearSuspension?.rearLeftBushes?.img
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      rearSuspension: {
                        ...suspensionSteering.rearSuspension,
                        rearLeftBushes: {
                          ...suspensionSteering.rearSuspension.rearLeftBushes,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 29 */}
                <label>
                  {
                    formData[currentStep]?.rearSuspension?.rearLeftBushes?.val
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      rearSuspension: {
                        ...suspensionSteering.rearSuspension,
                        rearLeftBushes: {
                          ...suspensionSteering.rearSuspension.rearLeftBushes,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />

                {/* 30 */}
                <label>
                  {
                    formData[currentStep]?.rearSuspension?.rearRightShock?.img
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      rearSuspension: {
                        ...suspensionSteering.rearSuspension,
                        rearRightShock: {
                          ...suspensionSteering.rearSuspension.rearRightShock,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 31 */}
                <label>
                  {
                    formData[currentStep]?.rearSuspension?.rearRightShock?.val
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      rearSuspension: {
                        ...suspensionSteering.rearSuspension,
                        rearRightShock: {
                          ...suspensionSteering.rearSuspension.rearRightShock,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />

                {/* 32 */}
                <label>
                  {
                    formData[currentStep]?.rearSuspension?.rearLeftShock?.img
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      rearSuspension: {
                        ...suspensionSteering.rearSuspension,
                        rearLeftShock: {
                          ...suspensionSteering.rearSuspension.rearLeftShock,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 33 */}
                <label>
                  {
                    formData[currentStep]?.rearSuspension?.rearLeftShock?.val
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setSuspensionSteering({
                      ...suspensionSteering,
                      rearSuspension: {
                        ...suspensionSteering.rearSuspension,
                        rearLeftShock: {
                          ...suspensionSteering.rearSuspension.rearLeftShock,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
            </>
          ) : currentStep === 6 ? (
            <>
              <h2 className="text-center mt-4">
                {formData[currentStep]?.heading}
              </h2>

              {/* inputs */}
              <div className="col-12">
                {/* 01 */}
                <label>
                  {
                    formData[currentStep]?.steeringControls
                      ?.steeringWheelCondition?.img?.label
                  }
                </label>
                <input
                  type="file"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setInterior({
                      ...interior,
                      steeringControls: {
                        ...interior.steeringControls,
                        steeringWheelCondition: {
                          ...interior.steeringControls.steeringWheelCondition,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 02 */}
                <label>
                  {
                    formData[currentStep]?.steeringControls
                      ?.steeringWheelCondition?.val?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  data-key="frontSuspension-steeringWheelPlay-img"
                  onChange={(e) =>
                    setInterior({
                      ...interior,
                      steeringControls: {
                        ...interior.steeringControls,
                        steeringWheelCondition: {
                          ...interior.steeringControls.steeringWheelCondition,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />

                {/* 03 */}
                <label>
                  {formData[currentStep]?.steeringControls?.horn?.label}
                </label>
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      steeringControls: {
                        ...interior.steeringControls,
                        horn: e.target.value === "true",
                      },
                    });
                  }}
                  className="form-control"
                >
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select>

                {/* 04 */}
                <label>
                  {
                    formData[currentStep]?.steeringControls?.lightsLeverSwitch
                      ?.label
                  }
                </label>
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      steeringControls: {
                        ...interior.steeringControls,
                        lightsLeverSwitch: e.target.value === "true",
                      },
                    });
                  }}
                  className="form-control"
                >
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select>

                {/* 05 */}
                <label>
                  {
                    formData[currentStep]?.steeringControls?.wiperWasherLever
                      ?.label
                  }
                </label>
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      steeringControls: {
                        ...interior.steeringControls,
                        wiperWasherLever: e.target.value === "true",
                      },
                    });
                  }}
                  className="form-control"
                >
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select>

                {/* 06 */}
                <label>
                  {formData[currentStep]?.mirrors?.rightSideMirror?.label}
                </label>
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      mirrors: {
                        ...interior.mirrors,
                        rightSideMirror: e.target.value === "true",
                      },
                    });
                  }}
                  className="form-control"
                >
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select>

                {/* 07 */}
                <label>
                  {formData[currentStep]?.mirrors?.leftSideMirror?.label}
                </label>
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      mirrors: {
                        ...interior.mirrors,
                        leftSideMirror: e.target.value === "true",
                      },
                    });
                  }}
                  className="form-control"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 08 */}
                <label>
                  {formData[currentStep]?.mirrors?.rearViewMirrorDimmer?.label}
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setInterior({
                      ...interior,
                      mirrors: {
                        ...interior.mirrors,
                        rearViewMirrorDimmer: e.target.value,
                      },
                    })
                  }
                />

                {/* 09 */}
                <label>
                  {
                    formData[currentStep]?.seats?.rightSeatAdjusterRecliner
                      ?.label
                  }
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      seats: {
                        ...interior.seats,
                        rightSeatAdjusterRecliner: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 10 */}
                <label>
                  {
                    formData[currentStep]?.seats?.leftSeatAdjusterRecliner
                      ?.label
                  }
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      seats: {
                        ...interior.seats,
                        leftSeatAdjusterRecliner: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 11 */}
                <label>
                  {
                    formData[currentStep]?.seats?.rightSeatAdjusterLearTrack
                      ?.label
                  }
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      seats: {
                        ...interior.seats,
                        rightSeatAdjusterLearTrack: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 12 */}
                <label>
                  {
                    formData[currentStep]?.seats?.leftSeatAdjusterLearTrack
                      ?.label
                  }
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      seats: {
                        ...interior.seats,
                        leftSeatAdjusterLearTrack: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 13 */}
                <label>
                  {formData[currentStep]?.seats?.rightSeatBelt?.label}
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      seats: {
                        ...interior.seats,
                        rightSeatBelt: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 14 */}
                <label>
                  {formData[currentStep]?.seats?.leftSeatBelt?.label}
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      seats: {
                        ...interior.seats,
                        leftSeatBelt: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 15 */}
                <label>
                  {formData[currentStep]?.seats?.rearSeatBelt?.label}
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      seats: {
                        ...interior.seats,
                        rearSeatBelt: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 16 */}
                <label>
                  {formData[currentStep]?.seats?.gloveBox?.img?.label}
                </label>
                <input
                  className="form-control"
                  type="file"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      seats: {
                        ...interior.seats,
                        gloveBox: {
                          ...interior.seats.gloveBox,
                          img: e.target.files[0],
                        },
                      },
                    });
                  }}
                />

                {/* 17 */}
                <label>
                  {formData[currentStep]?.seats?.gloveBox?.val?.label}
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      seats: {
                        ...interior.seats,
                        gloveBox: {
                          ...interior.seats.gloveBox,
                          val: e.target.value === "true",
                        },
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 18 */}
                <label>
                  {
                    formData[currentStep]?.powerAndCentralLocking
                      ?.frontRightPowerWindowLever?.label
                  }
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      powerAndCentralLocking: {
                        ...interior.powerAndCentralLocking,
                        frontRightPowerWindowLever: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 19 */}
                <label>
                  {
                    formData[currentStep]?.powerAndCentralLocking
                      ?.frontLeftPowerWindowLever?.label
                  }
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      powerAndCentralLocking: {
                        ...interior.powerAndCentralLocking,
                        frontLeftPowerWindowLever: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 20 */}
                <label>
                  {
                    formData[currentStep]?.powerAndCentralLocking
                      ?.rearRightPowerWindowLever?.label
                  }
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      powerAndCentralLocking: {
                        ...interior.powerAndCentralLocking,
                        rearRightPowerWindowLever: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 21 */}
                <label>
                  {
                    formData[currentStep]?.powerAndCentralLocking
                      ?.rearLeftPowerWindowLever?.label
                  }
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      powerAndCentralLocking: {
                        ...interior.powerAndCentralLocking,
                        rearLeftPowerWindowLever: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 22 */}
                <label>
                  {
                    formData[currentStep]?.powerAndCentralLocking
                      ?.autoLockButton?.label
                  }
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      powerAndCentralLocking: {
                        ...interior.powerAndCentralLocking,
                        autoLockButton: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 23 */}
                <label>
                  {
                    formData[currentStep]?.powerAndCentralLocking
                      ?.windowSafetyLock?.label
                  }
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      powerAndCentralLocking: {
                        ...interior.powerAndCentralLocking,
                        windowSafetyLock: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 24 */}
                <label>
                  {
                    formData[currentStep]?.dashRoofControls?.interiorLightings
                      ?.label
                  }
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      dashRoofControls: {
                        ...interior.dashRoofControls,
                        interiorLightings: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 25 */}
                <label>
                  {
                    formData[currentStep]?.dashRoofControls?.dashControlsAC
                      ?.label
                  }
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      dashRoofControls: {
                        ...interior.dashRoofControls,
                        dashControlsAC: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 26 */}
                <label>
                  {
                    formData[currentStep]?.dashRoofControls?.dashControlsDeFog
                      ?.label
                  }
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      dashRoofControls: {
                        ...interior.dashRoofControls,
                        dashControlsDeFog: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 27 */}
                <label>
                  {
                    formData[currentStep]?.dashRoofControls
                      ?.dashontrolsHazzardLights?.label
                  }
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      dashRoofControls: {
                        ...interior.dashRoofControls,
                        dashontrolsHazzardLights: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 28 */}
                <label>
                  {formData[currentStep]?.dashRoofControls?.audioVideo?.label}
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      dashRoofControls: {
                        ...interior.dashRoofControls,
                        audioVideo: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 29 */}
                <label>
                  {
                    formData[currentStep]?.dashRoofControls?.trunkReleaseLever
                      ?.label
                  }
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      dashRoofControls: {
                        ...interior.dashRoofControls,
                        trunkReleaseLever: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 30 */}
                <label>
                  {
                    formData[currentStep]?.dashRoofControls?.fuelCapReleaseLever
                      ?.label
                  }
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      dashRoofControls: {
                        ...interior.dashRoofControls,
                        fuelCapReleaseLever: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 31 */}
                <label>
                  {
                    formData[currentStep]?.dashRoofControls?.bonnetReleaseLever
                      ?.label
                  }
                </label>
                <select
                  name=""
                  className=" form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      dashRoofControls: {
                        ...interior.dashRoofControls,
                        bonnetReleaseLever: e.target.value === "true",
                      },
                    });
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                {/* 32 */}
                <label>
                  {formData[currentStep]?.poshish?.roofPoshish?.img?.label}
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      poshish: {
                        ...interior.poshish,
                        roofPoshish: {
                          ...interior.poshish.roofPoshish,
                          img: e.target.files[0],
                        },
                      },
                    });
                  }}
                  data-key="val"
                />

                {/* 33 */}
                <label>
                  {formData[currentStep]?.poshish?.roofPoshish?.val?.label}
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      poshish: {
                        ...interior.poshish,
                        roofPoshish: {
                          ...interior.poshish.roofPoshish,
                          val: e.target.value,
                        },
                      },
                    });
                  }}
                  data-key="val"
                />

                {/* 34 */}
                <label>
                  {formData[currentStep]?.poshish?.floorMat?.img?.label}
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      poshish: {
                        ...interior.poshish,
                        floorMat: {
                          ...interior.poshish.floorMat,
                          img: e.target.files[0],
                        },
                      },
                    });
                  }}
                  data-key="val"
                />

                {/* 35 */}
                <label>
                  {formData[currentStep]?.poshish?.floorMat?.val?.label}
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      poshish: {
                        ...interior.poshish,
                        floorMat: {
                          ...interior.poshish.floorMat,
                          val: e.target.value,
                        },
                      },
                    });
                  }}
                  data-key="val"
                />

                {/* 36 */}
                <label>
                  {
                    formData[currentStep]?.poshish?.frontRightSeatPoshish?.img
                      ?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      poshish: {
                        ...interior.poshish,
                        frontRightSeatPoshish: {
                          ...interior.poshish.frontRightSeatPoshish,
                          img: e.target.files[0],
                        },
                      },
                    });
                  }}
                  data-key="val"
                />

                {/* 37 */}
                <label>
                  {
                    formData[currentStep]?.poshish?.frontRightSeatPoshish?.val
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      poshish: {
                        ...interior.poshish,
                        frontRightSeatPoshish: {
                          ...interior.poshish.frontRightSeatPoshish,
                          val: e.target.value,
                        },
                      },
                    });
                  }}
                  data-key="val"
                />

                {/* 38 */}
                <label>
                  {
                    formData[currentStep]?.poshish?.frontleftSeatPoshish?.img
                      ?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      poshish: {
                        ...interior.poshish,
                        frontleftSeatPoshish: {
                          ...interior.poshish.frontleftSeatPoshish,
                          img: e.target.files[0],
                        },
                      },
                    });
                  }}
                  data-key="val"
                />

                {/* 39 */}
                <label>
                  {
                    formData[currentStep]?.poshish?.frontleftSeatPoshish?.val
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      poshish: {
                        ...interior.poshish,
                        frontleftSeatPoshish: {
                          ...interior.poshish.frontleftSeatPoshish,
                          val: e.target.value,
                        },
                      },
                    });
                  }}
                  data-key="val"
                />

                {/* 40 */}
                <label>
                  {formData[currentStep]?.poshish?.rearSeatPoshish?.img?.label}
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      poshish: {
                        ...interior.poshish,
                        rearSeatPoshish: {
                          ...interior.poshish.rearSeatPoshish,
                          img: e.target.files[0],
                        },
                      },
                    });
                  }}
                  data-key="val"
                />

                {/* 41 */}
                <label>
                  {formData[currentStep]?.poshish?.rearSeatPoshish?.val?.label}
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      poshish: {
                        ...interior.poshish,
                        rearSeatPoshish: {
                          ...interior.poshish.rearSeatPoshish,
                          val: e.target.value,
                        },
                      },
                    });
                  }}
                  data-key="val"
                />

                {/* 42 */}
                <label>
                  {
                    formData[currentStep]?.poshish?.dashboardCondition?.img
                      ?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      poshish: {
                        ...interior.poshish,
                        dashboardCondition: {
                          ...interior.poshish.dashboardCondition,
                          img: e.target.files[0],
                        },
                      },
                    });
                  }}
                  data-key="val"
                />

                {/* 41 */}
                <label>
                  {
                    formData[currentStep]?.poshish?.dashboardCondition?.val
                      ?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      poshish: {
                        ...interior.poshish,
                        dashboardCondition: {
                          ...interior.poshish.dashboardCondition,
                          val: e.target.value,
                        },
                      },
                    });
                  }}
                  data-key="val"
                />

                {/* 42 */}
                <label>
                  {formData[currentStep]?.equipment?.spareTire?.img?.label}
                </label>
                <input
                  type="file"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      equipment: {
                        ...interior.equipment,
                        spareTire: {
                          ...interior.equipment.spareTire,
                          img: e.target.files[0],
                        },
                      },
                    });
                  }}
                  data-key="val"
                />

                {/* 43 */}
                <label>
                  {formData[currentStep]?.equipment?.spareTire?.val?.label}
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      equipment: {
                        ...interior.equipment,
                        spareTire: {
                          ...interior.equipment.spareTire,
                          val: e.target.value,
                        },
                      },
                    });
                  }}
                  data-key="val"
                />

                {/* 44 */}
                <label>{formData[currentStep]?.equipment?.jack?.label}</label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      equipment: {
                        ...interior.equipment,
                        jack: e.target.value,
                      },
                    });
                  }}
                  data-key="val"
                />

                {/* 45 */}
                <label>
                  {formData[currentStep]?.equipment?.tools?.img?.label}
                </label>
                <input
                  type="file"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      equipment: {
                        ...interior.equipment,
                        tools: {
                          ...interior.equipment.tools,
                          img: e.target.files[0],
                        },
                      },
                    });
                  }}
                  data-key="val"
                />

                {/* 44 */}
                <label>
                  {formData[currentStep]?.equipment?.tools?.val?.label}
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) => {
                    setInterior({
                      ...interior,
                      equipment: {
                        ...interior.equipment,
                        tools: {
                          ...interior.equipment.tools,
                          val: e.target.value,
                        },
                      },
                    });
                  }}
                  data-key="val"
                />
              </div>
            </>
          ) : currentStep === 7 ? (
            <>
              <h2 className="text-center mt-4">
                {formData[currentStep]?.heading}
              </h2>

              {/* inputs */}

              <div className="col-12">
                {/* 01 */}
                <label>
                  {formData[currentStep]?.acHeaterCheckUp?.acFitted?.label}
                </label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    setAcHeater({
                      ...acHeater,
                      acHeaterCheckUp: {
                        ...acHeater.acHeaterCheckUp,
                        acFitted: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 02 */}
                <label>
                  {formData[currentStep]?.acHeaterCheckUp?.acOperational?.label}
                </label>
                <br />
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    setAcHeater({
                      ...acHeater,
                      acHeaterCheckUp: {
                        ...acHeater.acHeaterCheckUp,
                        acOperational: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 03 */}
                <label>
                  {formData[currentStep]?.acHeaterCheckUp?.blower?.label}
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setAcHeater({
                      ...acHeater,
                      acHeaterCheckUp: {
                        ...acHeater.acHeaterCheckUp,
                        blower: e.target.value,
                      },
                    })
                  }
                />
                {/* 04 */}
                <label>
                  {formData[currentStep]?.acHeaterCheckUp?.cooling?.label}
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setAcHeater({
                      ...acHeater,
                      acHeaterCheckUp: {
                        ...acHeater.acHeaterCheckUp,
                        cooling: e.target.value,
                      },
                    })
                  }
                />
                {/* 05 */}
                <label>
                  {formData[currentStep]?.acHeaterCheckUp?.heating?.label}
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setAcHeater({
                      ...acHeater,
                      acHeaterCheckUp: {
                        ...acHeater.acHeaterCheckUp,
                        heating: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </>
          ) : currentStep === 8 ? (
            <>
              <h2 className="text-center mt-4">
                {formData[currentStep]?.heading}
              </h2>

              <div className="c0l-12">
                {/* inputs */}

                {/* 01 */}
                <label>
                  {
                    formData[currentStep]?.computerCheckUp?.malfunctionCheck
                      ?.img?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setElectricalElectronics({
                      ...electricalElectronics,
                      computerCheckUp: {
                        ...electricalElectronics.computerCheckUp,
                        malfunctionCheck: {
                          ...electricalElectronics.computerCheckUp
                            .malfunctionCheck,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                  data-key="val"
                />

                {/* 02 */}
                <label>
                  {
                    formData[currentStep]?.computerCheckUp?.malfunctionCheck
                      ?.val?.label
                  }
                </label>
                <select
                  className="form-control"
                  name=""
                  id=""
                  onChange={(e) =>
                    setElectricalElectronics({
                      ...electricalElectronics,
                      computerCheckUp: {
                        ...electricalElectronics.computerCheckUp,
                        malfunctionCheck: {
                          ...electricalElectronics.computerCheckUp
                            .malfunctionCheck,
                          val: e.target.value === "true",
                        },
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 03 */}
                <label>
                  {
                    formData[currentStep]?.computerCheckUp?.rearViewCamera?.img
                      ?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setElectricalElectronics({
                      ...electricalElectronics,
                      computerCheckUp: {
                        ...electricalElectronics.computerCheckUp,
                        rearViewCamera: {
                          ...electricalElectronics.computerCheckUp
                            .rearViewCamera,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                  data-key="val"
                />

                {/* 04 */}
                <label>
                  {
                    formData[currentStep]?.computerCheckUp?.rearViewCamera?.val
                      ?.label
                  }
                </label>
                <select
                  className="form-control"
                  name=""
                  id=""
                  onChange={(e) =>
                    setElectricalElectronics({
                      ...electricalElectronics,
                      computerCheckUp: {
                        ...electricalElectronics.computerCheckUp,
                        rearViewCamera: {
                          ...electricalElectronics.computerCheckUp
                            .rearViewCamera,
                          val: e.target.value === "true",
                        },
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 05 */}
                <label>
                  {
                    formData[currentStep]?.computerCheckUp?.batteryWarningLight
                      ?.label
                  }
                </label>
                <select
                  className="form-control"
                  name=""
                  id=""
                  onChange={(e) =>
                    setElectricalElectronics({
                      ...electricalElectronics,
                      computerCheckUp: {
                        ...electricalElectronics.computerCheckUp,
                        batteryWarningLight: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 06 */}
                <label>
                  {
                    formData[currentStep]?.computerCheckUp
                      ?.oilPressureLowWarningLight?.label
                  }
                </label>
                <select
                  className="form-control"
                  name=""
                  id=""
                  onChange={(e) =>
                    setElectricalElectronics({
                      ...electricalElectronics,
                      computerCheckUp: {
                        ...electricalElectronics.computerCheckUp,
                        oilPressureLowWarningLight: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 07 */}
                <label>
                  {
                    formData[currentStep]?.computerCheckUp
                      ?.temperatureWarningLight?.label
                  }
                </label>
                <select
                  className="form-control"
                  name=""
                  id=""
                  onChange={(e) =>
                    setElectricalElectronics({
                      ...electricalElectronics,
                      computerCheckUp: {
                        ...electricalElectronics.computerCheckUp,
                        temperatureWarningLight: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 08 */}
                <label>
                  {formData[currentStep]?.computerCheckUp?.gauges?.img?.label}
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setElectricalElectronics({
                      ...electricalElectronics,
                      computerCheckUp: {
                        ...electricalElectronics.computerCheckUp,
                        gauges: {
                          ...electricalElectronics.computerCheckUp.gauges,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />
                {/* 09 */}
                <label>
                  {formData[currentStep]?.computerCheckUp?.gauges?.val?.label}
                </label>
                <select
                  className="form-control"
                  name=""
                  id=""
                  onChange={(e) =>
                    setElectricalElectronics({
                      ...electricalElectronics,
                      computerCheckUp: {
                        ...electricalElectronics.computerCheckUp,
                        gauges: {
                          ...electricalElectronics.computerCheckUp.gauges,
                          val: e.target.value === "true",
                        },
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 10 */}
                <label>
                  {
                    formData[currentStep]?.computerCheckUp?.airBagWarningLight
                      ?.label
                  }
                </label>
                <select
                  className="form-control"
                  name=""
                  id=""
                  onChange={(e) =>
                    setElectricalElectronics({
                      ...electricalElectronics,
                      computerCheckUp: {
                        ...electricalElectronics.computerCheckUp,
                        airBagWarningLight: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>
                {/* 11 */}
                <label>
                  {
                    formData[currentStep]?.computerCheckUp
                      ?.powerSteeringWarningLight?.label
                  }
                </label>
                <select
                  className="form-control"
                  name=""
                  id=""
                  onChange={(e) =>
                    setElectricalElectronics({
                      ...electricalElectronics,
                      computerCheckUp: {
                        ...electricalElectronics.computerCheckUp,
                        powerSteeringWarningLight: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 12 */}
                <label>
                  {
                    formData[currentStep]?.computerCheckUp?.absWarningLight
                      ?.label
                  }
                </label>
                <select
                  className="form-control"
                  name=""
                  id=""
                  onChange={(e) =>
                    setElectricalElectronics({
                      ...electricalElectronics,
                      computerCheckUp: {
                        ...electricalElectronics.computerCheckUp,
                        absWarningLight: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 13 */}
                <label>
                  {
                    formData[currentStep]?.computerCheckUp
                      ?.keyFobBatteryLowLight?.label
                  }
                </label>
                <select
                  className="form-control"
                  name=""
                  id=""
                  onChange={(e) =>
                    setElectricalElectronics({
                      ...electricalElectronics,
                      computerCheckUp: {
                        ...electricalElectronics.computerCheckUp,
                        keyFobBatteryLowLight: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 14 */}
                <label>{formData[currentStep]?.battery?.battery?.label}</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) =>
                    setElectricalElectronics({
                      ...electricalElectronics,
                      battery: {
                        ...electricalElectronics.battery,
                        battery: +e.target.value,
                      },
                    })
                  }
                />

                {/* 15 */}
                <label>
                  {formData[currentStep]?.battery?.terminalCondition?.label}
                </label>
                <select
                  className="form-control"
                  name=""
                  id=""
                  onChange={(e) =>
                    setElectricalElectronics({
                      ...electricalElectronics,
                      battery: {
                        ...electricalElectronics.battery,
                        terminalCondition: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>

                {/* 16 */}
                <label>{formData[currentStep]?.battery?.charging?.label}</label>
                <select
                  className="form-control"
                  name=""
                  id=""
                  onChange={(e) =>
                    setElectricalElectronics({
                      ...electricalElectronics,
                      battery: {
                        ...electricalElectronics.battery,
                        charging: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>
                {/* 17 */}
                <label>
                  {formData[currentStep]?.battery?.alternatorOperation?.label}
                </label>
                <select
                  className="form-control"
                  name=""
                  id=""
                  onChange={(e) =>
                    setElectricalElectronics({
                      ...electricalElectronics,
                      battery: {
                        ...electricalElectronics.battery,
                        alternatorOperation: e.target.value === "true",
                      },
                    })
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>
              </div>
            </>
          ) : currentStep === 9 ? (
            <>
              <h2 className="text-center mt-4">
                {formData[currentStep]?.heading}
              </h2>

              <div className="col-12">
                {/* inputs */}

                {/* 01 */}
                <label>
                  {formData[currentStep]?.carFrame?.trunkLock?.label}
                </label>
                <select
                  name=""
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      carFrame: {
                        ...exteriorBody.carFrame,
                        trunkLock: e.target.value === "true",
                      },
                    })
                  }
                  id=""
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>

                {/* 02 */}
                <label>
                  {
                    formData[currentStep]?.carFrame?.frontWindshieldCondition
                      ?.img?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      carFrame: {
                        ...exteriorBody.carFrame,
                        frontWindshieldCondition: {
                          ...exteriorBody.carFrame.frontWindshieldCondition,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 03 */}
                <label>
                  {
                    formData[currentStep]?.carFrame?.frontWindshieldCondition
                      ?.val?.label
                  }
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      carFrame: {
                        ...exteriorBody.carFrame,
                        frontWindshieldCondition: {
                          ...exteriorBody.carFrame.frontWindshieldCondition,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="Enter Value"
                />

                {/* 04 */}
                <label>
                  {
                    formData[currentStep]?.carFrame?.rearWindshieldCondition
                      ?.img?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      carFrame: {
                        ...exteriorBody.carFrame,
                        rearWindshieldCondition: {
                          ...exteriorBody.carFrame.rearWindshieldCondition,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 05 */}
                <label>
                  {
                    formData[currentStep]?.carFrame?.rearWindshieldCondition
                      ?.val?.label
                  }
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      carFrame: {
                        ...exteriorBody.carFrame,
                        rearWindshieldCondition: {
                          ...exteriorBody.carFrame.rearWindshieldCondition,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="Enter Value"
                />

                {/* 06 */}
                <label>
                  {formData[currentStep]?.carFrame?.frontRightDoorWindow?.label}
                </label>
                <select
                  name=""
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      carFrame: {
                        ...exteriorBody.carFrame,
                        frontRightDoorWindow: e.target.value === "true",
                      },
                    })
                  }
                  id=""
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
                {/* 07 */}
                <label>
                  {formData[currentStep]?.carFrame?.frontLeftDoorWindow?.label}
                </label>
                <select
                  name=""
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      carFrame: {
                        ...exteriorBody.carFrame,
                        frontLeftDoorWindow: e.target.value === "true",
                      },
                    })
                  }
                  id=""
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>

                {/* 08 */}
                <label>
                  {formData[currentStep]?.carFrame?.rearRightDoorWindow?.label}
                </label>
                <select
                  name=""
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      carFrame: {
                        ...exteriorBody.carFrame,
                        rearRightDoorWindow: e.target.value === "true",
                      },
                    })
                  }
                  id=""
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
                {/* 09 */}
                <label>
                  {formData[currentStep]?.carFrame?.rearLeftDoorWindow?.label}
                </label>
                <select
                  name=""
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      carFrame: {
                        ...exteriorBody.carFrame,
                        rearLeftDoorWindow: e.target.value === "true",
                      },
                    })
                  }
                  id=""
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>

                {/* 10 */}
                <label>
                  {formData[currentStep]?.carFrame?.windscreenWiper?.img?.label}
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      carFrame: {
                        ...exteriorBody.carFrame,
                        windscreenWiper: {
                          ...exteriorBody.carFrame.windscreenWiper,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 11 */}
                <label>
                  {formData[currentStep]?.carFrame?.windscreenWiper?.val?.label}
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      carFrame: {
                        ...exteriorBody.carFrame,
                        windscreenWiper: {
                          ...exteriorBody.carFrame.windscreenWiper,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="Enter Value"
                />

                {/* 12 */}
                <label>
                  {
                    formData[currentStep]?.exteriorLights?.rightHeadlightWorking
                      ?.img?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      exteriorLights: {
                        ...exteriorBody.exteriorLights,
                        rightHeadlightWorking: {
                          ...exteriorBody.exteriorLights.rightHeadlightWorking,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 13 */}
                <label>
                  {
                    formData[currentStep]?.exteriorLights?.rightHeadlightWorking
                      ?.val?.label
                  }
                </label>
                <select
                  name=""
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      exteriorLights: {
                        ...exteriorBody.exteriorLights,
                        rightHeadlightWorking: {
                          ...exteriorBody.exteriorLights.rightHeadlightWorking,
                          val: e.target.value === "true",
                        },
                      },
                    })
                  }
                  id=""
                >
                  <option value="true"> true</option>
                  <option value="false"> false</option>
                </select>

                {/* 14 */}
                <label>
                  {
                    formData[currentStep]?.exteriorLights?.leftHeadlightWorking
                      ?.img?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      exteriorLights: {
                        ...exteriorBody.exteriorLights,
                        leftHeadlightWorking: {
                          ...exteriorBody.exteriorLights.leftHeadlightWorking,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 15 */}
                <label>
                  {
                    formData[currentStep]?.exteriorLights?.leftHeadlightWorking
                      ?.val?.label
                  }
                </label>
                <select
                  name=""
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      exteriorLights: {
                        ...exteriorBody.exteriorLights,
                        leftHeadlightWorking: {
                          ...exteriorBody.exteriorLights.leftHeadlightWorking,
                          val: e.target.value === "true",
                        },
                      },
                    })
                  }
                  id=""
                >
                  <option value="true"> true</option>
                  <option value="false"> false</option>
                </select>

                {/* 16 */}
                <label>
                  {
                    formData[currentStep]?.exteriorLights
                      ?.rightHeadlightCondition?.img?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      exteriorLights: {
                        ...exteriorBody.exteriorLights,
                        rightHeadlightCondition: {
                          ...exteriorBody.exteriorLights
                            .rightHeadlightCondition,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 16 */}
                <label>
                  {
                    formData[currentStep]?.exteriorLights
                      ?.rightHeadlightCondition?.val?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      exteriorLights: {
                        ...exteriorBody.exteriorLights,
                        rightHeadlightCondition: {
                          ...exteriorBody.exteriorLights
                            .rightHeadlightCondition,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />

                {/* 17 */}
                <label>
                  {
                    formData[currentStep]?.exteriorLights
                      ?.leftHeadlightCondition?.img?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      exteriorLights: {
                        ...exteriorBody.exteriorLights,
                        leftHeadlightCondition: {
                          ...exteriorBody.exteriorLights.leftHeadlightCondition,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 18 */}
                <label>
                  {
                    formData[currentStep]?.exteriorLights
                      ?.leftHeadlightCondition?.val?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      exteriorLights: {
                        ...exteriorBody.exteriorLights,
                        leftHeadlightCondition: {
                          ...exteriorBody.exteriorLights.leftHeadlightCondition,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />

                {/* 19 */}
                <label>
                  {
                    formData[currentStep]?.exteriorLights?.rightTaillightWorking
                      ?.label
                  }
                </label>
                <select
                  name=""
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      exteriorLights: {
                        ...exteriorBody.exteriorLights,
                        rightTaillightWorking: e.target.value === "true",
                      },
                    })
                  }
                  id=""
                >
                  <option value="true"> true</option>
                  <option value="false"> false</option>
                </select>

                {/* 20 */}
                <label>
                  {
                    formData[currentStep]?.exteriorLights?.leftTaillightWorking
                      ?.label
                  }
                </label>
                <select
                  name=""
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      exteriorLights: {
                        ...exteriorBody.exteriorLights,
                        leftTaillightWorking: e.target.value === "true",
                      },
                    })
                  }
                  id=""
                >
                  <option value="true"> true</option>
                  <option value="false"> false</option>
                </select>

                {/* 21 */}

                <label>
                  {
                    formData[currentStep]?.exteriorLights
                      ?.rightTaillightCondition?.img?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      exteriorLights: {
                        ...exteriorBody.exteriorLights,
                        rightTaillightCondition: {
                          ...exteriorBody.exteriorLights
                            .rightTaillightCondition,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 22 */}
                <label>
                  {
                    formData[currentStep]?.exteriorLights
                      ?.rightTaillightCondition?.val?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      exteriorLights: {
                        ...exteriorBody.exteriorLights,
                        rightTaillightCondition: {
                          ...exteriorBody.exteriorLights
                            .rightTaillightCondition,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />

                {/* 23 */}
                <label>
                  {
                    formData[currentStep]?.exteriorLights
                      ?.leftTaillightCondition?.img?.label
                  }
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      exteriorLights: {
                        ...exteriorBody.exteriorLights,
                        leftTaillightCondition: {
                          ...exteriorBody.exteriorLights.leftTaillightCondition,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 18 */}
                <label>
                  {
                    formData[currentStep]?.exteriorLights
                      ?.leftTaillightCondition?.val?.label
                  }
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setExteriorBody({
                      ...exteriorBody,
                      exteriorLights: {
                        ...exteriorBody.exteriorLights,
                        leftTaillightCondition: {
                          ...exteriorBody.exteriorLights.leftTaillightCondition,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
            </>
          ) : currentStep === 10 ? (
            <>
              <h2 className="text-center mt-4"></h2>

              <div className="col-12">
                {/* inputs */}

                {/* 01 */}
                <label>
                  {formData[currentStep]?.tyres?.frontRightTyreBrand?.label}
                </label>
                <select
                  name=""
                  className="form-control"
                  onChange={(e) =>
                    setTyres({
                      ...tyres,
                      tyres: {
                        ...tyres.tyres,
                        frontRightTyreBrand: e.target.value === "true",
                      },
                    })
                  }
                  id=""
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>

                {/* 02 */}
                <label>
                  {formData[currentStep]?.tyres?.frontRightTyre?.img?.label}
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setTyres({
                      ...tyres,
                      tyres: {
                        ...tyres.tyres,
                        frontRightTyre: {
                          ...tyres.tyres.frontRightTyre,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 03 */}
                <label>
                  {formData[currentStep]?.tyres?.frontRightTyre?.val?.label}
                </label>
                <input
                  type="number"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setTyres({
                      ...tyres,
                      tyres: {
                        ...tyres.tyres,
                        frontRightTyre: {
                          ...tyres.tyres.frontRightTyre,
                          val: +e.target.value,
                        },
                      },
                    })
                  }
                />

                {/* 04 */}
                <label>
                  {formData[currentStep]?.tyres?.frontLeftTyreBrand?.label}
                </label>
                <select
                  name=""
                  className="form-control"
                  onChange={(e) =>
                    setTyres({
                      ...tyres,
                      tyres: {
                        ...tyres.tyres,
                        frontLeftTyreBrand: e.target.value === "true",
                      },
                    })
                  }
                  id=""
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>

                {/* 05 */}
                <label>
                  {formData[currentStep]?.tyres?.frontLeftTyre?.img?.label}
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setTyres({
                      ...tyres,
                      tyres: {
                        ...tyres.tyres,
                        frontLeftTyre: {
                          ...tyres.tyres.frontLeftTyre,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 06 */}
                <label>
                  {formData[currentStep]?.tyres?.frontLeftTyre?.val?.label}
                </label>
                <input
                  type="number"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setTyres({
                      ...tyres,
                      tyres: {
                        ...tyres.tyres,
                        frontLeftTyre: {
                          ...tyres.tyres.frontLeftTyre,
                          val: +e.target.value,
                        },
                      },
                    })
                  }
                />

                {/* 07 */}
                <label>
                  {formData[currentStep]?.tyres?.rearRightTyreBrand?.label}
                </label>
                <select
                  name=""
                  className="form-control"
                  onChange={(e) =>
                    setTyres({
                      ...tyres,
                      tyres: {
                        ...tyres.tyres,
                        rearRightTyreBrand: e.target.value === "true",
                      },
                    })
                  }
                  id=""
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>

                {/* 08 */}
                <label>
                  {formData[currentStep]?.tyres?.rearRightTyre?.img?.label}
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setTyres({
                      ...tyres,
                      tyres: {
                        ...tyres.tyres,
                        rearRightTyre: {
                          ...tyres.tyres.rearRightTyre,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 09 */}
                <label>
                  {formData[currentStep]?.tyres?.rearRightTyre?.val?.label}
                </label>
                <input
                  type="number"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setTyres({
                      ...tyres,
                      tyres: {
                        ...tyres.tyres,
                        rearRightTyre: {
                          ...tyres.tyres.rearRightTyre,
                          val: +e.target.value,
                        },
                      },
                    })
                  }
                />

                {/* 10 */}
                <label>
                  {formData[currentStep]?.tyres?.rearLeftTyreBrand?.label}
                </label>
                <select
                  name=""
                  className="form-control"
                  onChange={(e) =>
                    setTyres({
                      ...tyres,
                      tyres: {
                        ...tyres.tyres,
                        rearLeftTyreBrand: e.target.value === "true",
                      },
                    })
                  }
                  id=""
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>

                {/* 11 */}
                <label>
                  {formData[currentStep]?.tyres?.rearLeftTyre?.img?.label}
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setTyres({
                      ...tyres,
                      tyres: {
                        ...tyres.tyres,
                        rearLeftTyre: {
                          ...tyres.tyres.rearLeftTyre,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 12 */}
                <label>
                  {formData[currentStep]?.tyres?.rearLeftTyre?.val?.label}
                </label>
                <input
                  type="number"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setTyres({
                      ...tyres,
                      tyres: {
                        ...tyres.tyres,
                        rearLeftTyre: {
                          ...tyres.tyres.rearLeftTyre,
                          val: +e.target.value,
                        },
                      },
                    })
                  }
                />

                {/* 13 */}
                <label>{formData[currentStep]?.tyres?.tyreSize?.label}</label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setTyres({
                      ...tyres,
                      tyres: {
                        ...tyres.tyres,
                        tyreSize: e.target.value,
                      },
                    })
                  }
                />

                {/* 14 */}
                <label>{formData[currentStep]?.tyres?.rims?.label}</label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setTyres({
                      ...tyres,
                      tyres: {
                        ...tyres.tyres,
                        rims: e.target.value,
                      },
                    })
                  }
                />

                {/* 15 */}
                <label>
                  {formData[currentStep]?.tyres?.wheelsCaps?.img?.label}
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setTyres({
                      ...tyres,
                      tyres: {
                        ...tyres.tyres,
                        wheelsCaps: {
                          ...tyres.tyres.wheelsCaps,
                          img: e.target.files[0],
                        },
                      },
                    })
                  }
                />

                {/* 12 */}
                <label>
                  {formData[currentStep]?.tyres?.wheelsCaps?.val?.label}
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control"
                  onChange={(e) =>
                    setTyres({
                      ...tyres,
                      tyres: {
                        ...tyres.tyres,
                        wheelsCaps: {
                          ...tyres.tyres.wheelsCaps,
                          val: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="nav-buttons">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </button>
          <button
            type="button"
            onClick={
              currentStep === formData.length - 1 ? handleClick : handleNext
            }
          >
            {currentStep < formData.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
