// src/components/Modal.tsx

import React from 'react';
import type { ReactNode } from 'react'; // Importación correcta de tipo

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  // Detiene la propagación del evento para que el clic dentro del modal no lo cierre.
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children} {/* Aquí se inyecta el LoginForm */} 
        </div>
      </div>
    </div>
  );
};