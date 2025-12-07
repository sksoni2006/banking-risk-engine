import { useEffect, useState } from 'react';
import axios from 'axios';
import { AlertTriangle } from 'lucide-react';

export default function RiskMonitor() {
  const [alerts, setAlerts] = useState<any[]>([]);

  const fetchAlerts = async () => {
    const res = await axios.get('http://localhost:4000/api/risk');
    setAlerts(res.data);
  };

  const syncEngine = async () => {
    await axios.post('http://localhost:4000/api/risk/sync');
    fetchAlerts();
  };

  useEffect(() => { fetchAlerts(); }, []);

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2>Risk Monitor</h2>
          <p style={{ color: 'var(--text-sub)' }}>AI-Detected Anomalies & Rule Violations</p>
        </div>
        <button 
          onClick={syncEngine}
          style={{
            background: 'var(--primary)', color: 'white', border: 'none', 
            padding: '12px 24px', borderRadius: '2px', cursor: 'pointer', fontWeight: 600
          }}
        >
          Run Diagnostic Scan
        </button>
      </div>

      <div className="grid">
        {alerts.map((alert) => (
          <div key={alert.id} className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <AlertTriangle color="var(--danger)" />
              <div>
                <h4 style={{ color: 'var(--danger)', marginBottom: '4px' }}>{alert.alertType}</h4>
                <p style={{ margin: 0, color: 'var(--text-main)' }}>{alert.details}</p>
                <small style={{ color: 'var(--text-sub)', display: 'block', marginTop: '8px' }}>
                  Detected at: {new Date(alert.createdAt).toLocaleString()}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}