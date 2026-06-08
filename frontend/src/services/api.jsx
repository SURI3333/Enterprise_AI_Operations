import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getForecast = async () => {
  return await API.get("/forecast/");
};

export const getAnomaly = async () => {
  return await API.get("/anomaly/");
};

export const getOptimization = async () => {
  return await API.get("/optimization/");
};

export const getSimulation = async () => {
  return await API.get("/simulation/");
};