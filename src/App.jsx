import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import GraficaActividades from './components/GraficaActividades';
import { FaBroom } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ConfirmModal from './components/ConfirmModal';

function App() {
  const [actividades, setActividades] = useState([]);
  const [filtroEquipo, setFiltroEquipo] = useState(localStorage.getItem('filtroEquipo') || '');
  const [fechaInicio, setFechaInicio] = useState(localStorage.getItem('fechaInicio') || '');
  const [fechaFin, setFechaFin] = useState(localStorage.getItem('fechaFin') || '');
  const [usuarioLogueado, setUsuarioLogueado] = useState(localStorage.getItem('usuario') || '');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [accionExportar, setAccionExportar] = useState('');

  const actividadesFiltradas = actividades.filter((act) => {
    const fecha = new Date(act.timestamp);
    const enRango =
      (!fechaInicio || fecha >= new Date(fechaInicio)) &&
      (!fechaFin || fecha <= new Date(fechaFin));
    const coincideEquipo = filtroEquipo === '' || act.nombre_equipo?.includes(filtroEquipo);
    return enRango && coincideEquipo;
  });

  const confirmarExportar = (tipo) => {
    setAccionExportar(tipo);
    setMostrarModal(true);
  };

  const ejecutarExportacion = () => {
    if (accionExportar === 'excel') exportarExcel();
    if (accionExportar === 'pdf') exportarPDF();
    setMostrarModal(false);
  };

  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(actividadesFiltradas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Actividades');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'reporte_actividades.xlsx');
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Actividades', 14, 16);
    doc.autoTable({
      head: [['Equipo', 'IP', 'Evento', 'Descripción', 'Fecha']],
      body: actividadesFiltradas.map((a) => [
        a.nombre_equipo,
        a.ip_equipo,
        a.evento,
        a.descripcion,
        new Date(a.timestamp).toLocaleString()
      ]),
      startY: 20
    });
    doc.save('reporte_actividades.pdf');
  };

  useEffect(() => {
    if (usuarioLogueado) {
      fetch('http://localhost:3001/actividades')
        .then((res) => res.json())
        .then((data) => setActividades(data))
        .catch((err) => console.error('Error al cargar actividades', err));
    }
  }, [usuarioLogueado]);

  useEffect(() => {
    localStorage.setItem('filtroEquipo', filtroEquipo);
    localStorage.setItem('fechaInicio', fechaInicio);
    localStorage.setItem('fechaFin', fechaFin);
  }, [filtroEquipo, fechaInicio, fechaFin]);

  if (!usuarioLogueado) {
    return <Login onLoginSuccess={(usuario) => setUsuarioLogueado(usuario)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-6xl w-full">
        <GraficaActividades actividades={actividadesFiltradas} />

        <div className="bg-white p-8 rounded shadow mt-10">
          <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">
            📊 Actividad Reciente
          </h1>

          {/* Filtros */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
            <input
              type="text"
              placeholder="Filtrar por equipo"
              value={filtroEquipo}
              onChange={(e) => setFiltroEquipo(e.target.value)}
              className="border border-gray-300 p-2 rounded w-60"
            />
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"
              onClick={() => {
                setFiltroEquipo('');
                setFechaInicio('');
                setFechaFin('');
              }}
            >
              <FaBroom />
              Limpiar filtros
            </button>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-gray-300 divide-y divide-gray-300 text-sm text-left bg-gray-50 rounded-md shadow-sm">
              <thead className="bg-blue-100 text-gray-800 text-base font-semibold">
                <tr>
                  <th className="px-6 py-3 border border-gray-300">Equipo</th>
                  <th className="px-6 py-3 border border-gray-300">IP</th>
                  <th className="px-6 py-3 border border-gray-300">Evento</th>
                  <th className="px-6 py-3 border border-gray-300">Descripción</th>
                  <th className="px-6 py-3 border border-gray-300">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {actividadesFiltradas.length > 0 ? (
                  actividadesFiltradas.map((a, i) => (
                    <tr key={i} className="bg-white hover:bg-gray-50">
                      <td className="px-6 py-3 border border-gray-300">{a.nombre_equipo}</td>
                      <td className="px-6 py-3 border border-gray-300">{a.ip_equipo}</td>
                      <td className="px-6 py-3 border border-gray-300">{a.evento}</td>
                      <td className="px-6 py-3 border border-gray-300">{a.descripcion}</td>
                      <td className="px-6 py-3 border border-gray-300">
                        {new Date(a.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      No hay datos disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Botones */}
          <div className="flex justify-center mt-6 gap-6">
            <button
              onClick={() => confirmarExportar('excel')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
            >
              📥 Exportar a Excel
            </button>
            <button
              onClick={() => confirmarExportar('pdf')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow"
            >
              🧾 Exportar a PDF
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Confirmación */}
      {mostrarModal && (
        <ConfirmModal
          mensaje={`¿Estás seguro de que deseas exportar a ${accionExportar.toUpperCase()}?`}
          onConfirmar={ejecutarExportacion}
          onCancelar={() => setMostrarModal(false)}
        />
      )}
    </div>
  );
}

export default App;
