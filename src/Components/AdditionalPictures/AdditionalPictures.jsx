import { useDispatch, useSelector } from "react-redux";
import { changeStepSuccess } from "../../redux/Slices/FormsSteps.jsx";
import { useNavigate } from "react-router-dom";
import { changeFormStateSuccess } from "../../redux/Slices/Sidebar.jsx";
import { useState } from "react";
import axios from "axios";
import api from "../../../utils/url.js";
import { Toaster, toast } from "sonner";
import { addDataToCarDetailsSuccess, resetCarDetailsId } from "../../redux/Slices/CarDetail_id.jsx";

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
        toast("Form Submitted!", {
          style: {
            padding: "16px",
             // Set desired padding here
          }})
          setTimeout(() => {
            dispatch(resetCarDetailsId());
            changeStep(0);
            navigate("/dashboard");
            dispatch(changeFormStateSuccess());
          }, 2000);;
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
    <div className="container-fluid min-vh-100 pb-md-5 py-3 px-0">
      <div className="container p-0">
        <div className="card border-0">
          <div className="card-header align-items-center d-flex justify-content-center bg-opacity-25 border-0 py-3 ps-0">
            <h4 className="text-center mb-0 carDetailsHeading">
              Additional Pictures
            </h4>
          </div>

          <div className="card-body d-flex flex-column justify-content-center align-items-center p-lg-4 p-1" 
            style={{ backgroundColor: "#f8f9fa" }}>
            <div className="row g-4 px-0">
              <div className="col-12 px-0">
                <div className="rounded p-3 text-center"
                  style={{
                    height: "80px",
                    backgroundColor: "#FFF6E0", 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #FFCC00",
                    borderRadius: "6px"
                  }}>
                  <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className="d-none"
                    accept="image/*"
                    required
                    id="additional-images"
                  />
                  <label
                    htmlFor="additional-images"
                    className="d-flex align-items-center justify-content-center gap-2 mb-0 cursor-pointer"
                    style={{
                      color: "#FFCC00",
                      fontWeight: "600",
                      fontSize: "14px"
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24" 
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginRight: "5px" }}
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span className="d-none d-md-inline">
                      {window.innerWidth >= 1025 && "Click to upload additional car photos"}
                    </span>
                  </label>
                </div>
              </div>

              {picturesData.pictures?.length > 0 && (
                <div className="col-12">
                  <div className="row g-3">
                    {picturesData.pictures.map((pic, index) => (
                      <div key={pic.public_id || index} className="col-md-4">
                        <div className="position-relative">
                          <img
                            style={{ maxHeight: "200px", width: "100%", border:'1px solid lightgray', objectFit: "cover" }}
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

              <div className="col-12 ps-0">
                <div className="d-flex justify-content-center gap-3">
                  <button className="backBtn"
                    onClick={() => {
                      dispatch(changeStepSuccess(11));
                    }}
                  >
                    Back
                  </button>
                  <button onClick={handleSubmit} className="nextBtn">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Toaster position={window.innerWidth <= 768 ? 'bottom-right' : 'top-right'} />
    </>
  );
};

export default AdditionalPictures;
