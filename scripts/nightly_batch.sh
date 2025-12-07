TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
mkdir -p data/logs
./scripts/run_cpp_engine.sh
cp data/risk_summary.sql data/logs/risk_summary_${TIMESTAMP}.sql
echo "Nightly batch done: $TIMESTAMP"
