import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

const UserModal = ({ isOpen, onClose, onSave, zoneName }) => {
  const [userName, setUserName] = useState('');
  const [duration, setDuration] = useState(60);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName.trim()) return;

    // Se obtiene la hora actual (Entrada)
    const now = new Date();
    const entryTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Calcula la hora de salida (Sumamos la duración en milisegundos)
    // (duration * 60000 convierte minutos a milisegundos)
    const exitDate = new Date(now.getTime() + duration * 60000);
    const exitTime = `${exitDate.getHours().toString().padStart(2, '0')}:${exitDate.getMinutes().toString().padStart(2, '0')}`;

    // Guarda todo, incluyendo la nueva 'exitTime'
    onSave({
      name: userName,
      duration: duration,
      entryTime: entryTime,
      exitTime: exitTime, // <-- Dato de salida
      exitTimestamp: exitDate.getTime(),
      accessCode: Math.floor(1000 + Math.random() * 9000).toString()
    });
    
    setUserName('');
    setDuration(60);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Asignar Usuario a {zoneName}</h2>
          <button className="btn-icon" onClick={onClose}><MdClose /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Nombre del Usuario / Cliente</label>
              <input
                type="text"
                placeholder="Ej: Rodrigo, Familia Pérez..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label>Tiempo de Sesión (Minutos)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min="1"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-primary">Asignar Sala</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;