import React from 'react';
import PresetCard from './PresetCard.jsx';
// Ya no importamos CreatePresetCard
import { MdAdd } from 'react-icons/md'; // Para el nuevo botón

const PresetsView = ({
  presets,
  allZones,
  onActivatePreset,
  onOpenCreateModal, // <-- Nueva prop
  onOpenEditModal,   // <-- Nueva prop
  onDeletePreset,    // <-- Nueva prop
}) => {
  
  const getZoneNameById = (id) => {
    if (id === 'all') return 'Todas las zonas';
    const zone = allZones.find(z => z.id === id);
    return zone ? zone.name : id;
  };

  return (
    <main className="main-content">
      <div className="preset-header">
        <div>
          <h1>Presets</h1>
          <p>Configuraciones predefinidas para diferentes situaciones</p>
        </div>
        {/* ¡NUEVO BOTÓN*/}
        <button className="btn-primary" onClick={onOpenCreateModal}>
          <MdAdd /> Nuevo Preset
        </button>
      </div>
      <div className="preset-grid">
        {presets.map((preset) => (
          <PresetCard
            key={preset.id}
            preset={preset}
            getZoneName={getZoneNameById}
            onActivate={onActivatePreset}
            onEdit={onOpenEditModal}    // <-- Pasa la función
            onDelete={onDeletePreset} // <-- Pasa la función
          />
        ))}
        
      </div>
    </main>
  );
};

export default PresetsView;