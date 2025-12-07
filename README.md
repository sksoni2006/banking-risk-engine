
# 🏦 Banking Risk & Compliance Automation Engine

A high-performance **Core Banking Simulation & Risk Analytics Platform** that detects Non-Performing Assets (NPAs) and Liquidity Risks in real-time. This project integrates a **C++ Batch Processing Engine** with a modern **Node.js & React Microservices Architecture**.

-----

📖 Table of Contents

  - [Project Overview]
  - [System Architecture]
  - [Key Features]
  - [Tech Stack]
  - [Prerequisites]
  - [Installation & Quick Start]
  - [How to Run the Demo]
  - [Database Schema]
  - [Folder Structure]

-----

Here is a composite image showcasing the live application, the C++ engine logs, and the API sync command working together:

<img width="1470" height="803" alt="Image" src="https://github.com/user-attachments/assets/ee3de992-0d94-4d15-b471-16568a159dea" />
<img width="1470" height="803" alt="Image" src="https://github.com/user-attachments/assets/308bc111-2a7f-42c3-9b5e-b073c9fc9f02" />
<img width="1464" height="800" alt="Image" src="https://github.com/user-attachments/assets/33cc9cb0-59ba-48e5-be85-ce54a685f2e4" />
<img width="1468" height="802" alt="Image" src="https://github.com/user-attachments/assets/5cb897c1-513f-416b-99dd-6da882cc4545" />
<img width="1470" height="801" alt="Image" src="https://github.com/user-attachments/assets/f9821cf4-4b83-45d9-80cf-febfef4e8704" />
<img width="1470" height="802" alt="Image" src="https://github.com/user-attachments/assets/fb073738-5eb2-40df-8593-82e40cb3c482" />


 🔍 Project Overview

In modern banking, identifying high-risk customers and ensuring branch liquidity is critical. This engine simulates a "Nightly Batch Process" where a high-speed C++ backend iterates through thousands of loan records to compute interest, generate repayment schedules, and flag anomalies.

What problem does it solve?

  * **Revenue Leakage:** Automatically detects loans with 3+ missed payments (NPA Classification).
  * **Liquidity Crisis:** Monitors Branch-level Asset-Liability Ratios to prevent insolvency.
  * **Operational Efficiency:** Automates the flow of risk data from the core ledger (C++) to the manager's dashboard (React).

-----

## 🏗 System Architecture

The project follows a **Microservices-style architecture** containerized with Docker.

[Image of Microservices Architecture Diagram]

1.  **The Vault (PostgreSQL):** Stores normalized data for Branches, Customers, Accounts, and Loans.
2.  **The Brain (C++ Engine):** A background service that:
      * Connects to the system via Shared Volumes.
      * Uses **OOPS (Polymorphism)** to handle different Loan types.
      * Performs O(N) scans to detect NPAs and generates a Risk Report (`CSV`).
3.  **The Traffic Controller (Node.js API):** Reads the Risk Report, parses it, and syncs alerts to the database.
4.  **The Face (React Dashboard):** A "Deutsche Bank" style minimalist interface for bankers to monitor risk.

-----

## 🌟 Key Features

### 1\. C++ Core Risk Engine

  * **Object-Oriented Design:** Implements Factory Pattern for Loan creation and Polymorphism for Interest calculation strategies.
  * **Batch Processing:** Simulates end-of-day banking operations.
  * **Memory Management:** Efficient resource handling for processing large datasets.

### 2\. Advanced SQL & Database Design

  * **Normalization:** 3NF Schema design handling `1:N` relationships (Branch -\> Loans) and `M:N` (Customers -\> Accounts).
  * **Complex Queries:** Logic for Liquidity Ratios derived from aggregated Assets (Loans) vs. Liabilities (Deposits).

### 3\. Full-Stack Dashboard

  * **React + TypeScript:** Type-safe, component-based UI.
  * **Real-time Sync:** API endpoints to ingest C++ engine outputs on-demand.
  * **Visualization:** Data tables for Customer 360 view and Branch performance.

-----

## 🛠 Tech Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Backend Logic** | **C++ 17** | Core Risk Algorithms, Interest Engine |
| **API Server** | **Node.js, Express** | REST API, File I/O, Data Sync |
| **Database** | **PostgreSQL** | Relational Data Storage |
| **ORM** | **Prisma** | Schema Management & Type-safe Queries |
| **Frontend** | **React, Vite, TypeScript** | User Interface |
| **Infrastructure** | **Docker, Docker Compose** | Containerization & Orchestration |

-----

## 📋 Prerequisites

  * **Docker Desktop** (Required for containerization)
  * **Git**

-----

## 🚀 Installation & Quick Start

The entire application (Database, Backend, Frontend, C++ Engine) runs with a **single command**.

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/banking-risk-engine.git
    cd banking-risk-engine
    ```

2.  **Start the Application**

    ```bash
    docker compose up --build
    ```

    *Wait for about 2-3 minutes for the initial build (C++ compilation + npm install).*

3.  **Access the Application**

      * **Frontend:** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)
      * **Backend API:** [http://localhost:4000](https://www.google.com/search?q=http://localhost:4000)

-----

## 🎮 How to Run the Demo (The "NPA" Workflow)

Since the database starts empty, follow these steps to simulate the full "Risk Detection" lifecycle:

### 1\. Seed the Data

The repository includes `csv` files in the `data/` folder. Run these commands to populate the database:

```bash
# Copy mock data into the database container
docker cp data/branches.csv banking_db:/tmp/branches.csv
docker cp data/customers.csv banking_db:/tmp/customers.csv
docker cp data/accounts.csv banking_db:/tmp/accounts.csv
docker cp data/loans.csv banking_db:/tmp/loans.csv

# Import the data
docker exec -i banking_db psql -U admin -d banking_db <<EOF
\COPY branches(id, name, city) FROM '/tmp/branches.csv' DELIMITER ',' CSV HEADER;
\COPY customers(id, "firstName", "lastName", dob) FROM '/tmp/customers.csv' DELIMITER ',' CSV HEADER;
\COPY accounts(id, "branchId", "customerId", type, balance) FROM '/tmp/accounts.csv' DELIMITER ',' CSV HEADER;
\COPY loans(id, "branchId", "customerId", "loanType", principal, "interestRate", "startDate", "termMonths", status) FROM '/tmp/loans.csv' DELIMITER ',' CSV HEADER;
EOF
```

### 2\. Generate Payment History

Run this SQL script (via your DB tool or CLI) to simulate missed payments for "NPA" marked loans:

```sql
docker exec -i banking_db psql -U admin -d banking_db <<EOF
INSERT INTO payments ("loanId", "dueDate", "amount", "paid", "paidDate")
SELECT id, CURRENT_DATE - INTERVAL '1 month', (principal * 0.01), false, NULL FROM loans WHERE status = 'NPA';
-- (Repeat for 2 and 3 months to simulate 90-day default)
EOF
```

### 3\. Run the C++ Risk Engine

The engine runs automatically, but you can force a scan:

```bash
docker restart banking_cpp_engine
```

*Watch the logs to see it detect the NPAs and write to `risk_alerts.csv`.*

### 4\. Sync & Visualize

Sync the findings to the dashboard:

```bash
curl -X POST http://localhost:4000/api/risk/sync
```

**Refresh your Dashboard.** You will now see Red Alert cards for the bad loans\!

-----

## 🗄 Database Schema

  * **Customer** `(1:N)` **Account**
  * **Customer** `(1:N)` **Loan**
  * **Branch** `(1:N)` **Account**
  * **Loan** `(1:N)` **Payment** (Tracks EMI history)
  * **RiskAlerts** (Stores anomalies detected by C++)

  Here is the Entity-Relationship (ER) Diagram of the Banking Risk & Compliance Automation Engine.
  * <img width="1037" height="618" alt="Image" src="https://github.com/user-attachments/assets/c394824d-82dc-4cc0-bb1a-e6e4cf877a67" />


-----

## 📂 Folder Structure

```text
banking-risk-engine/
├── cpp_engine/             # C++ Source Code
│   ├── src/                # Implementation (HomeLoan.cpp, RiskEngine.cpp)
│   ├── include/            # Headers (OOPS Definitions)
│   └── CMakeLists.txt      # Build Configuration
├── backend/                # Node.js API
│   ├── prisma/             # Database Schema
│   └── src/routes/         # API Endpoints
├── frontend/               # React Dashboard
│   ├── src/pages/          # UI Views (Deutsche Bank Style)
│   └── src/components/     # Reusable UI Cards/Tables
├── database/               # SQL Seeds & Migrations
├── docker-compose.yml      # Orchestration
└── Dockerfile.* # Container definitions
```

-----

