import React, { useState } from 'react';
import GlobalVolumeCard from './GlobalVolumeCard.jsx';
import ZoneGrid from './ZoneGrid.jsx';

// Este componente recibe TODAS las props de la vista global
const GlobalVolumeView = ({
  zones,
  activeZones,
  globalVolume,
  onZoneVolumeChange,
  onZoneToggle,
  onGlobalVolumeChange,
  onAssignUser,
  onRemoveUser,
  onEqChange
}) => {
  const [filter, setFilter] = useState('all');
  
  const filteredZones = zones.filter((zone)=>{
    if (filter === 'available') return !zone.assignedUser; // Solo las que NO tienen usuario
    if (filter === 'occupied') return zone.assignedUser;   // Solo las que TIENEN usuario
    return true; // 'all' -> Muestra todas
  })
  return (
    <main className="main-content">
      {/* Pasa las props específicas del VOLUMEN GLOBAL 
        a la tarjeta GlobalVolumeCard
      */}
      <GlobalVolumeCard
        globalVolume={globalVolume}
        activeZones={activeZones}
        onGlobalVolumeChange={onGlobalVolumeChange}
      />
      {/* --- BARRA DE FILTROS --- */}
      <div className="filter-tabs-container">
        <button
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todas
        </button>
        <button
          className={`filter-tab ${filter === 'available' ? 'active' : ''}`}
          onClick={() => setFilter('available')}
        >
          Disponibles
        </button>
        <button
          className={`filter-tab ${filter === 'occupied' ? 'active' : ''}`}
          onClick={() => setFilter('occupied')}
        >
          Ocupadas
        </button>
      </div>
      {/* Pasa las props específicas de las ZONAS
        a la cuadrícula ZoneGrid
      */}
      <ZoneGrid
        zones={filteredZones}
        onZoneVolumeChange={onZoneVolumeChange} 
        onZoneToggle={onZoneToggle}
        onAssignUser={onAssignUser} // <-- Pasar
        onRemoveUser={onRemoveUser} // <-- Pasar
        onEqChange={onEqChange}
      />
    </main>
  );
};

export default GlobalVolumeView;