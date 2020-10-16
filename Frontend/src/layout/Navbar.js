import React from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid px-2">
        <a
          href="http://localhost:3000/"
          alt=".."
          className="navbar-brand font-weight-bold  "
        >
          Right Companion
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#" alt="...">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" alt="...">
                About Us
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link">Products</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" alt="...">
                Meeting
              </a>
            </li>
          </ul>
          <form className="form-inline ml-3">
            <input
              className="form-control px-3"
              type="search"
              placeholder="Search Here"
              aria-label="Search"
              style={{ borderRadius: "20px", lineHeight: "0" }}
            />
            <button
              className="btn ml-2"
              type="submit"
              style={{
                borderRadius: "20px",
                lineHeight: "0",
                boxShadow: "none",
                outline: "none",
              }}
            >
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
