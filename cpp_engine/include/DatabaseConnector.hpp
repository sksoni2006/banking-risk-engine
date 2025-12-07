#pragma once
#include <string>
#include <vector>
#include <iostream>


class DatabaseConnector {
public:
    DatabaseConnector(const std::string &connStr = "");
    ~DatabaseConnector();
    std::vector<std::string> fetchActiveLoans(); // returns CSV lines
    void writeRiskAlert(const std::string &csvLine);
};
