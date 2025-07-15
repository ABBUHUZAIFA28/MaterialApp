// src/pages/BoardFittingMaterialPage.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const BoardFittingMaterialPage = () => {
  const [quantities, setQuantities] = useState({
    plt18: 0, plt16: 0, plt12: 0, plt8: 0, plt6: 0, plt4: 0, plt3: 0, plt2: 0,
    mcb: 0, mcb16a: 0, mcb20a: 0,
    isolatorqty: 0, isolatortype:"",
    pvcTape: 0, sw6a: 0, sw2w: 0, sw16a: 0, so16a: 0, soint: 0, so6a: 0, ind: 0,
    blkplt: 0, reg: 0, blpsh: 0, anghld: 0, btnhld: 0,
    clgrs: 0, splsht: 0, dmysht: 0, msplsht: 0, mdmysht: 0,
    screw1inch: 0, screw1_5inch: 0, screw2inch: 0, screw2_5inch: 0, screw3inch: 0, screw3_5inch: 0
  });

  const history = useHistory();

const handleChange = (item, value) => {
  const isNumberField = !isNaN(value) && item !== "isolatortype";
  setQuantities({ ...quantities, [item]: isNumberField ? parseInt(value) || 0 : value });
};

  const handleNext = () => {
    localStorage.setItem("boardData", JSON.stringify(quantities));
    localStorage.setItem("materialType", "board");
    history.push("/board-final-table");
  }

  let serial = 1;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl mb-4 font-semibold text-center">Board Fitting's Material</h2>

      {/* Main Material Table */}
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
            {/* Modular Plates */}
            {[
              ["plt18", "18-Modular Plate"],
              ["plt16", "16-Modular Plate"],
              ["plt12", "12-Modular Plate"],
              ["plt8", "8-Modular Plate"],
              ["plt6", "6-Modular Plate"],
              ["plt4", "4-Modular Plate"],
              ["plt3", "3-Modular Plate"],
              ["plt2", "2-Modular Plate"]
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

            {/* MCB Types */}
            <tr>
              <td className="border p-2">{serial++}.</td>
              <td className="border p-2">
                <input
                  type="number"
                  className="border p-1 w-full"
                  value={quantities.mcb}
                  onChange={(e) => handleChange("mcb", e.target.value)}
                />
              </td>
              <td className="border p-2">
                MCB
                <div className="mt-1">
                  16A:
                  <input
                    type="number"
                    className="border ml-2 p-1 w-20"
                    value={quantities.mcb16a}
                    onChange={(e) => handleChange("mcb16a", e.target.value)}
                  />
                </div>
                <div className="mt-1">
                  20A:
                  <input
                    type="number"
                    className="border ml-2 p-1 w-20"
                    value={quantities.mcb20a}
                    onChange={(e) => handleChange("mcb20a", e.target.value)}
                  />
                </div>
              </td>
            </tr>

            {/* Isolator Types */}
            {/* MCB Box with dropdown */}
            <tr>
              <td className="border p-2">{serial++}.</td>
              <td className="border p-2">
                <input
                  type="number"
                  className="border p-1 w-full"
                  value={quantities.isolatorqty}
                  onChange={(e) => handleChange("isolatorqty", e.target.value)}
                />
              </td>
              <td className="border p-2">
                Isolator
                <div className="mt-2">
                  <select
                    className="border p-1 w-full mt-1"
                    value={quantities.isolatortype}
                    onChange={(e) => handleChange("isolatortype", e.target.value)}
                  >
                    <option value="">-- Select Size --</option>
                    <option value="63A4pole">63A-4pole</option>
                    <option value="63A3pole">63A-3pole</option>
                    <option value="63A2pole">63A-2pole</option>
                    <option value="40A2pole">40A-2pole</option>
                  </select>
                </div>
              </td>
            </tr>

            {/* Other Fittings */}
            {[
              ["sw6a", "10A Switches"],
              ["sw2w", "2-Way Switches"],
              ["so6a", "6A 3-Pin Sockets"],
              ["soint", "International Sockets"],
              ["so16a", "16A Sockets"],
              ["sw16a", "16A Switches"],
              ["reg", "Fan Regulators"],
              ["ind", "Indicators"],
              ["blkplt", "Switch Blank Plates"],
              ["blpsh", "Bell Push"],
              ["anghld", "Angle Holders"],
              ["btnhld", "Button Holders"],
              ["clgrs", "Ceiling Roses"],
              ["dmysht", "Dummy Round Sheets"],
              ["bdmysht", "Large Dummy Round Sheets(6.5 inch)"],
              ["splsht", "Special Round Sheets"],
              ["bsplsht", "Large Special Round Sheets(6.5 inch)"],
              ["msplsht", "Medium Special Sheets"],
              ["mdmysht", "Medium Dummy Sheets"],
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

      {/* Screws Table */}
      <h3>Screws</h3>
      <div className="w-full max-w-4xl mx-auto">
        <table className="w-full max-w-4xl border border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">S.no</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Item</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["screw1inch", "1-inch screw"],
            ["screw1_5inch", "1.5-inch screw"],
            ["screw2inch", "2-inch screw"],
            ["screw2_5inch", "2.5-inch screw"],
            ["screw3inch", "3-inch screw"]

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

export default BoardFittingMaterialPage;
