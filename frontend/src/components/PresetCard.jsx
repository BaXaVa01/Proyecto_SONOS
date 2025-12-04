import React from 'react';
import { MdPlayArrow, MdEdit, MdDelete } from 'react-icons/md'; // Nuevos iconos

const PresetCard = ({ preset, getZoneName, onActivate, onEdit, onDelete }) => {
  const Icon = preset.icon;

  return (
    <div className="card preset-card">
      <div className="preset-card-header">
        <Icon size={24} className="preset-icon" />
        <h3>{preset.title}</h3>
      </div>
      <p className="preset-volume">Volumen configurado: {preset.volume}%</p>
      
      <div className="preset-zones">
        <p>Zonas incluidas:</p>
        <div className="zone-tags">
          {preset.zones.map((zoneId) => (
            <span key={zoneId} className="zone-tag">
              {getZoneName(zoneId)}
            </span>
          ))}
        </div>
      </div>

      {/* --- ¡SECCIÓN DE BOTONES MODIFICADA! --- */}
      <div className="preset-card-actions">
        <button className="preset-activate-btn" onClick={() => onActivate(preset)}>
          <MdPlayArrow /> Activar
        </button>
        {/* --- ¡NUEVOS BOTONES DE ICONO! --- */}
        <button className="btn-icon" onClick={() => onEdit(preset)}>
          <MdEdit />
        </button>
        <button className="btn-icon btn-icon-delete" onClick={() => onDelete(preset.id)}>
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default PresetCard;