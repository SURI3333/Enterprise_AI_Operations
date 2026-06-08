def optimize_system():
    load = [30, 40, 90, 95, 20]

    recommendations = []

    if max(load) > 80:
        recommendations.append("Shift load to low utilization facility")

    if min(load) < 25:
        recommendations.append("Reduce unused capacity")

    return {"recommendations": recommendations}