#pragma once
#include <string>

class FinancialProduct {
public:
    virtual ~FinancialProduct() = default;
    virtual std::string type() const = 0;   // <-- THIS WAS MISSING
};
