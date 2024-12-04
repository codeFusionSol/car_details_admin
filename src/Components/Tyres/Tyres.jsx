import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../../utils/url";

const api = axios.create({
  baseURL: url,
});

const Tyres = () => {
  const dispatch = useDispatch();
  const carDetailsId = useSelector((state) => state.carDetailsId.carDetailsId);

  const [tyresData, setTyresData] = useState({
    tyres: {
      imageValueChecks: []
    }
  });

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

  const handleImageChange = async (e, item) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      const base64WithPrefix = `data:image/png;base64,${base64.split(",")[1]}`;

      setTyresData(prev => {
        const newData = { ...prev };
        const checks = [...(newData.tyres.imageValueChecks || [])];
        const existingIndex = checks.findIndex(check => check.name === item);

        if (existingIndex >= 0) {
          checks[existingIndex] = {
            ...checks[existingIndex],
            data: {
              ...checks[existingIndex].data,
              image: { url: base64WithPrefix, public_id: "" }
            }
          };
        } else {
          checks.push({
            name: item,
            data: {
              image: { url: base64WithPrefix, public_id: "" },
              value: ""
            }
          });
        }

        newData.tyres.imageValueChecks = checks;
        return newData;
      });
    }
  };

  const handleValueChange = (item, value) => {
    setTyresData(prev => {
      const newData = { ...prev };
      const checks = [...(newData.tyres.imageValueChecks || [])];
      const existingIndex = checks.findIndex(check => check.name === item);

      if (existingIndex >= 0) {
        checks[existingIndex] = {
          ...checks[existingIndex],
          data: {
            ...checks[existingIndex].data,
            value: value
          }
        };
      } else {
        checks.push({
          name: item,
          data: {
            image: { url: "", public_id: "" },
            value: value
          }
        });
      }

      newData.tyres.imageValueChecks = checks;
      return newData;
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("/tyres/add", {
        ...tyresData,
        carDetailsId: carDetailsId || "674d962b622d3809925855fe"
      });

      if (response.data.success) {
        alert("Tyres data added successfully!");
        changeStep();
      }
    } catch (error) {
      console.error("Error submitting tyres data:", error);
      alert("Error adding tyres data");
    }
  };

  useEffect(() => {
    console.log(tyresData);
  }, [tyresData]);

  return (
    <div className="container-fluid min-vh-100 bg-light py-md-5 py-3 px-0">
      <div className="container p-0">
        <div className="card shadow">
          <div className="text-white p-4" style={{ backgroundColor: "#00a5e3" }}>
            <h2 className="display-4 form-title text-center fw-bold">Tyres Inspection</h2>
          </div>

          <div className="card-body p-4">
            <div className="row g-4">
              <div className="col-12">
                <div className="row">
                  {[
                    "frontRightTyre",
                    "frontLeftTyre", 
                    "rearRightTyre",
                    "rearLeftTyre",
                    "wheelsCaps",
                    "frontRightTyreBrand",
                    "frontLeftTyreBrand",
                    "rearRightTyreBrand",
                    "rearLeftTyreBrand",
                    "tyreSize",
                    "rims"
                  ].map((item) => (
                    <div className="col-12 col-md-6 mb-3" key={item}>
                      <div className="mb-3">
                        <label className="form-label">
                          {item.split(/(?=[A-Z])/).join(" ")}
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(e, item)}
                          accept="image/*"
                          required
                          className="form-control mb-2"
                        />
                        <div className="form-floating">
                          <input
                            type="text"
                            value={tyresData.tyres.imageValueChecks.find(
                              (check) => check.name === item
                            )?.data?.value || ""}
                            onChange={(e) => handleValueChange(item, e.target.value)}
                            required
                            className="form-control"
                            id={`tyres-${item}`}
                            placeholder={item.split(/(?=[A-Z])/).join(" ")}
                          />
                          <label htmlFor={`tyres-${item}`}>
                            {item.split(/(?=[A-Z])/).join(" ")}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-end mt-4">
              <button onClick={handleSubmit} className="btn btn-primary btn-lg">
                Next Step
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="ms-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tyres;
