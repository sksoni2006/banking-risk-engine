#include <iostream>
#include <vector>
#include <filesystem>
#include "HomeLoan.hpp"
#include "SavingsAccount.hpp"
#include "RiskEngine.hpp"
#include "DatabaseConnector.hpp"

int main() {
    std::cout << "Starting C++ Risk Engine (demo)\n";

    std::string outputPath = "/app/data/risk_alerts.csv";

    HomeLoan loan1(1, 1, 1, 1000000.0, 7.5, 240);
    HomeLoan loan2(2, 2, 1, 200000.0, 9.0, 60);
    std::vector<Loan*> loans = { &loan1, &loan2 };

    std::vector<std::vector<bool>> missed = {
        {true,true,true,false},  // loan1 missed 3 -> NPA
        {false,false,true,false} // loan2 missed 1 -> ok
    };

    SavingsAccount acc1(1,1,1,500.0);
    SavingsAccount acc2(2,2,1,70000.0);
    std::vector<Account*> accounts = { &acc1, &acc2 };

    // 2. Pass the absolute path
    RiskEngine engine(outputPath);
    engine.analyzeLoans(loans, missed);
    engine.analyzeTransactions(accounts);

    auto alerts = engine.getAlerts();
    std::cout << "Generated " << alerts.size() << " alerts.\n";
    for (auto &a : alerts) {
        std::cout << a.created_at << " | " << a.alert_type << " | " << a.details << "\n";
    }

    std::cout << "C++ risk engine finished. Alerts written to " << outputPath << "\n";

    return 0;
}
