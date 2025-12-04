// Importa los íconos que usarás para los presets
import { MdStar, MdPartyMode, MdSelfImprovement, MdRestaurant, MdSelectAll } from 'react-icons/md';

// Define los IDs de zona que coinciden con tu estado INITIAL_ZONES
const ZONE_IDS = {
  SALON: 'salon',
  COCINA: 'cocina',
  SALON_3: 'salon3',
  COMEDOR: 'comedor',
  TERRAZA: 'terraza',
  DORMITORIO: 'dormitorio',
};

export const PRESETS_DATA = [
  {
    id: 'fiesta',
    title: 'Fiesta',
    icon: MdPartyMode,
    volume: 85,
    zones: ['all'],
  },
  {
    id: 'relax',
    title: 'Relax',
    icon: MdSelfImprovement,
    volume: 40,
    zones: ['all'],
  },
  {
    id: 'cena',
    title: 'Cena',
    icon: MdRestaurant,
    volume: 50,
    zones: ['all'],
  },
  {
    id: 'todo_activo',
    title: 'Todo Activo',
    icon: MdSelectAll,
    volume: 60,
    zones: ['all'], 
  },
];