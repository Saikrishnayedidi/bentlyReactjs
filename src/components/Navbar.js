import React from "react";
import "./Navbar.css";
// import { Bently } from "../assests/images/Bentley-Logo.png";
let username = "saikrishna";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow p-3 mb-5 bg-body rounded fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {/* <Bently /> */}
          Bently
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                <i className="fas fa-comments fs-4 p-1 mt-1 rounded-circle bg-dark text-secondary"></i>
              </a>
            </li>
            <li className="mt-2 position-relative">
              <span className="fs-5">Hi,</span>
              <a href="/" className="sing-out nav-link">
                signout
              </a>
            </li>
            <li className="nav-item d-flex">
              <span className="nav-link fs-5">{username}</span>
              <a className="nav-link active" aria-current="page" href="/">
                <i className="fas fa-user fs-4 p-1 rounded-circle mt-1 bg-dark text-secondary"></i>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle fs-5"
                href="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Test Bentley
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="/">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <i className="fas fa-comment-alt nav-link mt-1 fs-3"></i>
            </li>
            <li className="nav-item">
              <i className="fab fa-vimeo-square nav-link mt-1 fs-3 me-5"></i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
