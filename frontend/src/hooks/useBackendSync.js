import { useState, useEffect, useRef } from 'react';

// Este es el "pipe" simulado de Spring Boot/WebRTC
export const useBackendSync = (endpointUrl) => {
  // Estado de la conexión
  const [connectionStatus, setConnectionStatus] = useState('conectando');
  
  // Usa useRef para evitar recrear la función de envío en cada render
  const sendStateRef = useRef(() => {});

  // Simula la conexión al montar el componente
  useEffect(() => {
    console.log(`[Backend Sim] Intentando conectar a ${endpointUrl}...`);
    
    // Simula el tiempo de conexión
    const connectTimer = setTimeout(() => {
      console.log("[Backend Sim] ¡Conexión establecida!");
      setConnectionStatus('conectado');
    }, 1500); // Simula 1.5s de handshake

    return () => {
      clearTimeout(connectTimer);
      console.log("[Backend Sim] Conexión cerrada.");
    };
  }, [endpointUrl]); // Solo se ejecuta si la URL cambia

  // Esta es la función que nuestro App.jsx llamará
  // Simula el envío de datos
  sendStateRef.current = (fullState) => {
    if (connectionStatus !== 'conectado') {
      console.warn("[Backend Sim] No se pueden enviar datos. No conectado.");
      return;
    }
    
    
    
    console.log("[Backend Sim] Enviando nuevo estado:", fullState);
  };

  // Devuelve el estado de la conexión y la función de envío
  return { connectionStatus, sendStateToBackend: sendStateRef.current };
};