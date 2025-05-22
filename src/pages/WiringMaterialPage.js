// src/pages/WiringMaterialPage.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const WiringMaterialPage = () => {
  const [quantities, setQuantities] = useState({
    w4: 0, w6: 0, w25: 0, w15: 0, w1: 0,
    w4r: 0, w4b: 0, w6r: 0, w6b: 0, w25r: 0, w25b: 0,
    w15g: 0, w15gy: 0,
    w1r: 0, w1b: 0, w1g: 0, w1y: 0, w1bu: 0,
    fp: 0, sb: 0, pvcTape: 0
  });

  const history = useHistory();

  const handleChange = (key, value) => {
    setQuantities({ ...quantities, [key]: parseInt(value) || 0 });
  };

  const handleNext = () => {
    localStorage.setItem("wiringData", JSON.stringify(quantities));
    localStorage.setItem("materialType", "wiring");
    history.push("/wiring-final-table");
  };

  let serial = 1;

  const wireData = [
    {
      key: "w6",
      label: "6-SQ MM Wire Coil",
      colors: [
        { color: "Red", key: "w6r" },
        { color: "Black", key: "w6b" }
      ]
    },
    {
      key: "w4",
      label: "4-SQ MM Wire Coil",
      colors: [
        { color: "Red", key: "w4r" },
        { color: "Black", key: "w4b" }
      ]
    },
    {
      key: "w25",
      label: "2.5-SQ MM Wire Coil",
      colors: [
        { color: "Red", key: "w25r" },
        { color: "Black", key: "w25b" }
      ]
    },
    {
      key: "w15",
      label: "1.5-SQ MM Wire Coil",
      colors: [
        { color: "Green", key: "w15g" },
        { color: "Grey", key: "w15gy" }
      ]
    },
    {
      key: "w1",
      label: "1-SQ MM Wire Coil",
      colors: [
        { color: "Red", key: "w1r" },
        { color: "Black", key: "w1b" },
        { color: "Green", key: "w1g" },
        { color: "Yellow", key: "w1y" },
        { color: "Blue", key: "w1bu" }
      ]
    }
  ];

  const others = [
    { key: "fp", label: "Flexible Pipe Bag" },
    { key: "sb", label: "Spring Box With Hooks" },
    { key: "pvcTape", label: "PVC Tape" }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h2 className="text-xl mb-4 font-semibold text-center">Wiring Material</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">S.no</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Item</th>
            </tr>
          </thead>
          <tbody>
            {wireData.map(({ key, label, colors }) => (
              <React.Fragment key={key}>
                <tr>
                  <td className="border p-2" rowSpan={colors.length + 1}>{serial++}.</td>
                  <td className="border p-2" rowSpan={colors.length + 1}>
                    <input
                      type="number"
                      className="border p-1 w-full"
                      value={quantities[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                    />
                  </td>
                  <td className="border p-2">{label}</td>
                </tr>
                {colors.map(({ color, key: colorKey }) => (
                  <tr key={colorKey}>
                    <td className="border p-2">
                      {color}:
                      <input
                        type="number"
                        className="border ml-2 p-1 w-24"
                        value={quantities[colorKey]}
                        onChange={(e) => handleChange(colorKey, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}

            {others.map(({ key, label }) => (
              <tr key={key}>
                <td className="border p-2">{serial++}.</td>
                <td className="border p-2">
                  <input
                    type="number"
                    className="border p-1 w-full"
                    value={quantities[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                </td>
                <td className="border p-2">{label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-container">
          <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default WiringMaterialPage;
