import React, { useState } from "react";
import axios from "axios";
import { url } from "../utils/url.js";
import Form from "./Pages/Form/Form.jsx";

const api = axios.create({
  baseURL: url,
});

function App() {
  const [currentStep, setCurrentStep] = useState(3);

  return (
    <>
      <Form />
    </>
  );
}

export default App;
