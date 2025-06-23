import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function GraficaActividades({ actividades }) {
  // Agrupar por hora
  const porHora = actividades.reduce((acc, curr) => {
    const hora = new Date(curr.timestamp).getHours();
    acc[hora] = (acc[hora] || 0) + 1;
    return acc;
  }, {});

  const datosHora = Object.entries(porHora).map(([hora, cantidad]) => ({
    hora: `${hora}:00`,
    cantidad,
  }));

  // Agrupar por equipo
  const porEquipo = actividades.reduce((acc, curr) => {
    const equipo = curr.nombre_equipo || 'Desconocido';
    acc[equipo] = (acc[equipo] || 0) + 1;
    return acc;
  }, {});

  const datosEquipo = Object.entries(porEquipo).map(([nombre_equipo, cantidad]) => ({
    nombre_equipo,
    cantidad,
  }));

  return (
    <div className="bg-white shadow p-6 rounded">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">📊 Actividades por Hora</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={datosHora}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hora" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cantidad" fill="#3182ce" />
        </BarChart>
      </ResponsiveContainer>

      <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-700 text-center">🎯 Actividad por Equipo</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={datosEquipo}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre_equipo" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cantidad" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficaActividades;
