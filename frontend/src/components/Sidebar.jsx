import React from 'react';
import { MdGraphicEq, MdTune, MdStarOutline } from 'react-icons/md';

// Recibe 'currentView' y 'onNavigate' desde App.jsx
const Sidebar = ({ zones, currentView, onNavigate }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        SoundZone
        <span>Control de Audio</span>
      </div>

      <nav>
        <h3>Navegación</h3>
        <ul className="sidebar-nav">
          <li
            className={currentView === 'global' ? 'active' : ''}
            onClick={() => onNavigate('global')}
          >
            <MdGraphicEq /> Volumen Global
          </li>
          <li
            className={currentView === 'maestro' ? 'active' : ''}
            onClick={() => onNavigate('maestro')}
          >
            <MdTune /> Control Maestro
          </li>
          <li
            className={currentView === 'presets' ? 'active' : ''}
            onClick={() => onNavigate('presets')}
          >
            <MdStarOutline /> Presets
          </li>
        </ul>

        <h3>Escenarios</h3>
        <ul className="sidebar-scenarios">
          {/* AQUÍ ESTÁ LA LÓGICA RESTAURADA:
            Mapea las zonas y renderiza el Icono y el status-dot
          */}
          {zones.map((zone) => {
            const Icon = zone.icon; // <-- El Icono
            return (
              <li key={zone.id}>
                <span>
                  {/* ¡Restauramos el Icono! */}
                  <Icon style={{ marginRight: '0.75rem' }} /> {zone.name}
                </span>
                
                {/* ¡Restauramos el punto de estado! */}
                <span
                  className={`status-dot ${zone.isActive ? 'active' : ''}`}
                ></span>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;