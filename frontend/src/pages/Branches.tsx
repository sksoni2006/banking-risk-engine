import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Building2, MapPin } from "lucide-react";

interface Branch {
  id: number;
  name: string;
  city: string;
}

export default function Branches() {
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    api.get("/branches").then((res) => setBranches(res.data));
  }, []);

  return (
    <div className="container">
      <div className="page-header" style={{ marginBottom: "24px" }}>
        <h2>Branch Network</h2>
        <p style={{ color: "var(--text-sub)" }}>Operational banking locations</p>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Branch Name</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((b) => (
              <tr key={b.id}>
                <td style={{ fontFamily: "monospace", color: "var(--text-sub)" }}>#{b.id}</td>
                <td style={{ fontWeight: 500 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Building2 size={16} color="var(--primary)" />
                    {b.name}
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-sub)" }}>
                    <MapPin size={14} />
                    {b.city}
                  </div>
                </td>
                <td><span style={{ color: "var(--success)", fontSize: "12px", fontWeight: 600 }}>OPERATIONAL</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}