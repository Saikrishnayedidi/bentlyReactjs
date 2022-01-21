import React from "react";

const Button = (props) => {
  return (
    <>
      <div className="d-flex flex-column align-items-end">
        {props.children}
        {/* "rgb(13, 0, 87)" */}
        <button
          type="submit"
          className="btn rounded-pill text-light  px-5 mb-5 save-btn"
          style={{ backgroundColor: `${props.color}` }}
          disabled={props.disabled}
        >
          {props.text}
        </button>
      </div>
    </>
  );
};

export default Button;
