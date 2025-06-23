import React from 'react';
import Dashboard from '../components/Dashboard';

const Home = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        📊 Dashboard de Actividad
      </h1>
      <Dashboard />
    </div>
  );
};

export default Home;
