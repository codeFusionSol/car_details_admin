import "./Cars.css";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import * as React from "react";
import Paper from "@mui/material/Paper";
import api from "../../../utils/url.js";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cars = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  console.log(user);
  React.useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  // const [cars, setCars] = React.useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const { cars } = useSelector((state) => state.cars);

  const handleDelete = async (car) => {
    try {
      return;
      const res = await api.delete(`/ownerDetails/delete/${car._id}`);
      if (res.data.success) {
        fetchCars();
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleEdit = (car) => {
    setSelectedCar(car);
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="cars-container">
        <Paper
          elevation={3}
          style={{
            padding: "25px",
            borderRadius: "16px",
            backgroundColor: "var(--white-color)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ overflow: "auto" }}>
            <table
              style={{
                borderCollapse: "separate",
                borderSpacing: 0,
                width: "100%",
                border: "1px solid var(--primary-light-color)",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: `linear-gradient(45deg, var(--primary-color), var(--primary-light-color))`,
                  }}
                >
                  <th
                    style={{
                      textAlign: "left",
                      padding: "18px 15px",
                      color: "var(--black-color)",
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    Car Name
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "18px 15px",
                      color: "var(--black-color)",
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    Model
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "18px 15px",
                      color: "var(--black-color)",
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    City
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "18px 15px",
                      color: "var(--black-color)",
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    Colour
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "18px 15px",
                      color: "var(--black-color)",
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    Mileage
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "18px 15px",
                      color: "var(--black-color)",
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    Report Link
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "18px 15px",
                      color: "var(--black-color)",
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor:
                        index % 2 === 0 ? "var(--white-color)" : "#f8f9fa",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--primary-light-color)";
                      e.currentTarget.style.transform = "scale(1.005)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        index % 2 === 0 ? "var(--white-color)" : "#f8f9fa";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <td
                      style={{
                        textAlign: "left",
                        padding: "15px",
                        color: "var(--black-color)",
                        fontWeight: "500",
                      }}
                    >
                      {car?.carId?.name}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "15px",
                        color: "var(--black-color)",
                        fontWeight: "500",
                      }}
                    >
                      {car?.carId?.registeredYear}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "15px",
                        color: "var(--black-color)",
                        fontWeight: "500",
                      }}
                    >
                      {car?.carId?.registeredCity}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "15px",
                        color: "var(--black-color)",
                        fontWeight: "500",
                      }}
                    >
                      {car?.carId?.colour}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "15px",
                        color: "var(--black-color)",
                        fontWeight: "500",
                      }}
                    >
                      {car?.carId?.mileage}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "15px",
                        color: "var(--black-color)",
                        fontWeight: "500",
                      }}
                    >
                      {/* {car?.carId?.transmissionType} */}
                      https://car-details-frontend.vercel.app/{car?._id}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "0px",
                        color: "var(--black-color)",
                        fontWeight: "500",
                      }}
                    >
                      <div className="d-flex gap-0 p-0">
                        <img
                          onClick={() => handleDelete(car)}
                          src="/assets/icons/delete.png"
                          width={20}
                          alt="delete"
                          style={{ cursor: "pointer", marginRight: "10px" }}
                        />
                        <img
                          onClick={() => handleEdit(car)}
                          src="/assets/icons/edit.png"
                          width={20}
                          alt="edit"
                          style={{ cursor: "pointer", marginRight: "10px" }}
                        />
                        <img
                          // onClick={() => handleView(car)}
                          src="/assets/icons/view.png"
                          width={20}
                          alt="view"
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Paper>
      </div>

      <Modal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        aria-labelledby="view-car-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxHeight: "90vh",
            bgcolor: "background.paper",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            borderRadius: 4,
            p: 0,
            overflow: "auto",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(45deg, var(--primary-color), var(--primary-light-color))",
              padding: "20px 30px",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          >
            <h2 style={{ color: "white", margin: 0, fontSize: "24px" }}>
              Car Details
            </h2>
          </div>

          <div style={{ padding: "30px" }}>
            {selectedCar && (
              <div>
                <h3>Owner Details</h3>
                <div style={{ marginBottom: "20px" }}>
                  <p>
                    <strong>Name:</strong> {selectedCar.name}
                  </p>
                  <p>
                    <strong>Contact:</strong> {selectedCar.contactNumber}
                  </p>
                  <p>
                    <strong>City:</strong> {selectedCar.city}
                  </p>
                </div>

                <h3>Car Information</h3>
                <div style={{ marginBottom: "20px" }}>
                  <p>
                    <strong>Name:</strong> {selectedCar.carId?.name}
                  </p>
                  <p>
                    <strong>Model:</strong> {selectedCar.carId?.registeredYear}
                  </p>
                  <p>
                    <strong>Color:</strong> {selectedCar.carId?.colour}
                  </p>
                  <p>
                    <strong>Mileage:</strong> {selectedCar.carId?.mileage}
                  </p>
                  <p>
                    <strong>Transmission:</strong>{" "}
                    {selectedCar.carId?.transmissionType}
                  </p>
                </div>

                <h3>Inspection Forms</h3>
                {selectedCar.AllFormsData?.map((form, index) => (
                  <div key={index} style={{ marginBottom: "20px" }}>
                    <h4>{form.name}</h4>
                    {form.data &&
                      Object.entries(form.data).map(([key, value]) => (
                        <div key={key}>
                          <p>
                            <strong>{key}:</strong> {JSON.stringify(value)}
                          </p>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Cars;
