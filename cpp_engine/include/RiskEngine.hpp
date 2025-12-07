#pragma once
#include <vector>
#include <string>
#include "Loan.hpp"
#include "Account.hpp"

struct RiskAlert {
    std::string created_at;
    long branch_id;
    long customer_id;
    long loan_id; // 0 if not loan-specific
    std::string alert_type;
    std::string details;
};

class RiskEngine {
public:
    RiskEngine(const std::string &outPath = "data/risk_alerts.csv");
    ~RiskEngine();
    void analyzeLoans(const std::vector<Loan*> &loans, const std::vector<std::vector<bool>> &missedPayments);
    void analyzeTransactions(const std::vector<Account*> &accounts);
    std::vector<RiskAlert> getAlerts() const;
private:
    std::vector<RiskAlert> alerts;
    std::string outFile;
    void emitAlert(const RiskAlert &a);
};
