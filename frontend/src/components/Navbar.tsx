import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Wallet, 
  FileWarning, 
  CreditCard 
} from 'lucide-react';
import '../styles/navbar.css';

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path ? 'nav-item active' : 'nav-item';

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo Section */}
        <div className="logo">
          <div className="logo-square"></div>
          <span>RiskEngine</span>
        </div>
        
        {/* Navigation Links */}
        <nav className="nav">
          <Link to="/" className={isActive('/')}>
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          
          <Link to="/branches" className={isActive('/branches')}>
            <Building2 size={18} />
            Branches
          </Link>
          
          <Link to="/customers" className={isActive('/customers')}>
            <Users size={18} />
            Customers
          </Link>

          <Link to="/accounts" className={isActive('/accounts')}>
            <CreditCard size={18} />
            Accounts
          </Link>
          
          <Link to="/loans" className={isActive('/loans')}>
            <Wallet size={18} />
            Loans
          </Link>
          
          <Link to="/risk" className={isActive('/risk')}>
            <FileWarning size={18} />
            Risk Monitor
          </Link>
        </nav>
      </div>
    </header>
  );
}