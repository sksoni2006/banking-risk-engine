
This repository contains:
- C++ core engine (cpp_engine/) implementing OOPS-based loan/account abstractions and a RiskEngine.
- Database SQL schema and migration scripts (database/).
- Scripts to run nightly batch and generate reports (scripts/).

Build & run (C++):
1. ./scripts/run_cpp_engine.sh
2. Check data/risk_alerts.csv and data/risk_summary.sql

NOTE: DatabaseConnector in C++ is a demo stub. For production integrate libpqxx and connect to PostgreSQL.

