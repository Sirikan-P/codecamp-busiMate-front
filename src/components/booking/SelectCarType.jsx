import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function SelectCarType({handleCarTypeChange}) {
const carType = [  
    { value: 'SEETS_4',label: '4 SEATS'},
    { value: 'SEETS_5',label: '5 SEATS'},
    { value: 'SEETS_7',label: '7 SEATS'},
   
    ]

    const handleChange = (selectedOption) => {
        handleCarTypeChange(selectedOption.value);
      };

  return (
    <div>
      <Select className="text-cyan-600"
      options={carType}
      placeholder="Select Car Type"
      onChange={handleChange}
      />
     
    </div>
  );
}
