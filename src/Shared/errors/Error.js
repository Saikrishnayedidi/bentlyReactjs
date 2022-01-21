import React from "react";

const Error = (props) => {
  return (
    <>
      <div class="alert alert-danger" role="alert">
        {props.children}
      </div>
    </>
  );
};

export default Error;
