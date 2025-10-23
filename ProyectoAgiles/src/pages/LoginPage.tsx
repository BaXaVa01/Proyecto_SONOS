import React from 'react'; // Ya no se necesita useState
import { Modal } from '../components/Modal'; 
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
    // Desestructuramos las funciones del contexto de autenticación
    const { isAuthenticated, user, logout } = useAuth(); 

    // La lógica principal: el Modal SÓLO está abierto si el usuario NO está autenticado.
    const isModalOpen = !isAuthenticated;

    return (
        <div className="login-page-container"> 
            {isAuthenticated ? (
                // Si está autenticado, muestra el mensaje de bienvenida.
                <div className="welcome-message login-card">
                    <h1 className="modal-title">¡Bienvenido, {user?.username}!</h1>
                    <p style={{ color: 'var(--color-text-light)', opacity: 0.8 }}>
                        Has iniciado sesión con éxito. Esperando la siguiente página...
                    </p>
                </div>
            ) : (
                // Si NO está autenticado, dejamos un espacio vacío, ya que el Modal se superpondrá
                <div style={{ minHeight: '100px' }} /> 
            )}
    
            {/* 💡 El Modal se abre automáticamente si !isAuthenticated es true */}
            <Modal 
                isOpen={isModalOpen}
                // onClose no hace nada, ya que el login es obligatorio
                onClose={() => { /* El login es obligatorio, no se permite cerrar */ }}
                title="Iniciar Sesión"
                // No se pasa showCloseButton, por lo tanto, no se muestra la 'X'
            >
                <LoginForm />
            </Modal>
        </div>
    );
};
