import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./Form.css";
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
import OwnerDetails from "../../Components/OwnerDetails/OwnerDetails.jsx";
import { useSelector } from "react-redux";
import { useFetcher } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import TestDrive from "../../Components/TestDrive/TestDrive.jsx";
import ExtoriorCondition from "../../Components/ExtoriorCondition/ExtoriorCondition.jsx";

const api = axios.create({
  baseURL: url,
});

const Form = () => {
  const totalSteps = 14;
  const { steps } = useSelector((state) => state.formsSteps);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log(steps);
  // }, [steps]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validatedPictures = formData.pictures.map((pic) => ({
      ...pic,
      public_id:
        pic.public_id ||
        `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }));

    // Add public_id to any pics in formData that don't have one
    const addPublicIds = (obj) => {
      if (!obj) return obj;

      // Handle arrays
      if (Array.isArray(obj)) {
        return obj.map((item) => addPublicIds(item));
      }

      // Handle objects
      if (typeof obj === "object") {
        const newObj = { ...obj };

        // Add public_id to image objects that don't have one
        if (newObj.image && !newObj.image.public_id) {
          newObj.image.public_id = `temp_${Date.now()}_${Math.random()
            .toString(36)
            .substr(2, 9)}`;
        }

        // Recursively process all object properties
        Object.keys(newObj).forEach((key) => {
          newObj[key] = addPublicIds(newObj[key]);
        });

        return newObj;
      }

      return obj;
    };

    const formDataWithIds = addPublicIds({ ...formData });

    const dataToSubmit = {
      ...formData,
      pictures: validatedPictures,
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

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  return (
    <>
      <div className="main-container">
        <Navbar />
        <div
          className="container-fluid d-flex m-0 p-0"
          style={{ overflowX: "hidden !important" }}
        >
          <Sidebar />
        </div>
        <div className="form-container p-0 ps-4 ">
          {steps === 0 && (
            <div className="fade-in">
              <OwnerDetails />
            </div>
          )}

          {steps === 1 && (
            <div className="fade-in">
              <CarDetails />
            </div>
          )}

          {steps === 2 && (
            <div className="fade-in">
              <BodyFrameAccidentChecklist />
            </div>
          )}

          {steps === 3 && (
            <div className="fade-in">
              <EngineTransmissionClutch />
            </div>
          )}

          {steps === 4 && (
            <div className="fade-in">
              <Brakes />
            </div>
          )}

          {steps === 5 && (
            <div className="fade-in">
              <SuspensionSteering />
            </div>
          )}

          {steps === 6 && (
            <div className="fade-in">
              <Interior />
            </div>
          )}

          {steps === 7 && (
            <div className="fade-in">
              <ACHeaterCheckup />
            </div>
          )}

          {steps === 8 && (
            <div className="fade-in">
              <ElectricalElectronics />
            </div>
          )}

          {steps === 9 && (
            <div className="fade-in">
              <ExteriorBody />
            </div>
          )}

          {steps === 10 && (
            <div className="fade-in">
              <Tyres />
            </div>
          )}


          {steps === 11 && (
            <div className="fade-in">
              <TestDrive />
            </div>
          )}

          {steps === 12 && (
            <div className="fade-in">
              <ExtoriorCondition />
            </div>
          )}


          {steps === 13 && (
            <div className="fade-in">
              <AdditionalPictures />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Form;
