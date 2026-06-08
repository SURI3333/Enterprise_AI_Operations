from fastapi import APIRouter
from app.services.simulator import simulate_scenario

router = APIRouter(prefix="/simulation")

@router.get("/")
def simulate():
    return simulate_scenario()