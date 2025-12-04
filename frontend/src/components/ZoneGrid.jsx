import React from 'react';
import ZoneCard from './ZoneCard.jsx';

const ZoneGrid = ({ zones, onZoneVolumeChange, onZoneToggle, onAssignUser, onRemoveUser, onEqChange }) => {
  return (
    <div className="zone-grid">
      {zones.map((zone) => (
        <ZoneCard
          key={zone.id}
          zone={zone}
          onVolumeChange={onZoneVolumeChange}
          onToggle={onZoneToggle}
          onAssignUser={onAssignUser}
          onRemoveUser={onRemoveUser}
          onEqChange={onEqChange}
          
        />
      ))}
    </div>
  );
};

export default ZoneGrid;