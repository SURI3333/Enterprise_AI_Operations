from fastapi import APIRouter
from app.services.optimizer import optimize_system

router = APIRouter(prefix="/optimization")

@router.get("/")
def optimize():
    return optimize_system()