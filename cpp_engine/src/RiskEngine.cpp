#include "RiskEngine.hpp"
#include <fstream>
#include <chrono>
#include <ctime>
#include <sstream>
#include <iomanip>

RiskEngine::RiskEngine(const std::string &outPath) : outFile(outPath) {
    // write header
    std::ofstream ofs(outFile, std::ios::app);
    if (ofs.tellp() == 0) {
        ofs << "created_at,branch_id,customer_id,loan_id,alert_type,details\n";
    }
    ofs.close();
}

RiskEngine::~RiskEngine() {}

void RiskEngine::emitAlert(const RiskAlert &a) {
    alerts.push_back(a);
    std::ofstream ofs(outFile, std::ios::app);
    ofs << a.created_at << "," << a.branch_id << "," << a.customer_id << "," << a.loan_id << ",\""
        << a.alert_type << "\",\"" << a.details << "\"\n";
    ofs.close();
}

std::vector<RiskAlert> RiskEngine::getAlerts() const { return alerts; }

void RiskEngine::analyzeLoans(const std::vector<Loan*> &loans, const std::vector<std::vector<bool>> &missedPayments) {
    // For each loan, if missedPayments count >=3 => NPA alert
    for (size_t i=0;i<loans.size();++i) {
        int missed = 0;
        for (bool b: missedPayments[i]) if (b) ++missed;
        if (missed >= 3) {
            RiskAlert a;
            auto now = std::chrono::system_clock::now();
            std::time_t t = std::chrono::system_clock::to_time_t(now);
            a.created_at = std::string(std::ctime(&t));
            // strip newline
            if(!a.created_at.empty() && a.created_at.back()=='\n') a.created_at.pop_back();
            a.branch_id = loans[i]->getId(); // demo: loan id as branch_id placeholder
            a.customer_id = 0;
            a.loan_id = loans[i]->getId();
            a.alert_type = "NPA_DETECTED";
            std::ostringstream os;
            os << "Loan " << loans[i]->getId() << " missed " << missed << " payments";
            a.details = os.str();
            emitAlert(a);
        }
    }
}

void RiskEngine::analyzeTransactions(const std::vector<Account*> &accounts) {
    // Demo rule: if account balance drops > 50% in one go -> generate alert
    for (auto acc : accounts) {
        if (acc->getBalance() < 1000.0) { // arbitrary rule for demo
            RiskAlert a;
            auto now = std::chrono::system_clock::now();
            std::time_t t = std::chrono::system_clock::to_time_t(now);
            a.created_at = std::string(std::ctime(&t));
            if(!a.created_at.empty() && a.created_at.back()=='\n') a.created_at.pop_back();
            a.branch_id = acc->getId();
            a.customer_id = 0;
            a.loan_id = 0;
            a.alert_type = "LOW_BALANCE_ALERT";
            a.details = "Balance below threshold: " + std::to_string(acc->getBalance());
            emitAlert(a);
        }
    }
}
