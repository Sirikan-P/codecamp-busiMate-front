import React, { useEffect, useState } from "react";

export default function SelectAssistance({handleAssistanceChange}) {
    const [selectedWheelChair, setSelectedWheelChair] = useState("");
  
  const assist = [
    { name: "Yes", value: "NEED" },
    { name: "No", value: "NOT_NEED" },
  ];
  const handleChange = (event) => {
    setSelectedWheelChair(event.target.value);
    handleAssistanceChange(event.target.value);
     // Update selected value when user changes selection
  };

return (
    <div className="text-cyan-600 text-xl font-semibold">      
    <tbody>
        Need Assist?
        <tr className="flex flex-col gap-2 text-rose-300">
          {assist?.map((type, index) => (
            <td className="flex gap-2">
              <input type="radio" value={assist[index].value} key={index}
              checked={selectedWheelChair === type.value}
              onChange={handleChange} />
              {assist[index].name}
           
            </td>
          ))}
        </tr>
      </tbody>
    </div>
  );
}
