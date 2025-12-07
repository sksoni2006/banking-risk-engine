-- Seed minimal data for demo
INSERT INTO branches (name, city) VALUES ('Central Branch','Guwahati');
INSERT INTO customers (first_name, last_name, dob) VALUES ('Ram','Kumar','1990-01-01');
INSERT INTO accounts (branch_id, customer_id, account_type, balance) VALUES (1,1,'SAVINGS',50000);
INSERT INTO loans (branch_id, customer_id, loan_type, principal, interest_rate, start_date, term_months)
  VALUES (1,1,'HOME',1000000,7.5,'2020-01-01',240);
-- Insert a few payments (some unpaid)
INSERT INTO payments (loan_id, due_date, amount, paid, paid_date) VALUES (1,'2024-08-01',7000,false,NULL);
INSERT INTO payments (loan_id, due_date, amount, paid, paid_date) VALUES (1,'2024-09-01',7000,false,NULL);
INSERT INTO payments (loan_id, due_date, amount, paid, paid_date) VALUES (1,'2024-10-01',7000,false,NULL);
