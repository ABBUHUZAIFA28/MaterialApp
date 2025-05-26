import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SlabMaterialPage = () => {
  const [quantities, setQuantities] = useState({
    p18: 0, p12: 0, db1: 0, be: 0, sol: 0, hks: 0, abl: 0, pvcTape: 0
  });
  const history = useHistory();

  const handleChange = (item, value) => {
    setQuantities({ ...quantities, [item]: parseInt(value) || 0 });
  };

  const handleNext = () => {
    localStorage.setItem("SlabData", JSON.stringify(quantities));
    localStorage.setItem("materialType", "Slab");
    history.push("/slab-final-table");
  };

  let serial = 1;

  return (
    <div className="container">
      <h2>Slab Material</h2>
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Quantity</th>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["p18", "1-inch(1.8Guage) Pipes"],
            ["db1", "Deep Boxes1-inch"],
            ["be", "1-inch Bends"],
            ["bd","Box Dummies"],
            ["abl", "HackSaw Blades"],
            ["hks", "FanHooks"],
            ["sol", "Solution Bottle"],
            ["pvcTape", "PVC Tape"]
          ]
          .map(([key, label]) => (
            <tr key={key}>
              <td>{serial++}.</td>
              <td>
                <input
                  type="number"
                  value={quantities[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </td>
              <td>{label}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-container">
          <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default SlabMaterialPage;
