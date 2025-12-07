#include <iostream>
#include "../include/HomeLoan.hpp"
int main() {
    HomeLoan loan(1,1,1,100000,7.5,120);
    double emi = loan.monthlyEMI();
    std::cout << "EMI: " << emi << std::endl;
    return 0;
}
