import '../styles/card.css';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
}

export default function StatCard({ label, value, trend, trendUp }: StatCardProps) {
  return (
    <div className="card">
      <div className="card-label">{label}</div>
      <div className="card-value">{value}</div>
      {trend && (
        <div className={`card-trend ${trendUp ? 'positive' : 'negative'}`}>
          {trend} vs last month
        </div>
      )}
    </div>
  );
}