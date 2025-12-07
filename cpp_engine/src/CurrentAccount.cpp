#include "CurrentAccount.hpp"
CurrentAccount::CurrentAccount(long accId, long custId, long brId, double bal)
    : Account(accId,custId,brId,bal) {}
std::string CurrentAccount::type() const { return "CURRENT"; }
