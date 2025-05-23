
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DJDashboard from './pages/DJDashboard';
import RequestForm from './pages/RequestForm'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dj/:djId" element={<DJDashboard />} />
        <Route path="/request/:djId" element={<RequestForm />} />
      </Routes>
    </Router>
  );
}

export default App;
