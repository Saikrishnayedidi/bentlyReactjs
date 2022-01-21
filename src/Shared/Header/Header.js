import React from "react";

const Header = (props) => {
  let border = ["border-bottom", props.borderWidth, props.borderColor];
  return (
    <>
      <div className="d-flex justify-content-between mt-4">
        <h3>{props.title}</h3>
        <div className="d-flex align-items-center">
          {props.progress && <i className="material-icons me-3">&#xe15d;</i>}

          <h3>{props.progress}</h3>
        </div>
      </div>
      <p className={border.join(" ")}></p>
    </>
  );
};

export default Header;
