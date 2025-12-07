import { useEffect, useState } from "react";
import { api } from "../api/api";

interface Account {
  id: number;
  type: string;
  balance: number;
  customerId: number;
}

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    api.get("/accounts").then((res) => setAccounts(res.data));
  }, []);

  return (
    <div className="container">
      <div className="page-header" style={{ marginBottom: "24px" }}>
        <h2>Account Overview</h2>
        <p style={{ color: "var(--text-sub)" }}>Liquidity and liability tracking</p>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Account No.</th>
              <th>Type</th>
              <th>Linked Customer</th>
              <th>Balance (INR)</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => (
              <tr key={a.id}>
                <td style={{ fontFamily: "monospace" }}>ACC-{a.id}</td>
                <td>
                  <span style={{ 
                    padding: "4px 8px", 
                    borderRadius: "2px", 
                    background: a.type === 'SAVINGS' ? '#e8f0fe' : '#fff8e1',
                    color: a.type === 'SAVINGS' ? '#1967d2' : '#f57c00',
                    fontSize: "11px", fontWeight: 700 
                  }}>
                    {a.type}
                  </span>
                </td>
                <td>Customer #{a.customerId}</td>
                <td style={{ fontWeight: 600, fontFamily: "monospace", fontSize: "15px" }}>
                  ₹ {Number(a.balance).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}