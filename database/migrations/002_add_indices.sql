-- 002_add_indices.sql
CREATE INDEX idx_accounts_branch ON accounts(branch_id);
CREATE INDEX idx_loans_branch ON loans(branch_id);
CREATE INDEX idx_payments_loan ON payments(loan_id);
CREATE INDEX idx_transactions_account ON transactions(account_id);
