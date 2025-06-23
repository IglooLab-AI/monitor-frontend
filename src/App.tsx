export default function App() {
  return (
    <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg text-center mt-10">
      <h1 className="text-3xl font-bold">✅ TailwindCSS está funcionando</h1>
      <p className="mt-2">Si ves este texto con fondo verde y letras blancas, ¡todo está bien!</p>
    </div>
  );
}
import React from 'react';
import Home from './pages/Home';

const App = () => {
  return <Home />;
};

export default App;
