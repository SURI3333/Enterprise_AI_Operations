from fastapi import APIRouter
from app.services.anomaly_service import detect_anomaly

router = APIRouter(prefix="/anomaly")

@router.get("/")
def anomaly():
    return detect_anomaly()