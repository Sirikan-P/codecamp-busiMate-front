import React from "react";
import useHospitalStore from "../../store/hospital-store";
import Select from "react-select";

export default function SelectHospital({handleHospitalChange}) {
  const hospital = useHospitalStore((state) => state.hospital);
  const hospitalOptions = hospital.map((hosp) => ({
    value: hosp.id, // สมมติว่าแต่ละโรงพยาบาลมี ID
    label: hosp.name, // ชื่อโรงพยาบาลที่แสดงใน dropdown
  }));

  const handleChange = (selectedOption) => {
    const filteredAddress = hospital.find((el)=> el.id === selectedOption.value)
    console.log("filteredAddress",filteredAddress);
    handleHospitalChange(filteredAddress);
  };
 
  

  return (
    <div>
      <Select
        className="text-cyan-600 "
        options={hospitalOptions}
        placeholder="Select Hospital"
        onChange={handleChange}
      />
    </div>
  );
}
