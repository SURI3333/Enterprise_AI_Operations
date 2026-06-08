import React from "react";

const Card = ({ title, value }) => {
  return (
    <div style={{
      background: "#d7e2ab",
      color: "#fff",
      padding: "20px",
      borderRadius: "10px",
      width: "200px",
      textAlign: "center"
    }}>
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
};

export default Card;