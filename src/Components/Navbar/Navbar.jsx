import { Link, } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { formState } = useSelector((state) => state.sidebar);
  return (
    <>
      <header className="navbar p-0 m-0  ">
        <div className="d-flex justify-between items-center w-50 px-5 gap-5 p-0 mx-0 mb-4 navleftSideDiv">
          <div className="navbar__logo d-flex justify-content-center align-items-center s px-5 py-4">
            <img
              src="https://inspectionreport.famewheels.com/_next/static/media/fame-wheels-logo.ff4003a3.png" // Replace with the path to your logo
              alt="Fame Wheels"
              width="200px"
              className="navbar__logo-image"
            />
          </div>
          <div className="navbar__search">
            {!formState ? (
              <>
                <div className="d-flex justify-content-center align-items-center p-0 px-md-3 px-1 inputDiv   ">
                  <input
                    type="text"
                    placeholder="Search your car"
                    className="navbar__search-input p-0 m-0 "
                  />
                  <button className="navbar__search-button ">
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
          </div>
        </div>
        <div className="navbar__nav w-50 flex justify-content-center align-items-center m-0 p-0 ">
          <a
            id="navbar__link1"
            className="navbar__link px-4 py-4 m-0"
            style={{
              textDecoration: "none",
              color: "black",
              borderBottom: !formState ? "2px solid black" : "none",
            }}
          >
            Dashboard
          </a>
          <a className="navbar__link px-5 py-4 m-0">
            Logout
          </a>
        </div>
      </header>
    </>
  );
};

export default Navbar;
