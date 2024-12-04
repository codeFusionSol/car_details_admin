import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import { useNavigate } from "react-router-dom";
import { changeFormStateSuccess } from "../../redux/Slices/Sidebar.jsx";
import { useState } from "react";
import axios from "axios";
import api from "../../../utils/url.js";

const AdditionalPictures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carDetailsId = useSelector((state) => state.carDetailsId.carDetailsId);

  const [picturesData, setPicturesData] = useState({
    pictures: [],
  });

  const [comment, setComment] = useState("");
  const [disclaimer, setDisclaimer] = useState("");

  const changeStep = () => {
    dispatch(changeStepSuccess(0));
    dispatch(changeFormStateSuccess());
    navigate("/");
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

  const handleImageChange = async (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    
    try {
      const base64Array = await Promise.all(files.map((file) => getBase64(file)));
      
      setPicturesData((prev) => ({
        ...prev,
        pictures: [
          ...prev.pictures,
          ...base64Array.map((base64) => ({
            url: `data:image/png;base64,${base64.split(",")[1]}`,
            public_id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          })),
        ],
      }));
    } catch (error) {
      console.error("Error processing images:", error);
    }
  };

  const handleRemoveImage = (index) => {
    setPicturesData((prev) => ({
      ...prev,
      pictures: prev.pictures.filter((_, i) => i !== index),
    }));
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleDisclaimerChange = (e) => {
    setDisclaimer(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Upload pictures
      const picturesResponse = await api.post("/pictures/add", {
        carDetailsId: carDetailsId || "674d962b622d3809925855fe",
        pictures: picturesData.pictures
      });

      // Upload comments and disclaimer  
      const commentResponse = await api.post("/comments/add", {
        carDetailsId: carDetailsId || "674d962b622d3809925855fe",
        comments: comment
      });

      const disclaimerResponse = await api.post("/disclaimer/add", {
        carDetailsId: carDetailsId || "674d962b622d3809925855fe",
        disclaimer: disclaimer
      });

      if (picturesResponse.data.success && commentResponse.data.success && disclaimerResponse.data.success) {
        changeStep(12);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-light py-md-5 py-3 px-0">
      <div className="container p-0">
        <div className="card shadow">
          <div className="text-white p-4" style={{ backgroundColor: "red" }}>
            <h2 className="display-4 form-title text-center fw-bold">Additional Pictures</h2>
          </div>

          <div className="card-body p-4">
            <div className="row g-4">
              <div className="col-12">
                <div className="mb-4">
                  <label className="form-label fw-semibold">Upload Additional Car Photos</label>
                  <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    accept="image/*"
                    className="form-control"
                  />
                </div>
              </div>

              {picturesData.pictures?.length > 0 && (
                <div className="col-12">
                  <div className="row g-3">
                    {picturesData.pictures.map((pic, index) => (
                      <div key={pic.public_id || index} className="col-md-4">
                        <div className="position-relative">
                          <img
                            style={{ maxHeight: "200px", width: "100%",border:'1px solid lightgray', objectFit: "cover" }}
                            src={pic.url}
                            alt={`Additional car photo ${index + 1}`}
                            className="img-fluid rounded"
                          />
                          <button
                            type="button"
                            className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                            onClick={() => handleRemoveImage(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="col-12">
                <div className="mb-4">
                  <label className="form-label fw-semibold">Additional Comments</label>
                  <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    className="form-control"
                    rows="4"
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="mb-4">
                  <label className="form-label fw-semibold">Disclaimer</label>
                  <textarea
                    value={disclaimer}
                    onChange={handleDisclaimerChange}
                    className="form-control"
                    rows="4"
                  />
                </div>
              </div>
            </div>

            <div className="text-end mt-4">
              <button onClick={handleSubmit} className="btn btn-lg nextBtn">
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

export default AdditionalPictures;
