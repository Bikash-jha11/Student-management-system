import React, { useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

interface FilterByDaysProps {
  value: number;
  onChange: (days: number) => void;
}

const FilterByDays: React.FC<FilterByDaysProps> = ({ value, onChange }) => {
  const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: number | null) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      color="primary"
      size="small"
    >
      <ToggleButton value={7}>Last 7 Days</ToggleButton>
      <ToggleButton value={30}>Last 30 Days</ToggleButton>
      <ToggleButton value={90}>Last 90 Days</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default FilterByDays;