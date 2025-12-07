import { useEffect, useState } from 'react';
import axios from 'axios';
import StatCard from '../components/StatCard';

export default function Dashboard() {
  const [stats, setStats] = useState({ branches: 0, customers: 0, loans: 0, alerts: 0 });

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const [b, c, l, a] = await Promise.all([
          axios.get('http://localhost:4000/api/branches'),
          axios.get('http://localhost:4000/api/customers'),
          axios.get('http://localhost:4000/api/loans'),
          axios.get('http://localhost:4000/api/risk')
        ]);
        setStats({
          branches: b.data.length,
          customers: c.data.length,
          loans: l.data.length,
          alerts: a.data.length
        });
      } catch (e) { console.error(e); }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="page-header" style={{ marginBottom: '32px' }}>
        <h2>Executive Overview</h2>
        <p style={{ color: 'var(--text-sub)', marginTop: '8px' }}>Real-time banking operations and risk assessment</p>
      </div>

      <div className="grid grid-cols-4">
        <StatCard label="Active Branches" value={stats.branches} />
        <StatCard label="Total Customers" value={stats.customers} trend="+5%" trendUp />
        <StatCard label="Active Loans" value={stats.loans} />
        <StatCard label="Risk Alerts" value={stats.alerts} trend="+2" trendUp={false} />
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3>Recent Activity</h3>
        <div className="table-wrapper" style={{ marginTop: '16px' }}>
          <table>
            <thead>
              <tr>
                <th>Event Type</th>
                <th>Description</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>System Scan</td>
                <td>Nightly batch risk assessment completed</td>
                <td>02:00 AM</td>
                <td><span style={{ color: 'var(--success)' }}>Completed</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}