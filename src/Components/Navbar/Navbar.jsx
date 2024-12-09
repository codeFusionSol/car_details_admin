import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { changeSidebarState } from "../../redux/Slices/Sidebar";
import SearchIcon from '@mui/icons-material/Search';


const Navbar = () => {
  const { formState } = useSelector((state) => state.sidebar);
  const { isOpen } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  return (
    <>
      <header className="navbar p-0 m-0">
        <div className="d-flex justify-between align-items-center w-50 mb-0 px-5  p-0 mx-0  navleftSideDiv">
          <div className="navbar__logo d-flex justify-content-center align-items-center  px-1 py-3">
            <Link to="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
            <img
              src="/assets/logo.png"
              alt="Fame Wheels"
              width="200px"
              className="navbar__logo-image"
            /></Link>
          </div>
          <div className="navbar__search ms-md-5 ">
            {!formState ? (
              <>
                <div className="d-flex justify-content-center align-items-center p-0 px-md-3 px-1 inputDiv">
                  <input
                    type="text"
                    placeholder="Search your car"
                    className="navbar__search-input p-0 m-0"
                  />
                  <button className="navbar__search-button">
                    <span role="img" aria-label="search">
                      🔍
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="heading">
                  Car <span>Inspection</span>
                </h2>
              </>
            )}
            <div className="hamburger" onClick={() => dispatch(changeSidebarState())}>
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
            </div>
          </div>
        </div>
        <div className="navbar__nav w-50 h-100 flex justify-content-end align-items-center m-0 p-0">
          <Link
            to="/"
            className="navbar__link px-5 py-4 m-0"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;
