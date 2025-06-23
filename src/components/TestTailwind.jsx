import React from 'react';

const TestTailwind = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-bold text-fuchsia-600 mb-4">✅ Tailwind está funcionando</h1>
        <p className="text-gray-700 text-lg mb-2">
          Si ves colores, bordes redondeados y espaciado...
        </p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
          ¡Todo correcto!
        </button>
      </div>
    </div>
  );
};

export default TestTailwind;
