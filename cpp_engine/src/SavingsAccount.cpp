#include "SavingsAccount.hpp"
SavingsAccount::SavingsAccount(long accId, long custId, long brId, double bal)
    : Account(accId,custId,brId,bal) {}
std::string SavingsAccount::type() const { return "SAVINGS"; }
