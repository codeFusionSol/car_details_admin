import "./Admins.css";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import api from "../../../utils/url.js";

const columns = [
  { 
    field: "userName", 
    headerName: "User Name", 
    flex: 1, 
    minWidth: 150,
    renderCell: (params) => (
      <div style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>
        {params.value}
      </div>
    )
  },
  { 
    field: "email", 
    headerName: "Email", 
    flex: 1, 
    minWidth: 150,
    renderCell: (params) => (
      <div style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>
        {params.value}
      </div>
    )
  },
  { 
    field: "phone", 
    headerName: "Phone", 
    flex: 1, 
    minWidth: 120,
    renderCell: (params) => (
      <div style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>
        {params.value}
      </div>
    )
  },
  { 
    field: "address", 
    headerName: "Address", 
    flex: 1, 
    minWidth: 150,
    renderCell: (params) => (
      <div style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>
        {params.value}
      </div>
    )
  },
  { 
    field: "role", 
    headerName: "Role", 
    flex: 1, 
    minWidth: 100,
    renderCell: (params) => (
      <div style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>
        {params.value}
      </div>
    )
  },
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
        <Paper sx={{ 
          width: '100%',
          overflow: 'hidden',
          '& .MuiDataGrid-root': {
            '@media (max-width: 600px)': {
              fontSize: '0.75rem',
            },
          },
          '@media (max-width: 600px)': {
            margin: '1rem',
            width: 'calc(100% - 2rem)',
          }
        }}>
          <DataGrid
            rows={admins}
            columns={columns}
            getRowId={(row) => row._id}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ 
              border: 0,
              width: '100%',
              '& .MuiDataGrid-cell': {
                padding: '8px',
                '@media (max-width: 600px)': {
                  padding: '4px',
                }
              },
              '& .MuiDataGrid-columnHeaders': {
                '@media (max-width: 600px)': {
                  padding: '4px',
                }
              },
              '& .MuiDataGrid-virtualScroller': {
                '@media (max-width: 600px)': {
                  minHeight: '300px !important'
                }
              }
            }}
            autoHeight
          />
        </Paper>
      </div>
    </>
  );
};

export default Admins;
