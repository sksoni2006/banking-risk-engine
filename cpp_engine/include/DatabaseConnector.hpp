#pragma once
#include <string>
#include <vector>
#include <iostream>

/*
 DatabaseConnector is a simple abstraction used here to simulate DB interactions.
 For a production build you would use libpqxx or other DB drivers.
 Here it reads/writes CSV/SQL files for demo purposes.
*/
class DatabaseConnector {
public:
    DatabaseConnector(const std::string &connStr = "");
    ~DatabaseConnector();
    // Demo APIs: fetch minimal dataset from CSV/seed
    std::vector<std::string> fetchActiveLoans(); // returns CSV lines
    void writeRiskAlert(const std::string &csvLine);
};
