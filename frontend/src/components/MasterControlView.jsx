import React from 'react';
import VolumeSlider from './VolumeSlider.jsx'; // Reutiliza el componente VolumeSlider
import { MdTune } from 'react-icons/md';

const MasterControlView = ({ volumeL,
  volumeR,
  onVolumeLChange,
  onVolumeRChange,
  connectionStatus }) => {

    // Lógica para el texto y el color del estado
    const getStatusInfo = () => {
      switch (connectionStatus) {
        case 'conectado':
          return { text: 'Endpoint Conectado', className: 'active' };
        case 'conectando':
          return { text: 'Conectando...', className: 'connecting' };
        default:
          return { text: 'Endpoint Desconectado', className: 'disconnected' };
      }
    };
    
    const statusInfo = getStatusInfo();
  
    return (
      <main className="main-content">
        <div className="master-header">
          <h1>Control Maestro</h1>
          <p>Ajuste fino de volumen L y R para el sistema de streaming.</p>
        </div>
  
        <div className="card master-control-card">
          <div className="control-section">
            <div className="control-header">
              <MdTune size={24} />
              <h2>Volumen L y R</h2>
            </div>
            <p className="control-description">Ajusta el balance de los canales de audio.</p>
  
            <div className="master-sliders-container">
              {/* Slider de Volumen L (Izquierda) */}
              <div className="master-slider">
                <label>Volumen L: {volumeL}%</label>
                <VolumeSlider
                  value={volumeL}
                  onChange={onVolumeLChange}
                />
              </div>
              
              {/* Slider de Volumen R (Derecha) */}
              <div className="master-slider">
                <label>Volumen R: {volumeR}%</label>
                <VolumeSlider
                  value={volumeR}
                  onChange={onVolumeRChange}
                />
              </div>
            </div>
          </div>
          
          <hr className="divider" />
          
          {/* Sección de Conexión al Backend */}
          <div className="backend-info-section">
            <h3>Conexión WebRTC (Spring Boot / Node.js)</h3>
            <p>
              Esta funcionalidad requiere conexión al endpoint de Spring Boot, el cual actúa como "pipe" o intermediario para la comunicación WebRTC con Node.js.
            </p>
            
            
            <div className="connection-status">
              <span className={`status-dot ${statusInfo.className}`}></span> 
              <span className="status-text">{statusInfo.text}</span>
            </div>
          </div>
          
        </div>
      </main>
    );
};

export default MasterControlView;