import React, { useEffect, useState } from "react";

export default function SelectWheelChair({handleWheelchairChange}) {
  const [selectedWheelChair, setSelectedWheelChair] = useState("");

  const wheelChair = [
    { name: "Yes", value: "NEED" },
    { name: "No", value: "NOT_NEED" },
  ];
  const handleChange = (event) => {
    setSelectedWheelChair(event.target.value);
    handleWheelchairChange(event.target.value);
  };

  return (
    <div className="text-cyan-600 font-semibol text-xl font-semibold">
      <tbody>
        Need Wheelchair?
        <tr className="flex flex-col gap-2 text-rose-300">
          {wheelChair?.map((type, index) => (
            <td className="flex gap-2">
              <input type="radio" value={wheelChair[index].value} key={index}
              checked={selectedWheelChair === type.value}
              onChange={handleChange}  />
              {wheelChair[index].name}
           
            </td>
          ))}
        </tr>
      </tbody>
    </div>
  );
}
