import "./Cars.css";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import api from "../../../utils/url.js";

const columns = [
  {
    field: "carName",
    headerName: "Car Name",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <div style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
        {params.value}
      </div>
    ),
  },
  {
    field: "model",
    headerName: "Model",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <div style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
        {params.value}
      </div>
    ),
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <div style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
        {params.value}
      </div>
    ),
  },
  {
    field: "year",
    headerName: "Year",
    flex: 1,
    minWidth: 100,
    renderCell: (params) => (
      <div style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
        {params.value}
      </div>
    ),
  },
  {
    field: "mileage",
    headerName: "Mileage",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <div style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
        {params.value}
      </div>
    ),
  },
  {
    field: "transmission",
    headerName: "Transmission",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <div style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
        {params.value}
      </div>
    ),
  },
  {
    field: "fuelType",
    headerName: "Fuel Type",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <div style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
        {params.value}
      </div>
    ),
  }
];

const Cars = () => {
  const [cars, setCars] = React.useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });

  React.useEffect(() => {
    api.get("/ownerDetails/get-all-owner-details").then((res) => {
      if (res.data.success) {
        setCars(res.data.data);
      }
    });
  }, []);

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
                  <th style={{
                    textAlign: "left",
                    padding: "18px 15px",
                    color: "var(--black-color)",
                    fontWeight: "700",
                    fontSize: "15px",
                  }}>Car Name</th>
                  <th style={{
                    textAlign: "left",
                    padding: "18px 15px",
                    color: "var(--black-color)",
                    fontWeight: "700",
                    fontSize: "15px",
                  }}>Model</th>
                  <th style={{
                    textAlign: "left",
                    padding: "18px 15px",
                    color: "var(--black-color)",
                    fontWeight: "700",
                    fontSize: "15px",
                  }}>City</th>
                  <th style={{
                    textAlign: "left",
                    padding: "18px 15px",
                    color: "var(--black-color)",
                    fontWeight: "700",
                    fontSize: "15px",
                  }}>Colour</th>
                  <th style={{
                    textAlign: "left",
                    padding: "18px 15px",
                    color: "var(--black-color)",
                    fontWeight: "700",
                    fontSize: "15px",
                  }}>Mileage</th>
                  <th style={{
                    textAlign: "left",
                    padding: "18px 15px",
                    color: "var(--black-color)",
                    fontWeight: "700",
                    fontSize: "15px",
                  }}>Transmission</th>
                  <th style={{
                    textAlign: "left",
                    padding: "18px 15px",
                    color: "var(--black-color)",
                    fontWeight: "700",
                    fontSize: "15px",
                  }}>Action</th>
                  
                </tr>
              </thead>
              <tbody>
                {cars.map((car, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "var(--white-color)" : "#f8f9fa",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--primary-light-color)";
                      e.currentTarget.style.transform = "scale(1.005)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = index % 2 === 0 ? "var(--white-color)" : "#f8f9fa";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <td style={{
                      textAlign: "left",
                      padding: "15px",
                      color: "var(--black-color)",
                      fontWeight: "500",
                    }}>{car?.carId?.name}</td>
                    <td style={{
                      textAlign: "left",
                      padding: "15px",
                      color: "var(--black-color)",
                      fontWeight: "500",
                    }}>{car?.carId?.registeredYear}</td>
                    <td style={{
                      textAlign: "left",
                      padding: "15px",
                      color: "var(--black-color)",
                      fontWeight: "500",
                    }}>{car?.carId?.registeredCity}</td>
                    <td style={{
                      textAlign: "left",
                      padding: "15px",
                      color: "var(--black-color)",
                      fontWeight: "500",
                    }}>{car?.carId?.colour  }</td>
                    <td style={{
                      textAlign: "left",
                      padding: "15px",
                      color: "var(--black-color)",
                      fontWeight: "500",
                    }}>{car?.carId?.mileage}</td>
                    <td style={{
                      textAlign: "left",
                      padding: "15px",
                      color: "var(--black-color)",
                      fontWeight: "500",
                    }}>{car?.carId?.transmissionType}</td>
                    <td style={{
                      textAlign: "left",
                      padding: "15px",
                      color: "var(--black-color)",
                      fontWeight: "500",
                    }}></td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default Cars;
