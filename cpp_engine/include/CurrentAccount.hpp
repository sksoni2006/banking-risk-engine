#pragma once
#include "Account.hpp"
class CurrentAccount : public Account {
public:
    CurrentAccount(long accId, long custId, long brId, double bal);
    virtual std::string type() const override;
};
