from sklearn.ensemble import IsolationForest
import numpy as np

def detect_anomaly():
    data = [10, 12, 14, 13, 500, 15, 14]

    model = IsolationForest(contamination=0.1)
    arr = np.array(data).reshape(-1, 1)

    result = model.fit_predict(arr)

    return {"data": data, "anomaly": result.tolist()}