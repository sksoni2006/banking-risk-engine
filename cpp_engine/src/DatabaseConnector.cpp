#include "DatabaseConnector.hpp"
#include <fstream>
#include <iostream>
#include <vector>
#include <string>

DatabaseConnector::DatabaseConnector(const std::string &connStr) {
    // For demo, ignore connStr
}

DatabaseConnector::~DatabaseConnector() {}

std::vector<std::string> DatabaseConnector::fetchActiveLoans() {
    // Demo: read database/seed/seed-data.sql to find loans (very naive)
    std::vector<std::string> res;
    std::ifstream ifs("database/seed/seed-data.sql");
    std::string line;
    while (std::getline(ifs, line)) {
        if (line.find("INSERT INTO loans") != std::string::npos) {
            res.push_back(line);
        }
    }
    return res;
}

void DatabaseConnector::writeRiskAlert(const std::string &csvLine) {
    std::ofstream ofs("data/risk_alerts_from_cpp.csv", std::ios::app);
    ofs << csvLine << "\n";
    ofs.close();
}
