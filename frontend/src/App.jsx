// --- Imports ---
import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import TopBar from './components/TopBar.jsx';
import GlobalVolumeView from './components/GlobalVolumeView.jsx';
import PresetsView from './components/PresetsView.jsx';
import MasterControlView from './components/MasterControlView.jsx';
import PresetModal from './components/PresetModal.jsx';
import { PRESETS_DATA } from './data/presets.js';
import { useBackendSync } from './hooks/useBackendSync.js';
import {
  MdLiving, MdMusicNote, MdChair, MdDeck, MdKingBed, MdStar,
  MdPartyMode, MdSelfImprovement, MdRestaurant, MdSelectAll // Importa iconos de presets
} from 'react-icons/md';
import { FaKitchenSet } from 'react-icons/fa6';
import UserModal from './components/UserModal.jsx';

//  LISTA MAESTRA DE ZONAS  
const INITIAL_ZONES = [

  { id: 'R1', name: 'R1', icon: MdLiving, volume: 65, isActive: true, eq: { bajos: 0, medios: 0, agudos: 0 } },
  { id: 'R2', name: 'R2', icon: FaKitchenSet, volume: 45, isActive: true, eq: { bajos: 0, medios: 0, agudos: 0 } },
  { id: 'R3', name: 'R3', icon: MdMusicNote, volume: 80, isActive: false, eq: { bajos: 0, medios: 0, agudos: 0 } },
  { id: 'R4', name: 'R4', icon: MdChair, volume: 50, isActive: false, eq: { bajos: 0, medios: 0, agudos: 0 } },
  { id: 'R5', name: 'R5', icon: MdDeck, volume: 70, isActive: false, eq: { bajos: 0, medios: 0, agudos: 0 } },
  { id: 'R6', name: 'R6', icon: MdKingBed, volume: 30, isActive: false, eq: { bajos: 0, medios: 0, agudos: 0 } },
];


// Esto ayuda a re-asignar iconos al cargar desde localStorage
// Usa los iconos de data/presets.js
const DEFAULT_PRESET_ICON_MAP = {
  fiesta: MdPartyMode,
  relax: MdSelfImprovement,
  cena: MdRestaurant,
  todo_activo: MdSelectAll,
};
const NEW_PRESET_DEFAULT_ICON = MdStar; // Icono para presets creados por el usuario

//  FUNCIÓN DE CARGA ROBUSTA 
const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null || storedValue === undefined) {
      return defaultValue;
    }
    const parsedValue = JSON.parse(storedValue);
    return parsedValue === null ? defaultValue : parsedValue;
  } catch (error) {
    console.warn(`Error al leer “${key}” de localStorage:`, error);
    return defaultValue;
  }
};

//  FUNCIÓN DE HIDRATACIÓN DE ZONAS 
const loadAndHydrateZones = () => {
  const savedZonesData = loadFromLocalStorage('soundzone_zones_data', null);
  const baseData = savedZonesData || INITIAL_ZONES;

  return INITIAL_ZONES.map(masterZone => {
    const savedData = baseData.find(z => z.id === masterZone.id);
    
    // Default EQ por si no existe en lo guardado
    const defaultEq = { bajos: 0, medios: 0, agudos: 0 };
    const savedEq = savedData?.eq || defaultEq;

    return {
      ...masterZone,
      volume: savedData ? savedData.volume : masterZone.volume,
      isActive: savedData ? savedData.isActive : masterZone.isActive,
      assignedUser: savedData ? savedData.assignedUser : null,
      eq: savedEq // <-- Cargamos el EQ o el default
    };
  });
};

//  FUNCIÓN DE HIDRATACIÓN DE PRESETS (¡Arregla PresetCard!) 
const loadAndHydratePresets = () => {
  // Carga los presets guardados (que NO tienen iconos)
  const savedPresetsData = loadFromLocalStorage('soundzone_presets_data', null);
  
  // Decide qué array base usar
  const baseData = savedPresetsData || PRESETS_DATA;

  // "Hidrata" el array con los iconos
  return baseData.map(preset => {
    // Busca el icono en el map default,
    // si no lo encuentra (es un preset nuevo), usa el icono default.
    const icon = DEFAULT_PRESET_ICON_MAP[preset.id] || NEW_PRESET_DEFAULT_ICON;
    return {
      ...preset, // Contiene (id, title, volume, zones)
      icon: icon  // Añade el icono
    };
  });
};


function App() {
  //  Estados Principales
  const [zones, setZones] = useState(loadAndHydrateZones);
  const [presets, setPresets] = useState(loadAndHydratePresets); // <-- Usa la nueva función
  const [globalVolume, setGlobalVolume] = useState(() =>
    loadFromLocalStorage('soundzone_globalVolume', 39)
  );
  const [masterVolumeL, setMasterVolumeL] = useState(() =>
    loadFromLocalStorage('soundzone_masterVolumeL', 50)
  );
  const [masterVolumeR, setMasterVolumeR] = useState(() =>
    loadFromLocalStorage('soundzone_masterVolumeR', 50)
  );
  const [activePresetId, setActivePresetId] = useState(() =>
    loadFromLocalStorage('soundzone_activePresetId', null)
  );


  // Estados de UI 
  const [currentView, setCurrentView] = useState('global');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPreset, setEditingPreset] = useState(null);

  // Hook de Backend 
  const { connectionStatus, sendStateToBackend } = useBackendSync(
    'ws://springboot.endpoint/webrtc-pipe'
  );

  // useMemo 
  const activeZones = useMemo(
    () => zones.filter((zone) => zone.isActive),
    [zones]
  );
  const [isUserModalOpen, setIsUserModalOpen] = useState(false); // nuevo
  const [assigningZoneId, setAssigningZoneId] = useState(null); // nuevo

  const handleZoneEqChange = (zoneId, band, value) => {
    setZones(currentZones =>
      currentZones.map(zone =>
        zone.id === zoneId 
          ? { ...zone, eq: { ...zone.eq, [band]: parseInt(value) } }
          : zone
      )
    );
  };

  // useEffect: CEREBRO DE SINCRONIZACIÓN Y GUARDADO 
  useEffect(() => {
    // 1. Prepara datos para el backend (simulado)
    const fullStateForBackend = {
      zones: zones.map(z => ({
        id: z.id,
        volume: z.volume,
        isActive: z.isActive,
        eq: z.eq
       
      })),
      masterVolume: { L: masterVolumeL, R: masterVolumeR },
      activePresetId: activePresetId
    };
    sendStateToBackend(fullStateForBackend);

    // 2. Prepara datos para localStorage 
    const serializableZones = zones.map(({ icon, name, ...rest }) => rest);
    const serializablePresets = presets.map(({ icon, ...rest }) => rest); 

    // 3. Guarda en localStorage
    try {
      localStorage.setItem('soundzone_zones_data', JSON.stringify(serializableZones));
      localStorage.setItem('soundzone_presets_data', JSON.stringify(serializablePresets)); 
      localStorage.setItem('soundzone_globalVolume', JSON.stringify(globalVolume));
      localStorage.setItem('soundzone_masterVolumeL', JSON.stringify(masterVolumeL));
      localStorage.setItem('soundzone_masterVolumeR', JSON.stringify(masterVolumeR));
      localStorage.setItem('soundzone_activePresetId', JSON.stringify(activePresetId));
    } catch (error) {
      console.warn("Error al guardar en localStorage:", error);
    }
  }, [
      zones,
      globalVolume,
      masterVolumeL,
      masterVolumeR,
      presets,
      activePresetId,
      sendStateToBackend
  ]);
  useEffect(() => {
    // Esta función revisa todas las zonas
    const checkExpirations = () => {
      const now = Date.now(); // Hora actual en milisegundos

      setZones(currentZones => {
        // Verifica si hay cambios para no renderizar innecesariamente
        const hasExpiredUsers = currentZones.some(z => 
          z.assignedUser && z.assignedUser.exitTimestamp && now >= z.assignedUser.exitTimestamp
        );

        if (!hasExpiredUsers) return currentZones; // Si nadie venció, no hace nada

        // Si alguien venció, actualiza
        return currentZones.map(zone => {
          if (zone.assignedUser && zone.assignedUser.exitTimestamp && now >= zone.assignedUser.exitTimestamp) {
            console.log(`[Auto-Logout] Tiempo finalizado para zona: ${zone.name}`);
            // Retorna la zona SIN usuario (Disponible)
            return { ...zone, assignedUser: null };
          }
          return zone;
        });
      });
    };

    // Configurar el intervalo para revisar cada 10 segundos
    const intervalId = setInterval(checkExpirations, 10000);

    // Limpieza al desmontar
    return () => clearInterval(intervalId);
  }, []); // Array vacío = esto corre siempre en segundo plano

  //  Handlers de Volumen 
  const handleZoneVolumeChange = (id, newVolume) => {
    setZones(currentZones =>
      currentZones.map(zone =>
        zone.id === id ? { ...zone, volume: parseInt(newVolume) } : zone
      )
    );
    setActivePresetId(null);
  };

  const handleZoneToggle = (id) => {
    setZones(currentZones =>
      currentZones.map(zone =>
        zone.id === id ? { ...zone, isActive: !zone.isActive } : zone
      )
    );
    setActivePresetId(null);
  };

  const handleGlobalVolumeChange = (newVolume) => {
    setGlobalVolume(parseInt(newVolume));
  };

  const handleMasterVolumeLChange = (newVolume) => {
    setMasterVolumeL(parseInt(newVolume));
    setActivePresetId(null);
  };

  const handleMasterVolumeRChange = (newVolume) => {
    setMasterVolumeR(parseInt(newVolume));
    setActivePresetId(null);
  };

  //  Handlers de Activación de Preset 
  const handleActivatePreset = (preset) => {
    const zonesToActivate =
      preset.zones[0] === 'all' ? zones.map((z) => z.id) : preset.zones;

    setZones((currentZones) =>
      currentZones.map((zone) => {
        if (zonesToActivate.includes(zone.id)) {
          return { ...zone, isActive: true, volume: preset.volume };
        }
        return { ...zone, isActive: false };
      })
    );
    setActivePresetId(preset.id);
  };

  //  Handlers para Gestionar Presets 
  const handleOpenCreateModal = () => {
    setEditingPreset(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (preset) => {
    setEditingPreset(preset);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPreset(null);
  };

  const handleDeletePreset = (presetId) => {
    setPresets(currentPresets =>
      currentPresets.filter(p => p.id !== presetId)
    );
  };

  const handleSavePreset = (presetData) => {
    if (editingPreset) {
      // Lógica de ACTUALIZACIÓN (Editar)
      setPresets(currentPresets =>
        currentPresets.map(p =>
          // Mantiene el icono que ya tenía
          p.id === editingPreset.id ? { ...p, ...presetData } : p
        )
      );
    } else {
      //  Lógica de CREACIÓN 
      const newPreset = {
        id: Date.now().toString(),
        icon: NEW_PRESET_DEFAULT_ICON, // Asigna el icono por defecto
        ...presetData
      };
      setPresets(currentPresets => [...currentPresets, newPreset]);
    }
    handleCloseModal();
  };
  const handleOpenUserModal = (zoneId) => {
    setAssigningZoneId(zoneId);
    setIsUserModalOpen(true);
  };

  const handleUserAssign = (userData) => {
    setZones(currentZones => 
      currentZones.map(zone => {
        if (zone.id === assigningZoneId) {
          return {
            ...zone,
            isActive: true, // Opcional: Activar zona al asignar usuario
            assignedUser: userData // Guardamos el objeto del usuario aquí
          };
        }
        return zone;
      })
    );
    setIsUserModalOpen(false);
    setAssigningZoneId(null);
  };

  const handleRemoveUser = (zoneId) => {
    if (window.confirm('¿Finalizar la sesión de este usuario?')) {
      setZones(currentZones =>
        currentZones.map(zone =>
          zone.id === zoneId ? { ...zone, assignedUser: null } : zone
        )
      );
    }
  };

  //  RETURN 
  return (
    <div className="app-container">
      <Sidebar
        zones={zones}
        currentView={currentView}
        onNavigate={setCurrentView}
      />
      <div className="main-wrapper">
        <TopBar
          globalVolume={globalVolume}
          activeZonesCount={activeZones.length}
          connectionStatus={connectionStatus}
        />

      {/* --- Renderizado Condicional --- */}
        
        {currentView === 'global' && (
          <GlobalVolumeView
            zones={zones}
            activeZones={activeZones}
            globalVolume={globalVolume}
            onZoneVolumeChange={handleZoneVolumeChange}
            onZoneToggle={handleZoneToggle}
            onGlobalVolumeChange={handleGlobalVolumeChange}
           
            onAssignUser={handleOpenUserModal}
            onRemoveUser={handleRemoveUser}
            onEqChange={handleZoneEqChange}
          />
        )}

        {currentView === 'presets' && (
          <PresetsView
            presets={presets}
            allZones={zones}
            onActivatePreset={handleActivatePreset}
            onOpenCreateModal={handleOpenCreateModal}
            onOpenEditModal={handleOpenEditModal}
            onDeletePreset={handleDeletePreset}
          />
        )}

        {currentView === 'maestro' && (
          <MasterControlView
            volumeL={masterVolumeL}
            volumeR={masterVolumeR}
            onVolumeLChange={handleMasterVolumeLChange}
            onVolumeRChange={handleMasterVolumeRChange}
            connectionStatus={connectionStatus}
          />
        )}

        
      </div>

      
      {isModalOpen && (
        <PresetModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSavePreset}
          presetToEdit={editingPreset}
          allZones={zones}
        />
      )}
      {isUserModalOpen && (
        <UserModal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          onSave={handleUserAssign}
          zoneName={zones.find(z => z.id === assigningZoneId)?.name}
        />
      )}



    </div>
  );
}

export default App;