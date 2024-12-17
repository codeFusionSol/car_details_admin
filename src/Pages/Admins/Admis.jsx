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
      <div style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
        {params.value}
      </div>
    ),
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <div style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
        {params.value}
      </div>
    ),
  },
  {
    field: "phone",
    headerName: "Phone",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <div style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
        {params.value}
      </div>
    ),
  },
  {
    field: "address",
    headerName: "Address",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <div style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
        {params.value}
      </div>
    ),
  },
  {
    field: "city",
    headerName: "City",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <div style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
        {params.value}
      </div>
    ),
  },
  {
    field: "role",
    headerName: "Role",
    flex: 1,
    minWidth: 100,
    renderCell: (params) => (
      <div style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
        {params.value}
      </div>
    ),
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
        <Paper
          elevation={3}
          style={{
            padding: "25px",
            borderRadius: "16px",
            backgroundColor: "var(--white-color)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          {/* <h2 style={{
            marginBottom: "20px",
            color: "var(--black-color)",
            fontSize: "24px",
            fontWeight: "600"
          }}>Admin Management</h2> */}
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
                    User Name
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
                    Email
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
                    Phone
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
                    Address
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
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, index) => (
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
                      {admin.userName}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "15px",
                        color: "var(--black-color)",
                        fontWeight: "500",
                      }}
                    >
                      {admin.email}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "15px",
                        color: "var(--black-color)",
                        fontWeight: "500",
                      }}
                    >
                      {admin.phone}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "15px",
                        color: "var(--black-color)",
                        fontWeight: "500",
                      }}
                    >
                      {admin.address}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "15px",
                        color: "var(--black-color)",
                        fontWeight: "500",
                      }}
                    >
                      {admin.city}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "250px",
                        maxWidth: "200px",
                        backgroundColor:
                          admin.role === "superAdmin"
                            ? "#4CAF50"
                            : admin.role === "admin"
                            ? "#2196F3"
                            : "var(--primary-color)",
                      }}
                    >
                      <span
                        style={{
                          color:
                            admin.role === "inspectionOfficer"
                              ? "var(--black-color)"
                              : "var(--white-color)",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: "500",
                          padding: "2px",
                        }}
                      >
                        {admin.role === "superAdmin"
                          ? "Super Admin"
                          : admin.role === "admin"
                          ? "Admin"
                          : "Inspection Officer"}
                      </span>
                    </td>
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

export default Admins;
