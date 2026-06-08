import React from "react";

const Sidebar = ({ setPage }) => {
  return (
    <div style={{
      width: "220px",
      height: "100vh",
      background: "rgb(56, 161, 182)",
      color: "#fff",
      padding: "20px"
    }}>
      <h2>⚡ AI Ops</h2>

      <div onClick={() => setPage("dashboard")} style={{ cursor: "pointer", marginTop: "20px" }}>📊 Dashboard</div>
      <div onClick={() => setPage("anomaly")} style={{ cursor: "pointer", marginTop: "10px" }}>⚠️ Anomalies</div>
      <div onClick={() => setPage("optimization")} style={{ cursor: "pointer", marginTop: "10px" }}>⚙️ Optimization</div>
      <div onClick={() => setPage("forecast")} style={{ cursor: "pointer", marginTop: "10px" }}>📈 Forecast</div>
    </div>
  );
};

export default Sidebar;