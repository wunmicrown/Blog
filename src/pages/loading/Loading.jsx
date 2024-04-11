import React from "react";
import ReactLoading from "react-loading";
const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReactLoading type="spin" color="green" />
    </div>
  );
};

export default Loading;
