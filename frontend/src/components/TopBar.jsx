import React from 'react';
import { MdOutlineNotes } from 'react-icons/md'; // Icono de menu/toggle

const TopBar = ({ globalVolume, activeZonesCount }) => {
  return (
    <header className="top-bar">
      <div>
        
        <strong>SoundZone</strong>
      </div>
      <div className="top-bar-status">
        <span>
          Global: <strong>{globalVolume}%</strong>
        </span>
        <span>
          <strong>{activeZonesCount}</strong> zonas activas
        </span>
      </div>
    </header>
  );
};

export default TopBar;