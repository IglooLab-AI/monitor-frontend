import React from 'react';

const ConfirmModal = ({ mensaje, onConfirmar, onCancelar }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <p className="mb-4 text-gray-800 text-center">{mensaje}</p>
        <div className="flex justify-center gap-4">
          <button onClick={onConfirmar} className="bg-blue-600 text-white px-4 py-2 rounded">
            Confirmar
          </button>
          <button onClick={onCancelar} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
