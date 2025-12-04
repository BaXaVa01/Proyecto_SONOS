import React from 'react';
import { MdAdd } from 'react-icons/md';

const CreatePresetCard = () => {
  return (
    <div className="card create-preset-card">
      <h3>Crear Nuevo Preset</h3>
      <p>Personaliza tu propia configuración de zonas</p>
      <button className="create-preset-btn">
        <MdAdd /> Nuevo Preset
      </button>
    </div>
  );
};

export default CreatePresetCard;