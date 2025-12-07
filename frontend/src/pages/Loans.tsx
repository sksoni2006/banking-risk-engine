import { useEffect, useState } from "react";
import { api } from "../api/api";

interface Loan {
  id: number;
  loanType: string;
  principal: number;
  status: string;
}

export default function Loans() {
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    api.get("/loans").then((res) => setLoans(res.data));
  }, []);

  return (
    <div className="container">
      <div className="page-header" style={{ marginBottom: "24px" }}>
        <h2>Loan Portfolio</h2>
        <p style={{ color: "var(--text-sub)" }}>Asset management and credit monitoring</p>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Product Type</th>
              <th>Principal Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((l) => (
              <tr key={l.id}>
                <td style={{ fontFamily: "monospace" }}>LN-{l.id}</td>
                <td>{l.loanType} LOAN</td>
                <td style={{ fontWeight: 600 }}>₹ {Number(l.principal).toLocaleString('en-IN')}</td>
                <td>
                  <span style={{ 
                    color: l.status === 'ACTIVE' ? 'var(--success)' : 'var(--danger)',
                    fontWeight: 600,
                    fontSize: "12px"
                  }}>
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}