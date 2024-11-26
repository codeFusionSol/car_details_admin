const AdditionalPictures = ({ formData, setFormData }) => {
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
      
      setFormData((prev) => ({
        ...prev,
        pictures: [
          ...(prev.pictures || []),
          ...base64Array.map((base64) => ({
            url: `data:image/png;base64,${base64.split(",")[1]}`,
            public_id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Generate unique temporary ID
          })),
        ],
      }));
    } catch (error) {
      console.error("Error processing images:", error);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      pictures: prev.pictures.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="additional-pictures-container">
      <section className="additional-pictures-section">
        <h2 className="section-title">Additional Pictures</h2>
        <div className="form-section">
          <div className="upload-section">
            <label className="upload-label">Upload Additional Car Photos</label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="file-input"
              style={{ display: 'none' }}
              onChange={handleImageChange}
              id="car-images-input"
            />
            <button
              type="button"
              className="upload-button"
              onClick={() => document.getElementById('car-images-input').click()}
            >
              <i className="fas fa-cloud-upload-alt"></i> Upload Images
            </button>
          </div>

          <div className="text-input-section">
            <div className="input-group">
              <label className="input-label">Comments</label>
              <textarea
                className="text-area"
                value={formData.comments || ""}
                placeholder="Enter your comments here..."
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    comments: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Disclaimer</label>
              <textarea
                className="text-area"
                value={formData.disclaimer || ""}
                placeholder="Enter disclaimer text..."
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    disclaimer: e.target.value,
                  }));
                }}
              />
            </div>
          </div>

          {formData.pictures?.length > 0 && (
            <div className="image-gallery">
              {formData.pictures.map((pic, index) => (
                <div key={pic.public_id || index} className="image-card">
                  <div className="image-wrapper">
                    <img
                      src={pic.url}
                      alt={`Additional car photo ${index + 1}`}
                      className="preview-image"
                    />
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <span className="image-number">Image {index + 1}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .additional-pictures-container {
          padding: 2rem;
          background: #f8f9fa;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .section-title {
          color: #2c3e50;
          font-size: 2rem;
          margin-bottom: 2rem;
          text-align: center;
          font-weight: 600;
        }

        .upload-section {
          text-align: center;
          margin-bottom: 2rem;
          padding: 2rem;
          border: 2px dashed #6c757d;
          border-radius: 8px;
          background: white;
        }

        .upload-button {
          background: #007bff;
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 5px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .upload-button:hover {
          background: #0056b3;
        }

        .text-input-section {
          display: grid;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        .input-label {
          font-size: 1.1rem;
          color: #495057;
          margin-bottom: 0.5rem;
        }

        .text-area {
          padding: 1rem;
          border: 1px solid #ced4da;
          border-radius: 5px;
          min-height: 120px;
          font-size: 1rem;
          resize: vertical;
        }

        .image-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
          padding: 1rem;
        }

        .image-card {
          position: relative;
          background: white;
          padding: 0.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }

        .image-card:hover {
          transform: translateY(-5px);
        }

        .image-wrapper {
          position: relative;
          padding-top: 100%;
        }

        .preview-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 6px;
        }

        .remove-button {
          position: absolute;
          top: -10px;
          right: -10px;
          background: #dc3545;
          color: white;
          border: none;
          border-radius: 50%;
          width: 25px;
          height: 25px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
        }

        .remove-button:hover {
          background: #c82333;
        }

        .image-number {
          display: block;
          text-align: center;
          margin-top: 0.5rem;
          color: #6c757d;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default AdditionalPictures;
