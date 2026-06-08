from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ Allow your frontend
origins = [
    "http://localhost:5173",  # Vite React
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# your routes
from app.api.routes import forecast, anomaly, optimization, simulation

app.include_router(forecast.router)
app.include_router(anomaly.router)
app.include_router(optimization.router)
app.include_router(simulation.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Enterprise AI Operations API!"}
