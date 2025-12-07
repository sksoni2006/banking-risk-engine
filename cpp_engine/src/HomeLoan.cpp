#include "HomeLoan.hpp"
HomeLoan::HomeLoan(long id, long cust, long br, double princ, double rate, int term)
    : Loan(id,cust,br,princ,rate,term) {}
std::string HomeLoan::type() const { return "HOME"; }
