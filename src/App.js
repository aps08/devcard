import { Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/header/Header';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Notfound from './pages/notfound/Notfound';
import About from './pages/about/About';
import Demo from './pages/demo/Demo';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="container">
      <Header />
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/About" element={<About />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
