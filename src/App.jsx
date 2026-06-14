import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Tracking from './pages/Tracking';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import AirFreight from './pages/AirFreight';
import RoadFreight from './pages/RoadFreight';
import OceanFreight from './pages/OceanFreight';
import Warehouse from './pages/Warehouse';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/air-freight" element={<AirFreight />} />
        <Route path="/road-freight" element={<RoadFreight />} />
        <Route path="/ocean-freight" element={<OceanFreight />} />
        <Route path="/warehouse" element={<Warehouse />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;