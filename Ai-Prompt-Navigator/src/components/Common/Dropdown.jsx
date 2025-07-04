import React from 'react';

const Dropdown = ({ options, value, onChange, renderOption, className = '' }) => {
  return (
    <select
      className={`px-3 py-2 border rounded ${className}`}
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {renderOption ? renderOption(option) : option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
