import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";
const Home = () => {
  return (
    <>
      <div className="container p-5 icons-container mt-5 mb-5">
        <div className="d-flex justify-content-between ">
          <h1>Welcome to Team Velocity</h1>
          <i className="fas fa-cloud-download-alt fs-1"></i>
        </div>
        <p className="mt-5">
          We are excited to help get your dealership digitally ready for the
          world of e-commerce. To begin your digital ecosystem, please complete
          each section below with all the required information before moving
          forward.
        </p>

        <div className="d-flex justify-content-between">
          <span className="fs-4 ">Progress</span>
          <span className="fs-4">
            15% <span>complete</span>
          </span>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: "25%" }}
          ></div>
        </div>

        <div className="d-flex flex-wrap justify-content-between ">
          <div className="card rounded d-flex flex-column align-items-center  py-4 mt-5 icons me-1 col-12 col-md-6 col-lg-2">
            <Link to="/sideNav/inventor">
              <i className="fas fa-car-side  text-secondary icon-card"></i>
            </Link>
            <p className="mt-3 text-card">Inventory</p>
            <i className="material-icons text-danger">&#xe15d;</i>
          </div>
          <div className="card rounded d-flex flex-column align-items-center py-4 mt-5 icons me-1 col-12 col-md-6 col-lg-2">
            <Link to="/sideNav/accounts">
              <i className="fas fa-user text-secondary icon-card"></i>
            </Link>
            <p className="mt-3 text-card">Account</p>
            <i className="material-icons text-danger">&#xe15d;</i>
          </div>

          <div className="card rounded d-flex flex-column align-items-center py-4 mt-5 icons me-1 col-12 col-md-6 col-lg-2">
            <Link to="/sideNav/contacts">
              <i className="fas fa-phone-alt text-secondary icon-card"></i>
            </Link>
            <p className="mt-3 text-card">Contact</p>
            <i className="material-icons text-danger">&#xe15d;</i>
          </div>
          <div className="card rounded d-flex flex-column align-items-center py-4 mt-5 icons me-1 col-12 col-md-6 col-lg-2">
            <a href="/">
              <i className="fas fa-key text-secondary icon-card"></i>
            </a>
            <p className="mt-3 text-card">Access</p>
            <i className="material-icons text-danger">&#xe15d;</i>
          </div>
          <div className="card rounded d-flex flex-column align-items-center  py-4 mt-5 icons me-1 col-12 col-md-6 col-lg-2">
            <a href="/">
              <i className="fas fa-bullhorn text-secondary icon-card"></i>
            </a>
            <p className="mt-3 text-card">Advertising</p>
            <i className="material-icons text-danger">&#xe15d;</i>
          </div>
          <div className="card rounded d-flex flex-column align-items-center  py-4 mt-5 icons me-1 col-12 col-md-6 col-lg-2">
            <a href="/">
              <i className="fas fa-globe text-secondary icon-card"></i>
            </a>
            <p className="mt-3 text-card">Geo</p>
            <i className="material-icons text-danger">&#xe15d;</i>
          </div>
          <div className="card rounded d-flex flex-column align-items-center  py-4 mt-5 icons me-1 col-12 col-md-6 col-lg-2">
            <a href="/">
              <i className="fas fa-image text-secondary icon-card"></i>
            </a>
            <p className="mt-3 text-card">Expectations</p>
            <i className="material-icons text-danger">&#xe15d;</i>
          </div>
          <div className="card rounded d-flex flex-column align-items-center  py-4 mt-5 icons me-1 col-12 col-md-6 col-lg-2">
            <Link to="/sideNav/measurements">
              <i className="fas fa-chess-knight text-secondary icon-card"></i>
            </Link>
            <p className="mt-3 text-card">Measurement</p>
            <i className="material-icons text-danger">&#xe15d;</i>
          </div>
          <div className="card rounded d-flex flex-column align-items-center  py-4 mt-5 icons me-1  col-12 col-md-6 col-lg-2">
            <Link to="/sideNav/budject">
              <i className="fas fa-hand-holding-usd text-secondary icon-card"></i>
            </Link>
            <p className="mt-3 text-card">Budget</p>
            <i className="material-icons text-danger">&#xe15d;</i>
          </div>
          <div className="card rounded d-flex flex-column align-items-center  py-4 mt-5 icons me-1  col-12 col-md-6 col-lg-2">
            <a href="/">
              {" "}
              <i className="fas fa-scroll text-secondary icon-card"></i>
            </a>
            <p className="mt-3 text-card">Billing</p>
            <i className="material-icons text-danger">&#xe15d;</i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
