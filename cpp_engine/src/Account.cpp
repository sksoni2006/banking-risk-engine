#include "Account.hpp"
#include <sstream>
Account::Account(long accId, long custId, long brId, double bal)
    : accountId(accId), customerId(custId), branchId(brId), balance(bal) {}

void Account::deposit(double amt) { balance += amt; }
bool Account::withdraw(double amt) {
    if (balance - amt < 0) return false;
    balance -= amt;
    return true;
}
double Account::getBalance() const { return balance; }
long Account::getId() const { return accountId; }
