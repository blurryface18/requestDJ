
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DJDashboard from './pages/DJDashboard';
import RequestForm from './pages/RequestForm'; 
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dj/:djId" element={<DJDashboard />} />
          <Route path="/request/:djId" element={<RequestForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
