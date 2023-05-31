// src/components/Filter/Filter.tsx
import React, { useState } from 'react';

interface FilterProps {
  options: string[];
  onFilterChange: (attribute: string, value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ options, onFilterChange }) => {
  const [selectedAttribute, setSelectedAttribute] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const handleAttributeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAttribute(event.target.value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleFilter = () => {
    if (selectedAttribute && selectedValue) {
      onFilterChange(selectedAttribute, selectedValue);
    }
  };

  return (
    <div className="filter">
      <select value={selectedAttribute} onChange={handleAttributeChange}>
        <option value="">Select Attribute</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={selectedValue}
        onChange={handleValueChange}
        placeholder="Enter Value"
      />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default Filter;
