#pragma once
#include "Loan.hpp"
class HomeLoan : public Loan {
public:
    HomeLoan(long id, long cust, long br, double princ, double rate, int term);
    virtual std::string type() const override;
    // override EMI if needed
};
