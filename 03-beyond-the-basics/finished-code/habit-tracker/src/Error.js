import React from "react";

function Error({ error }) {
  return (
    <div
      style={{
        fontSize: "14px",
        color: "red",
        marginTop: "5px",
        marginBottom: "10px",
      }}
    >
      Ruh roh! {error.message}
    </div>
  );
}

export default Error;
