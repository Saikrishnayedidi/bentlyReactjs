import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./sideNav.module.scss";

const Sidenav = () => {
  return (
    <>
      <nav className={`navbar navbar-light ${styles.header} `}>
        <div className="container-fluid py-2">
          <i className="fas fa-home text-light fs-1"></i>
          <div className={`progress col-6 me-auto ${styles.progress}`}>
            <div className={`${styles.progressbar}`} role="progressbar"></div>
          </div>
          <span className={`${styles.percent} text-light`}>15% complete</span>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          <div className={`col-md-2 ${styles.background}`}>
            <div className={styles.sidebar}>
              <div className="lists-data">
                <ul className="nav-list">
                  <li className={`${styles.navlink} fs-5`}>
                    <NavLink to="/" className="text-dark py-3 d-block ps-3">
                      SUMMARY
                    </NavLink>
                  </li>
                  <li className={`${styles.navlink} fs-5`}>
                    <NavLink
                      to="inventor"
                      className="text-dark py-3 d-block ps-3"
                    >
                      INVENTOR
                    </NavLink>
                  </li>
                  <li className={`${styles.navlink} fs-5`}>
                    <NavLink
                      to="accounts"
                      className="text-dark py-3 d-block ps-3"
                    >
                      ACCOUNTS
                    </NavLink>
                  </li>
                  <li className={`${styles.navlink} fs-5`}>
                    <NavLink
                      to="contacts"
                      className="text-dark py-3 d-block ps-3"
                    >
                      CONTACTS
                    </NavLink>
                  </li>
                  <li className={`${styles.navlink} fs-5`}>
                    <NavLink
                      to="budject"
                      className="text-dark py-3 d-block ps-3"
                    >
                      BUDGET
                    </NavLink>
                  </li>
                  <li className={`${styles.navlink} fs-5`}>
                    <NavLink
                      to="access"
                      className="text-dark py-3 d-block ps-3"
                    >
                      ACCESS
                    </NavLink>
                  </li>
                  <li className={`${styles.navlink} fs-5`}>
                    <a className="text-dark py-3 d-block ps-3" href="#">
                      EXPECTATIONS
                    </a>
                  </li>
                  <li className={`${styles.navlink} fs-5`}>
                    <a className="text-dark py-3 d-block ps-3" href="#">
                      ADVERTISING
                    </a>
                  </li>
                  <li className={`${styles.navlink} fs-5`}>
                    <NavLink to="geo" className="text-dark py-3  d-block ps-3">
                      GEO
                    </NavLink>
                  </li>
                  <li className={`${styles.navlink} fs-5`}>
                    <a className="text-dark py-3 d-block ps-3" href="#">
                      BILLING
                    </a>
                  </li>
                  <li className={`${styles.navlink} fs-5`}>
                    <NavLink
                      to="measurements"
                      className="text-dark py-3 d-block ps-3"
                    >
                      MEASUREMENT
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-10 scroll">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
