#!/usr/bin/env python3
# Simple report generator from data/risk_alerts.csv
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ALERTS_FILE = os.path.join(
    BASE_DIR,
    "cpp_engine",
    "build",
    "data",
    "risk_alerts.csv"
)

if not os.path.exists(ALERTS_FILE):
    print("No alerts file found. Expected at:", ALERTS_FILE)
    exit(1)

print("Reading alerts from:", ALERTS_FILE)

import csv
alerts = []
with open(ALERTS_FILE, "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        alerts.append(row)

print("Loaded alerts:", len(alerts))
for alert in alerts:
    print(alert)
