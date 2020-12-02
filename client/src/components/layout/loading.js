import React from "react";
import loading from "../../img/spinner.gif";

export default function Loading() {
  return (
    <>
      <img
        src={loading}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="loading..."
      />
      
    </>
  );
}