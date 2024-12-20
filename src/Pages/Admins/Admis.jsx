import "./Admins.css";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import api from "../../../utils/url.js";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Admins = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  console.log(user);
  React.useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  const [admins, setAdmins] = React.useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [editFormData, setEditFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    role: "",
  });

  React.useEffect(() => {
    api.get("/users/get-all-admins").then((res) => {
      if (res.data.success) {
        setAdmins(res.data.admins);
      }
    });
  }, []);

  const handleDelete = async (admin) => {
    try {
      const res = await api.delete(`/users/delete-admin/${admin._id}`);
      if (res.data.success) {
        setAdmins(admins.filter((a) => a._id !== admin._id));
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setEditFormData({
      userName: admin.userName,
      email: admin.email,
      phone: admin.phone,
      address: admin.address,
      city: admin.city,
      role: admin.role,
    });
    setEditMode(true);
  };

  const handleView = (admin) => {
    setSelectedAdmin(admin);
    setViewMode(true);
  };

  const handleEditSubmit = async () => {
    try {
      const res = await api.put(
        `/users/update-admin/${selectedAdmin._id}`,
        editFormData
      );
      if (res.data.success) {
        const updatedAdmins = admins.map((admin) =>
          admin._id === selectedAdmin._id
            ? { ...admin, ...editFormData }
            : admin
        );
        setAdmins(updatedAdmins);
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

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
                      {capitalizeFirstLetter(admin.userName)}
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
                      {capitalizeFirstLetter(admin.address)}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "15px",
                        color: "var(--black-color)",
                        fontWeight: "500",
                      }}
                    >
                      {capitalizeFirstLetter(admin.city)}
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
                    <td>
                      <div className="d-flex gap-2 p-1">
                        <img
                          onClick={() => handleDelete(admin)}
                          src="/assets/icons/delete.png"
                          width={20}
                          alt="delete"
                        />
                        <img
                          onClick={() => handleEdit(admin)}
                          src="/assets/icons/edit.png"
                          width={20}
                          alt="edit"
                        />
                        <img
                          onClick={() => handleView(admin)}
                          src="/assets/icons/view.png"
                          width={20}
                          alt="view"
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
        open={editMode}
        onClose={() => setEditMode(false)}
        aria-labelledby="edit-admin-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            borderRadius: 4,
            p: 0,
            outline: "none",
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
              Edit Admin Details
            </h2>
          </div>

          <div style={{ padding: "30px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: 500,
                  }}
                >
                  Username
                </label>
                <input
                  type="text"
                  name="userName"
                  value={capitalizeFirstLetter(editFormData.userName)}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: 500,
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: 500,
                  }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: 500,
                  }}
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={capitalizeFirstLetter(editFormData.city)}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: 500,
                  }}
                >
                  Address
                </label>
                <textarea
                  name="address"
                  value={capitalizeFirstLetter(editFormData.address)}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                    minHeight: "60px",
                    resize: "vertical",
                  }}
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: 500,
                  }}
                >
                  Role
                </label>
                <select
                  name="role"
                  value={editFormData.role}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                >
                  <option value="admin">Admin</option>
                  <option value="superAdmin">Super Admin</option>
                  <option value="inspectionOfficer">Inspection Officer</option>
                </select>
              </div>
            </div>

            <div
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "15px",
              }}
            >
              <Button
                variant="outlined"
                style={{
                  color: "var(--primary-color)",
                  fontWeight: "700",
                }}
                onClick={() => setEditMode(false)}
                sx={{
                  borderColor: "var(--primary-color)",
                  color: "var(--primary-color)",
                  "&:hover": {
                    borderColor: "var(--primary-color)",
                    backgroundColor: "rgba(var(--primary-color-rgb), 0.1)",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{
                  fontWeight: "700",
                  color: "var(--black-color)",
                }}
                onClick={handleEditSubmit}
                sx={{
                  backgroundColor: "var(--primary-color)",
                  "&:hover": {
                    backgroundColor: "var(--primary-dark-color)",
                  },
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={viewMode}
        onClose={() => setViewMode(false)}
        aria-labelledby="view-admin-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            borderRadius: 4,
            p: 0,
            outline: "none",
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
              Admin Details
            </h2>
          </div>

          {selectedAdmin && (
            <div style={{ padding: "30px" }}>
              <div style={{ display: "grid", gap: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "15px",
                    backgroundColor: "rgba(var(--primary-color-rgb), 0.1)",
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ fontWeight: 600, minWidth: "120px" }}>
                    Username:
                  </span>
                  <span>{capitalizeFirstLetter(selectedAdmin.userName)}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "15px",
                    backgroundColor: "rgba(var(--primary-color-rgb), 0.1)",
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ fontWeight: 600, minWidth: "120px" }}>
                    Email:
                  </span>
                  <span>{selectedAdmin.email}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "15px",
                    backgroundColor: "rgba(var(--primary-color-rgb), 0.1)",
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ fontWeight: 600, minWidth: "120px" }}>
                    Phone:
                  </span>
                  <span>{selectedAdmin.phone}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "15px",
                    backgroundColor: "rgba(var(--primary-color-rgb), 0.1)",
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ fontWeight: 600, minWidth: "120px" }}>
                    City:
                  </span>
                  <span>{capitalizeFirstLetter(selectedAdmin.city)}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "15px",
                    backgroundColor: "rgba(var(--primary-color-rgb), 0.1)",
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ fontWeight: 600, minWidth: "120px" }}>
                    Address:
                  </span>
                  <span>{capitalizeFirstLetter(selectedAdmin.address)}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "15px",
                    backgroundColor: "rgba(var(--primary-color-rgb), 0.1)",
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ fontWeight: 600, minWidth: "120px" }}>
                    Role:
                  </span>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "20px",
                      backgroundColor:
                        selectedAdmin.role === "superAdmin"
                          ? "#4CAF50"
                          : selectedAdmin.role === "admin"
                          ? "#2196F3"
                          : "var(--primary-color)",
                      color:
                        selectedAdmin.role === "inspectionOfficer"
                          ? "var(--black-color)"
                          : "white",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    {selectedAdmin.role === "superAdmin"
                      ? "Super Admin"
                      : selectedAdmin.role === "admin"
                      ? "Admin"
                      : "Inspection Officer"}
                  </span>
                </div>
              </div>

              <div
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    color: "var(--black-color)",
                    fontWeight: "700",
                  }}
                  onClick={() => setViewMode(false)}
                  sx={{
                    backgroundColor: "var(--primary-color)",
                    "&:hover": {
                      backgroundColor: "var(--primary-light-color)",
                    },
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Admins;
