// src/pages/LoginPage.tsx

import React, { useState } from 'react';
import { Modal } from '../components/Modal'; 
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  

    const [isModalOpen, setIsModalOpen] = useState(false);
    // Usamos el estado glaval para saber si el usuario esta logueado
    const { isAuthenticated, user, logout } = useAuth(); 

    return (
      
        <div className="login-page-container"> 
            {isAuthenticated ? (
                //  Si está autenticado, muestra el mensaje de bienvenida
                <div className="welcome-message login-card">
                    <h1 className="login-title">Bienvenido, {user?.username}</h1>
                    <button onClick={logout} className="login-button">Cerrar Sesión</button>
                </div>
            ) : (
                //  Si NO está autenticado, muestra el botón para abrir el modal
                <div className="login-card">
                     <h1 className="login-title">Acceso al Sistema</h1>
                     <button onClick={() => setIsModalOpen(true)} className="login-button">
                        Abrir Login
                    </button>
                </div>
            )}
    
            <Modal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Iniciar Sesión"
            >
                <LoginForm />
            </Modal>
        </div>
    );
};
