#pragma once
#include "Account.hpp"
class SavingsAccount : public Account {
public:
    SavingsAccount(long accId, long custId, long brId, double bal);
    virtual std::string type() const override;
    // add interest calc if needed
};
