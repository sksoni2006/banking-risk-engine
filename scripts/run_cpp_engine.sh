set -e
pushd cpp_engine >/dev/null
mkdir -p build
cd build
cmake ..
cmake --build . --config Release
./risk_engine
popd >/dev/null
echo "C++ risk engine finished. Alerts written to data/risk_alerts.csv and data/risk_summary.sql"
