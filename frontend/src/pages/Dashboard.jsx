import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Scatter
} from "recharts";

const Dashboard = () => {

  const [page, setPage] = useState("dashboard");
  const [forecast, setForecast] = useState([]);
  const [anomaly, setAnomaly] = useState({});
  const [optimization, setOptimization] = useState([]);
  const [simulation, setSimulation] = useState({});

  // ✅ Fetch Data
  const fetchData = async () => {
    try {
      const f = await axios.get("http://127.0.0.1:8000/forecast/");
      const a = await axios.get("http://127.0.0.1:8000/anomaly/");
      const o = await axios.get("http://127.0.0.1:8000/optimization/");
      const s = await axios.get("http://127.0.0.1:8000/simulation/");

      setForecast(f.data);

      setAnomaly({
        data: a.data.data,
        flags: a.data.anomaly,
      });

      setOptimization(o.data.recommendations || []);
      setSimulation(s.data || {});

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ REAL-TIME AUTO REFRESH (Every 3 seconds)
  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ✅ anomaly chart
  const anomalyChart =
    anomaly.data?.map((v, i) => ({
      index: i,
      value: v,
      anomaly: anomaly.flags?.[i] === -1 ? v : null,
    })) || [];

  return (
    <div style={{ display: "flex", fontFamily: "Arial" }}>

      {/* ✅ SIDEBAR */}
      <div style={sidebar}>
        <h2 style={{
              fontSize: "22px",
              fontWeight: "bold",
              marginBottom: "25px",

              // ✅ bright gradient text
              background: "linear-gradient(90deg, #00ffc8, #38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",

              // ✅ glow effect
              textShadow: "0 0 10px rgba(0,255,200,0.6)"
            }}>
              ⚡ AI Ops
            </h2>

            

        <div style={menu} onClick={() => setPage("dashboard")}>Dashboard</div>
        <div style={menu} onClick={() => setPage("forecast")}>Forecast</div>
        <div style={menu} onClick={() => setPage("anomaly")}>Anomaly</div>
        <div style={menu} onClick={() => setPage("optimization")}>Optimization</div>
        <div style={menu} onClick={() => setPage("simulation")}>Simulation</div>
      </div>

      {/* ✅ MAIN */}
      <div style={main}>

                      <h1 style={{
                fontSize: "38px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "10px",

                // ✅ prevent cutting
                whiteSpace: "normal",
                wordBreak: "break-word",

                // ✅ limit width properly
                maxWidth: "90%",
                marginLeft: "auto",
                marginRight: "auto",

                // ✅ gradient
                background: "linear-gradient(90deg, #00ffc8, #00aaff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",

                // ✅ softer glow (prevents overflow cut)
                textShadow: "0 0 10px rgba(0,255,200,0.4)"
              }}>
                🚀 Enterprise AI Dashboard
              </h1>


        {/* ✅ SUBTITLE (ADD HERE) */}
        <p style={{
          textAlign: "center",
          color: "#9ca3af",
          fontSize: "18px"
        }}>
          Real-time AI monitoring • Forecast • Optimization • Simulation
        </p>

        

        {/* ✅ DASHBOARD */}
        {page === "dashboard" && (
          <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            <Card title="Anomalies" value={anomaly.flags?.filter(x => x === -1).length || 0} />
            <Card title="Optimizations" value={optimization.length} />
            <Card title="Risk" value={simulation.failure_risk || "N/A"} />
          </div>
        )}

        {/* ✅ FORECAST */}
        {page === "forecast" && (
          <div>
            <h2 style={{
          fontSize: "28px",
          fontWeight: "600",
          marginBottom: "15px",
          color: "#00ffc8",

          // ✅ glow effect
          textShadow: "0 0 10px rgba(0,255,200,0.6)"
        }}>
          📈 Forecast Analytics
        </h2>

               <p style={descStyle}>
                This chart shows predicted trends over time, helping in future planning and demand forecasting.
              </p>

              

            <LineChart width={750} height={300} data={forecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(162, 91, 91)" />
              <XAxis dataKey="timestamp" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="rgb(0, 255, 200)" strokeWidth={3} />
            </LineChart>
            
            <p style={{
                marginBottom: "20px",
                color: "#cbd5f5",
                fontSize: "15px",
                maxWidth: "720px"
              }}>
                The forecast chart predicts system trends using historical data patterns.
                It helps in planning resources, identifying growth cycles, and avoiding potential system overloads.
              </p>



          </div>
        )}

        {/* ✅ ANOMALY */}
        {page === "anomaly" && (
          <div>
                        <h2 style={{
              fontSize: "28px",
              color: "#ff4d4d",   // ✅ red highlight
              textShadow: "0 0 10px rgba(255, 77, 77, 0.7)",
              marginBottom: "10px"
            }}>
              ⚠️ Anomaly Detection
            </h2>
            
            <LineChart width={750} height={300} data={anomalyChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="index" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line dataKey="value" stroke="rgb(0, 255, 200)" strokeWidth={3} />
              <Scatter dataKey="anomaly" fill="red" />
            </LineChart>

            
            <p style={{
              marginTop: "5px",
              marginBottom: "20px",
              color: "#cbd5f5",
              fontSize: "15px",
              lineHeight: "1.6",
              maxWidth: "720px"
            }}>
              This visualization highlights unusual spikes in system behavior using AI-based anomaly detection.
              Each data point represents system activity over time. Significant peaks indicate abnormal events
              that may require attention or further investigation.
            </p>

            
              <p style={{ color: "#f87171" }}>
                  ⚠️ <b>Detected Anomaly:</b> A sharp spike observed around index 4 indicates abnormal system activity.
                </p>

              <p style={{ color: "#94a3b8" }}>
                  📊 <b>Pattern Insight:</b> Normal activity remains stable except for this sudden peak.
                </p>

              <p style={{ color: "#34d399" }}>
                  ✅ <b>Recommendation:</b> Investigate system logs at this interval to identify root cause.
                </p>


          </div>
        )}

        {/* ✅ OPTIMIZATION */}
        {page === "optimization" && (
          <div>
            <h2 style={{
                  fontSize: "28px",
                  color: "#38bdf8",
                  textShadow: "0 0 10px rgba(56,189,248,0.6)",
                  marginBottom: "10px"
            }}>
              ⚙️ Optimization Engine
            </h2>
            <p style={descStyle}>
              Optimization recommendations help improve performance and reduce resource waste.
              These AI-driven suggestions enhance efficiency.
            </p>
            {optimization.map((item, i) => (
              <div key={i} style={box}>
                ✅ {item}
              </div>
            ))}
          </div>
        )}

        {/* ✅ SIMULATION */}
        {page === "simulation" && (
          <div>
            <h2 style={{
              fontSize: "28px",
              color: "#facc15",
              textShadow: "0 0 10px rgba(250,204,21,0.6)",
              marginBottom: "10px"
            }}>
              🧠 Simulation Analysis
            </h2>
            
            <p style={descStyle}>
                  Simulation provides insights into system behavior under different conditions.
                  It helps in predicting risks and planning strategies.
                </p>

            <div style={box}>Event: {simulation.event}</div>
            <div style={box}>Impact: {simulation.impact}</div>
            <div style={box}>Cost: {simulation.cost_increase}</div>
            <div style={box}>Risk: {simulation.failure_risk}</div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;

/* ✅ STYLES */


const sidebar = {
  width: "230px",
  height: "100vh",
  padding: "20px",
  color: "white",
  background: "linear-gradient(180deg, #0f172a, #020617)"
};

const menu = {
  cursor: "pointer",
  marginTop: "12px",
  padding: "10px",
  borderRadius: "8px",
  color: "#94a3b8",
  transition: "0.3s"
};

const main = {
  flex: 1,
  padding: "30px",
  minHeight: "100vh",
  color: "white",
  background: "radial-gradient(circle at top, #0f2027, #0a0f1c, #000000)"
};

const box = {
  background: "rgb(103, 217, 251)",
  padding: "15px",
  marginTop: "10px",
  borderRadius: "8px"
};

const Card = ({ title, value }) => (
  <div style={{
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    padding: "20px",
    width: "200px",
    boxShadow: "0 4px 30px rgba(0, 255, 200, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "0.3s"
  }}>
    <h4 style={{ color: "#94a3b8" }}>{title}</h4>
    <h1 style={{ color: "#00ffc8" }}>{value}</h1>
  </div>
);

const headingStyle = {
  fontSize: "28px",
  color: "#00ffc8",
  textShadow: "0 0 10px rgba(0,255,200,0.6)",
  marginBottom: "15px"
};

const descStyle = {
  color: "#94a3b8",
  fontSize: "15px",
  marginBottom: "20px",
  maxWidth: "700px",
  lineHeight: "1.6"
};
