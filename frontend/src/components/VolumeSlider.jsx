import React from 'react';

const VolumeSlider = ({ value, onChange, min = 0, max = 100, disabled = false }) => {
  const numericValue = value !== undefined && value !== null ? Number(value) : 0;
  const percentage = ((numericValue - min) / (max - min)) * 100;
  
  const handleSliderChange = (event) => {
    
    onChange(event.target.value); 
  };

  const sliderStyle = {
    background: disabled
      ? 'var(--slider-track-bg)'
      : `linear-gradient(to right, var(--slider-fill-bg) ${percentage}%, var(--slider-track-bg) ${percentage}%)`
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      value={numericValue}
      onChange={handleSliderChange}
      className="volume-slider"
      style={sliderStyle}
      disabled={disabled}
    />
  );
};

export default VolumeSlider;