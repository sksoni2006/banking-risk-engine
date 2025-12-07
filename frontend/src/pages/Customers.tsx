import { useEffect, useState } from "react";
import { api } from "../api/api";
import { User } from "lucide-react";

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    api.get("/customers").then((res) => setCustomers(res.data));
  }, []);

  return (
    <div className="container">
      <div className="page-header" style={{ marginBottom: "24px" }}>
        <h2>Customer Directory</h2>
        <p style={{ color: "var(--text-sub)" }}>Manage client profiles and KYC status</p>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Full Name</th>
              <th>Date of Birth</th>
              <th>KYC Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td style={{ fontFamily: "monospace", color: "var(--text-sub)" }}>CUST-{c.id.toString().padStart(4, '0')}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ background: "#f0f2f5", padding: "6px", borderRadius: "50%" }}>
                      <User size={16} color="var(--primary)" />
                    </div>
                    {c.firstName} {c.lastName}
                  </div>
                </td>
                <td>{new Date(c.dob).toLocaleDateString()}</td>
                <td><span style={{ background: "#e6f4ea", color: "#1e8e3e", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }}>VERIFIED</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}