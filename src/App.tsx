// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Product from './pages/Product';
import { useAuth } from './utils/AuthContext';
import LoginPage from './pages/Login';
import './App.css';

import Layout from './components/ui_library/layout';
import PriceManager from './pages/PriceManager';
import ProjectGenerator from './pages/ProjectGenerator';
const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <div className="">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projectgenerator/:projectId?" element={<ProjectGenerator />} />
              <Route path="/product" element={<Product />} />
              <Route path="/price" element={<PriceManager />} />
            </Route>
          </Routes>
        </div>
      )}
    </Router>
  );
};

export default App;
