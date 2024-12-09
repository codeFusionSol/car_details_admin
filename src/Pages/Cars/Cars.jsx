import "./Cars.css";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import api from "../../../utils/url.js";

const columns = [
  { field: "carName", headerName: "Car Name", width: 200 },
  { field: "model", headerName: "Model", width: 150 },
  { field: "price", headerName: "Price", width: 150 },
  { field: "year", headerName: "Year", width: 100 },
  { field: "mileage", headerName: "Mileage", width: 150 },
  { field: "transmission", headerName: "Transmission", width: 150 },
  { field: "fuelType", headerName: "Fuel Type", width: 150 }
];

const Cars = () => {
  const [cars, setCars] = React.useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });

  React.useEffect(() => {
    api.get("/cars/get-all-cars").then((res) => {
      if (res.data.success) {
        setCars(res.data.cars);
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="cars-container">
        <Paper sx={{ height: 400 }}>
          <DataGrid
            rows={cars}
            columns={columns}
            getRowId={(row) => row._id}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </div>
    </>
  );
};

export default Cars;
