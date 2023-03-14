import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AuthContext from './store/auth-context';
import './App.css';

const HEADER = lazy(() => import('./components/header/Header'));
const FOOTER = lazy(() => import('./components/footer/Footer'));
const HOME = lazy(() => import('./pages/home/Home'));
const DASHBOARD = lazy(() => import('./pages/dashboard/Dashboard'));
const Notfound = lazy(() => import('./pages/notfound/Notfound'));
const ABOUT = lazy(() => import('./pages/about/About'));
const DEMO = lazy(() => import('./pages/demo/Demo'));

function App() {
  const IsLoggedin = false;
  return (
    <AuthContext.Provider
      value={{
        IsLoggedin: IsLoggedin
      }}>
      <HEADER />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/home" element={<HOME />} />
            {!IsLoggedin && <Route path="/demo" element={<DEMO />} />}
            <Route path="/About" element={<ABOUT />} />
            {IsLoggedin && <Route path="/dashboard" element={<DASHBOARD />} />}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </Suspense>
      </main>
      <FOOTER />
    </AuthContext.Provider>
  );
}

export default App;
