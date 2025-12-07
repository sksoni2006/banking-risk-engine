#pragma once
#include <string>
#include <vector>
#include "FinancialProduct.hpp"    

class Loan : public FinancialProduct {
protected:
    long loanId;
    long customerId;
    long branchId;
    double principal;
    double annualRate; // in percentage
    int termMonths;
public:
    Loan(long id, long cust, long br, double princ, double rate, int term);
    virtual ~Loan() = default;
    virtual std::string type() const override = 0;
    virtual double monthlyEMI() const;
    double getPrincipal() const;
    long getId() const;
};
