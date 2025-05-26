// src/pages/GaalaMaterialPage.js
import React , {useState} from "react";
import { useHistory } from "react-router-dom";

const GaalaMaterialPage = () => {
  const [quantities, setQuantities] = useState({
    m4: 0, m6: 0, m18: 0, m16: 0, m12: 0,
    m8: 0, m3: 0, m2: 0, p1: 0, p75: 0, b1: 0,
    b75: 0, be1: 0, be75: 0, bl: 0, cw: 0,
    abl: 0, n: 0, pvcTape: 0,bd:0,
    mcbQty: 0, mcbType: ""
  });

  const history = useHistory();

  const handleChange = (item, value) => {
    setQuantities({ ...quantities, [item]: item === "mcbType" ? value : parseInt(value) || 0 });
  };

  const handleNext = () => {
    localStorage.setItem("GaalaData", JSON.stringify(quantities));
    localStorage.setItem("materialType", "Gaala");
    history.push("/gaala-final-table");
  };

  let serial = 1;
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl mb-4 font-semibold text-center">Gaala Material</h2>

      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="w-full border border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">S.no</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Item</th>
            </tr>
          </thead>
          <tbody>
            {/* Modular Boxes */}
            {[
              ["m18", "18-Modular Metal Box"],
              ["m16", "16-Modular Metal Box"],
              ["m12", "12-Modular Metal Box"],
              ["m8", "8-Modular Metal Box"],
              ["m6", "6-Modular Metal Box"],
              ["m4", "4-Modular Metal Box"],
              ["m3", "3-Modular Metal Box"],
              ["m2", "2-Modular Metal Box"]
            ].map(([key, label]) => (
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

            {/* MCB Box with dropdown */}
            <tr>
              <td className="border p-2">{serial++}.</td>
              <td className="border p-2">
                <input
                  type="number"
                  className="border p-1 w-full"
                  value={quantities.mcbQty}
                  onChange={(e) => handleChange("mcbQty", e.target.value)}
                />
              </td>
              <td className="border p-2">
                MCB Box
                <div className="mt-2">
                  <select
                    className="border p-1 w-full mt-1"
                    value={quantities.mcbType}
                    onChange={(e) => handleChange("mcbType", e.target.value)}
                  >
                    <option value="">-- Select Size --</option>
                    <option value="6Way">6Way</option>
                    <option value="8Way">8Way</option>
                    <option value="10Way">10Way</option>
                    <option value="12Way">12Way</option>
                    <option value="16Way">16Way</option>
                  </select>
                </div>
              </td>
            </tr>

            {/* Other Fittings */}
            {[
              ["p1", "1-inch Pipes(1.2 guage)"],
              ["p75", "3/4-inch Pipes"],
              ["b1", "1-inch Boxes"],
              ["b75", "3/4-inch Boxes"],
              ["be1", "1-inch Bends"],
              ["be75", "3/4-inch Bends"],
              ["bl", "Wall Cutting Blades"],
              ["abl", "HackSaw Blades"],
              ["cw", "CopperWire"],
              ["n", "Nails in Kg"],
              ["pvcTape", "PVC Tape"]
            ].map(([key, label]) => (
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

export default GaalaMaterialPage;
