#pragma once
#include <string>
#include <vector>
#include <ctime>
#include "FinancialProduct.hpp" 

class TransactionRecord {
public:
    long id;
    double amount;
    std::string ttype;
    std::string timestamp;
    std::string description;
};

class Account : public FinancialProduct {
protected:
    long accountId;
    long customerId;
    long branchId;
    double balance;
public:
    Account(long accId, long custId, long brId, double bal);
    virtual ~Account() = default;
    virtual std::string type() const override = 0;
    virtual void deposit(double amt);
    virtual bool withdraw(double amt);
    double getBalance() const;
    long getId() const;
};
