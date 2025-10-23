import React, { useState } from "react";
import axios from "axios";
import { ENDPOINTS } from "../config/api"; 
import { useAuth } from "../context/AuthContext"; 


   export const LoginForm = () => { 
  const { setAuth } = useAuth(); // Función para guardar el token
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // 💡 Petición con Axios al Endpoint Centralizado
      const response = await axios.post(ENDPOINTS.LOGIN, {
        username, 
        password, 
      });

      //  Nota: Asegurense los del back q  responda con 'token' y 'user'  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!
      const { token, user } = response.data; 
      
      if (token && user) {
    
        setAuth(token, user); 
        alert("Inicio de sesión exitoso! Bienvenido: " + user.username);
       
      } else {
         setError("Respuesta de API incompleta.");
      }
      
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Credenciales incorrectas o servidor no disponible.");
      } else {
        setError("Error de conexión con el servidor.");
      }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {/* Requisito: Campos fijos para Nombre de Usuario y Contraseña */}
      <div className="form-group">
        <label htmlFor="username">Usuario</label> 
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa tu usuario"
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña</label> 
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          required
          className="form-input"
        />
      </div>
      
      {error && <p className="form-error">{error}</p>}

      <button
        type="submit"
        className="login-button"
        disabled={isLoading}
      >
        {isLoading ? 'Conectando...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
};
