import React from "react";

function Error({ error }) {
  return <p>Ruh roh! {error.message}</p>;
}

export default Error;
