import "./Admins.css";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import api from "../../../utils/url.js";

const columns = [
  { field: "userName", headerName: "User Name", width: 300 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "phone", headerName: "Phone", width: 300 },
  { field: "address", headerName: "Address", width: 300 },
  // { 
  //   field: "createdAt", 
  //   headerName: "Created At", 
  //   width: 200,
  //   valueGetter: (params) => new Date(params.row.createdAt).toLocaleString()
  // }
];

const Admins = () => {
  const [admins, setAdmins] = React.useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });

  React.useEffect(() => {
    api.get("/users/get-all-admins").then((res) => {
      if (res.data.success) {
        setAdmins(res.data.admins);
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="admins-container">
        <Paper sx={{ height: 400, }}>
          <DataGrid
            rows={admins}
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

export default Admins;
