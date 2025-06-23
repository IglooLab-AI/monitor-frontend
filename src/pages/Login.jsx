import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLoginSuccess }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3001/login', {
        username: usuario,
        password: password,
      });

      if (res.data && res.data.success) {
        setMensaje('✅ Inicio de sesión exitoso');
        localStorage.setItem('usuario', usuario);
        onLoginSuccess(usuario); // ← Aquí activamos el dashboard
      } else {
        setMensaje('❌ Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMensaje('❌ Error de conexión con el servidor');
    }
  };

  return (
    <div className="max-w-md mx-auto my-6 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ingresar
        </button>
        {mensaje && <p className="text-center text-sm">{mensaje}</p>}
      </form>
    </div>
  );
}

export default Login;
