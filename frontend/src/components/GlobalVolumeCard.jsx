import React from 'react';
import VolumeSlider from './VolumeSlider.jsx';
import { MdGraphicEq } from 'react-icons/md';

const GlobalVolumeCard = ({
  globalVolume,
  activeZones,
  onGlobalVolumeChange,
}) => {
  return (
    <div className="card global-volume-card">
      <div className="global-volume-header">
        <h1>Volumen Global</h1>
        <p>Controla el volumen general de todas las zonas</p>
      </div>

      <div className="global-volume-control">
        <MdGraphicEq />
        <div className="slider-container">
          <VolumeSlider
            value={globalVolume}
            onChange={onGlobalVolumeChange}
          />
        </div>
        <span className="volume-display">{globalVolume}%</span>
      </div>

      <div className="active-zones-list">
        <h3>Zonas Activas</h3>
        {activeZones.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>Ninguna zona activa.</p>
        ) : (
          activeZones.map((zone) => {
            const Icon = zone.icon;
            return (
              <div key={zone.id} className="active-zone-item">
                <span className="active-zone-item-name">
                  <Icon /> {zone.name}
                </span>
                <span className="active-zone-item-volume">{zone.volume}%</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GlobalVolumeCard;