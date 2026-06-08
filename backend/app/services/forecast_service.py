import pandas as pd
import numpy as np
import os

def forecast_data():
    BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.."))
    file_path = os.path.join(BASE_DIR, "ml-services", "data", "sample.csv")

    print("Reading file from:", file_path)

    df = pd.read_csv(file_path)

    # ✅ Simple forecast (rolling average)
    df["forecast"] = df["value"].rolling(window=2).mean()

    # ✅ Fix JSON error
    df = df.replace([np.inf, -np.inf], np.nan)
    df = df.fillna(0)

    return df.tail(5).to_dict(orient="records")