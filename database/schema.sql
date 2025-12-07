-- Complete schema (PostgreSQL)
CREATE TABLE branches (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  dob DATE
);

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  branch_id INTEGER REFERENCES branches(id),
  customer_id INTEGER REFERENCES customers(id),
  account_type TEXT CHECK (account_type IN ('SAVINGS','CURRENT')),
  balance NUMERIC(18,2) DEFAULT 0.0
);

CREATE TABLE loans (
  id SERIAL PRIMARY KEY,
  branch_id INTEGER REFERENCES branches(id),
  customer_id INTEGER REFERENCES customers(id),
  loan_type TEXT,
  principal NUMERIC(18,2) NOT NULL,
  interest_rate NUMERIC(5,2) NOT NULL, -- annual %
  start_date DATE,
  term_months INTEGER,
  status TEXT CHECK (status IN ('ACTIVE','CLOSED','NPA')) DEFAULT 'ACTIVE'
);

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  loan_id INTEGER REFERENCES loans(id),
  due_date DATE,
  paid_date DATE,
  amount NUMERIC(18,2),
  paid BOOLEAN DEFAULT FALSE
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  account_id INTEGER REFERENCES accounts(id),
  amount NUMERIC(18,2),
  ttype TEXT CHECK (ttype IN ('DEBIT','CREDIT')),
  timestamp TIMESTAMP DEFAULT now(),
  description TEXT
);

CREATE TABLE risk_alerts (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT now(),
  branch_id INTEGER,
  customer_id INTEGER,
  loan_id INTEGER,
  alert_type TEXT,
  details TEXT
);
