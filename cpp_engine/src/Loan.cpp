#include "Loan.hpp"
#include <cmath>
Loan::Loan(long id, long cust, long br, double princ, double rate, int term)
    : loanId(id), customerId(cust), branchId(br), principal(princ), annualRate(rate), termMonths(term) {}
double Loan::monthlyEMI() const {
    double r = (annualRate/100.0)/12.0;
    if (r <= 0.0) return principal / termMonths;
    double emi = (principal * r * pow(1+r, termMonths)) / (pow(1+r, termMonths)-1);
    return emi;
}
double Loan::getPrincipal() const { return principal; }
long Loan::getId() const { return loanId; }
