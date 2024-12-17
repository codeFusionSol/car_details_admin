import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/Slices/Auth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { url } from "../../../utils/url.js";

const api = axios.create({
  baseURL: url,
});

const Login = () => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await api.post("/auth/login", formData);

      if (response?.data?.message !== "Login Successful") {
        dispatch(loginFailure(response?.data?.message));
        toast(`${response?.data?.message} ❌`, {
          style: {
            padding: "24px",
            fontSize: "1.2rem",
          },
        });
        return;
      }

      console.log(response);

      localStorage.setItem("token", JSON.stringify(response?.data?.token));
      toast("Login Success ✅", {
        style: {
          padding: "24px",
          fontSize: "1.2rem",
        },
      });
      setTimeout(() => {
        dispatch(loginSuccess(response?.data?.data));
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      toast(`${error.response?.data?.message} ❌`, {
        style: {
          padding: "24px",
          fontSize: "1.2rem",
          // Set desired padding here
        },
      });

      setTimeout(() => {
        dispatch(loginFailure(error.response?.data?.message));
      }, 2000);
    }
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--black-color)",
        }}
      >
          <img
            className="mx-auto"
            src="/assets/logo.png"
            width="200px"
            alt="logo"
          />
          <br />
          <div
            style={{
              backgroundColor: "var(--white-color)",
              padding: "2rem",
              borderRadius: "10px",
              width: "100%",
              maxWidth: "500px",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                fontSize: "2rem",
                fontWeight: "700",
                color: "var(--black-color)",
                marginBottom: "2rem",
              }}
            >
              Login
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "1rem" }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    fontSize: "1rem",
                  }}
                  required
                />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    fontSize: "1rem",
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: "var(--primary-color)",
                  color: "var(--black-color)",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                  marginBottom: "1rem",
                }}
              >
                Login
              </button>
            </form>
          </div>
      </div>
      <div className="p-4">
        <Toaster
          position={window.innerWidth <= 768 ? "bottom-right" : "top-right"}
        />
      </div>
    </>
  );
};

export default Login;
