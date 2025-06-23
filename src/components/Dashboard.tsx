import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/actividades')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Error cargando datos', err));
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-2 px-4">Equipo</th>
            <th className="py-2 px-4">IP</th>
            <th className="py-2 px-4">Evento</th>
            <th className="py-2 px-4">Descripción</th>
            <th className="py-2 px-4">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index) => (
            <tr key={index} className="border-t text-sm text-gray-800">
              <td className="py-2 px-4">{item.nombre_equipo}</td>
              <td className="py-2 px-4">{item.ip_equipo}</td>
              <td className="py-2 px-4">{item.evento}</td>
              <td className="py-2 px-4">{item.descripcion}</td>
              <td className="py-2 px-4">{new Date(item.timestamp).toLocaleString()}</td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={5} className="py-4 text-center text-gray-500">
                No hay registros
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
