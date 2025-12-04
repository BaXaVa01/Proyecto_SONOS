import React, { useState } from 'react';
import VolumeSlider from './VolumeSlider.jsx';
import ToggleSwitch from './ToggleSwitch.jsx';
import { 
  MdPersonAdd, MdPerson, MdClose, MdAccessTime,
  MdSkipPrevious, MdSkipNext, MdPause, MdPlayArrow,
  MdTune, MdKeyboardArrowDown, MdKeyboardArrowUp
} from 'react-icons/md';

const ZoneCard = ({ 
  zone, 
  onVolumeChange, 
  onToggle, 
  
  onAssignUser,
  onRemoveUser,
  onEqChange
}) => {
  const Icon = zone.icon;
  const isOccupied = !!zone.assignedUser;
  
  // Estados locales
  const [isEqOpen, setIsEqOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Valores EQ seguros
  const eq = zone.eq || { bass: 0, mids: 0, treble: 0 };

  const handleResetEq = () => {
    if(onEqChange) {
       onEqChange(zone.id, 'bass', 0);
       onEqChange(zone.id, 'mids', 0);
       onEqChange(zone.id, 'treble', 0);
    }
  };

  return (
    <div className={`card zone-card ${zone.isActive ? 'active' : ''}`}>
      
      {/* 1. CABECERA */}
      <div className="zone-header-top">
        <div className="zone-card-header">
          <span className="zone-card-name"><Icon /> {zone.name}</span>
        </div>
        <span className={`status-badge ${isOccupied ? 'occupied' : 'available'}`}>
          {isOccupied ? 'Ocupado' : 'Disponible'}
        </span>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '-0.5rem', marginBottom: '1rem' }}>
        {zone.isActive ? '' : 'Sin reproducción'}
      </p>

      {/* 2. USUARIO */}
      {isOccupied ? (
        <div className="user-info-card">
          <div className="user-details">
            <MdPerson size={24} style={{ color: '#64748b' }} />
            <div className="user-text">
              <h4>{zone.assignedUser.name}</h4>
              <p className="user-meta">
                <MdAccessTime size={12} /> {zone.assignedUser.entryTime} - {zone.assignedUser.exitTime}
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={() => onRemoveUser(zone.id)}>
            <MdClose />
          </button>
        </div>
      ) : (
        <button className="btn-assign" onClick={() => onAssignUser(zone.id)}>
          <MdPersonAdd /> Asignar Usuario
        </button>
      )}

      {/* 3. FILA DE CONTROLES (VOLUMEN + ESTADO) */}
      <div className="zone-card-controls">
        {/* Columna Izquierda: Volumen */}
        <div className="slider-container">
          <div className="label-with-value">
            <label>V </label>
            <span>{zone.volume}%</span>
          </div>
          <VolumeSlider
            value={zone.volume}
            onChange={(newValue) => onVolumeChange(zone.id, newValue)}
            disabled={!zone.isActive}
          />
        </div>
        
        {/* Columna Derecha: Estado */}
        <div className="toggle-container">
          <label style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom:'0.5rem' }}>Estado</label>
          <ToggleSwitch
            checked={zone.isActive}
            onChange={() => onToggle(zone.id)}
          />
        </div>
      </div>

      {/* 4. CONTROLES MULTIMEDIA (Siempre visibles si la zona está activa, o deshabilitados) */}
      {zone.isActive && (
        <div className="media-controls">
          <button className="btn-media"><MdSkipPrevious size={20} /></button>
          <button 
            className="btn-media primary" 
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <MdPause size={20} /> : <MdPlayArrow size={20} />}
          </button>
          <button className="btn-media"><MdSkipNext size={20} /></button>
        </div>
      )}

      {/* 5. ECUALIZADOR */}
      
      {zone.isActive && (
        <>
          <div 
            // APLICAMOS LA CLASE 'open' CONDICIONALMENTE
            className={`eq-accordion-toggle ${isEqOpen ? 'open' : ''}`} 
            onClick={() => setIsEqOpen(!isEqOpen)}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MdTune /> {isEqOpen ? 'Ocultar Ecualizador' : 'Mostrar Ecualizador'}
            </span>
            {isEqOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </div>

          {isEqOpen && (
            <div className="eq-panel">
              <div className="eq-header">
                <h5>Ecualizador</h5>
                <button className="btn-reset" onClick={handleResetEq}>Resetear</button>
              </div>

              {/* Sliders EQ usando input nativo para mejor control de negativos */}
              {['bass', 'mids', 'treble'].map((band) => (
                <div key={band} className="eq-slider-group">
                  <div className="eq-label">
                    <span style={{textTransform:'capitalize'}}>
                      {band === 'bass' ? 'Graves' : band === 'mids' ? 'Medios' : 'Agudos'}
                    </span>
                    <span>{eq[band]} dB</span>
                  </div>
                  
                  {/* INPUT RANGE NATIVO */}
                  <input
                    type="range"
                    className="eq-range-input"
                    min="-12"
                    max="12"
                    step="1"
                    value={eq[band]}
                    onChange={(e) => onEqChange && onEqChange(zone.id, band, e.target.value)}
                  />
                  
                  {/* Guía visual del centro (0dB) */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: 'gray', marginTop:'4px' }}>
                    <span>-12</span>
                    <span>0</span>
                    <span>+12</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ZoneCard;