import React, { useState, useEffect } from 'react';
import VolumeSlider from './VolumeSlider.jsx';
import { MdClose } from 'react-icons/md';

const PresetModal = ({ isOpen, onClose, onSave, presetToEdit, allZones }) => {
  // Estado interno del formulario
  const [title, setTitle] = useState('');
  const [volume, setVolume] = useState(60);
  const [selectedZones, setSelectedZones] = useState([]);

  // useEffect se ejecuta cuando el modal se abre o 'presetToEdit' cambia
  useEffect(() => {
    if (presetToEdit) {
      // --- Modo Edición: Rellena el formulario ---
      setTitle(presetToEdit.title);
      setVolume(presetToEdit.volume);
      // 'all' es un caso especial
      setSelectedZones(presetToEdit.zones[0] === 'all' ? allZones.map(z => z.id) : presetToEdit.zones);
    } else {
      // --- Modo Creación: Resetea el formulario ---
      setTitle('');
      setVolume(60);
      setSelectedZones([]);
    }
  }, [presetToEdit, isOpen, allZones]); // Depende de estas props

  const handleZoneToggle = (zoneId) => {
    setSelectedZones(currentZones =>
      currentZones.includes(zoneId)
        ? currentZones.filter(id => id !== zoneId) // Quitar zona
        : [...currentZones, zoneId] // Añadir zona
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || selectedZones.length === 0) {
      // Simple validación
      alert('Por favor, pon un nombre y selecciona al menos una zona.');
      return;
    }
    // Llama a la función onSave de App.jsx con los datos
    onSave({ title, volume, zones: selectedZones });
  };

  // Evita renderizar si no está abierto (aunque App.jsx ya lo controla)
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h2>{presetToEdit ? 'Editar Preset' : 'Crear Nuevo Preset'}</h2>
            <button type="button" className="btn-icon" onClick={onClose}>
              <MdClose />
            </button>
          </div>
          
          <div className="modal-body">
            {/*  Nombre del Preset  */}
            <div className="form-group">
              <label htmlFor="preset-name">Nombre del Preset</label>
              <input
                type="text"
                id="preset-name"
                placeholder="Ej: Fiesta, Relax, Cena..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/*Seleccionar Zonas*/}
            <div className="form-group">
              <label>Seleccionar Zonas</label>
              <div className="zone-checklist">
                {allZones.map(zone => {
                  const Icon = zone.icon;
                  return (
                    <label key={zone.id} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={selectedZones.includes(zone.id)}
                        onChange={() => handleZoneToggle(zone.id)}
                      />
                      <span className="checkbox-custom"></span>
                      <Icon />
                      {zone.name}
                    </label>
                  );
                })}
              </div>
              <small>Selecciona al menos una zona</small>
            </div>

            {/* Volumen */}
            <div className="form-group">
              <div className="label-with-value">
                <label>Volumen</label>
                <span>{volume}%</span>
              </div>
              <VolumeSlider
                value={volume}
                
                onChange={(newValue) => setVolume(parseInt(newValue))}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {presetToEdit ? 'Guardar Cambios' : 'Crear Preset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PresetModal;