import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Branches from './pages/Branches';
import Customers from './pages/Customers';
import Accounts from './pages/Accounts';
import Loans from './pages/Loans';
import RiskMonitor from './pages/RiskMonitor';
import './styles/theme.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/risk" element={<RiskMonitor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;