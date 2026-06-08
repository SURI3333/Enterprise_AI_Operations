from fastapi import APIRouter
from app.services.forecast_service import forecast_data

router = APIRouter(prefix="/forecast")

@router.get("/")
def get_forecast():
    return forecast_data()