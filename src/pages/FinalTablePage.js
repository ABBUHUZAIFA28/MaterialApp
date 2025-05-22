import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";

const FinalTablePage = () => {
  const [activeData, setActiveData] = useState({});
  const [materialType, setMaterialType] = useState("");

  // Label mapping
  const labelMap = {
    // Wiring Material
    w4: "4-SQ MM Wire Coil",
    w6: "6-SQ MM Wire Coil",
    w25: "25-SQ MM Wire Coil",
    w15: "15-SQ MM Wire Coil",
    w1: "1-SQ MM Wire Coil",
    w4r: "4-SQ MM Red Wire",
    w4b: "4-SQ MM Black Wire",
    w6r: "6-SQ MM Red Wire",
    w6b: "6-SQ MM Black Wire",
    w25r: "2.5-SQ MM Red Wire",
    w25b: "2.5-SQ MM Black Wire",
    w15g: "1.5-SQ MM Green Wire",
    w15gy: "1.5-SQ MM Grey Wire",
    w1r: "1-SQ MM Red Wire",
    w1b: "1-SQ MM Black Wire",
    w1g: "1-SQ MM Green Wire",
    w1y: "1-SQ MM Yellow Wire",
    w1bu: "1-SQ MM Blue Wire",
    fp: "Flexible Pipe",
    sb: "Switch Board Box",
    pvcTape: "PVC Tape",

    // Board Fitting Material
    plt18: "18-Modular Plate", plt16: "16-Modular Plate", plt12: "12-Modular Plate", plt8: "8-Modular Plate",
    plt6: "6-Modular Plate", plt4: "4-Modular Plate", plt3: "3-Modular Plate", plt2: "2-Modular Plate",
    mcb: "MCB", mcb16a: "MCB 16A", mcb20a: "MCB 20A",
    isolator: "Isolator", iso63_2p: "63A 2-Pole", iso63_4p: "63A 4-Pole", iso40_2p: "40A 2-Pole",
    sw6a: "6A Switches", sw2w: "2-Way Switches", so6a: "6A 3-Pin Sockets", soint: "International Sockets",
    so16a: "16A Sockets", sw16a: "16A Switches", reg: "Fan Regulators", ind: "Indicators",
    blkplt: "Switch Blank Plates", blpsh: "Bell Push", anghld: "Angle Holders", btnhld: "Button Holders",
    clgrs: "Ceiling Roses", dmysht: "Dummy Round Sheets", splsht: "Special Round Sheets",
    msplsht: "Medium Special Sheets", mdmysht: "Medium Dummy Sheets",
    screw1inch: "1-inch Screw", screw1_5inch: "1.5-inch Screw", screw2inch: "2-inch Screw",
    screw2_5inch: "2.5-inch Screw", screw3inch: "3-inch Screw", screw3_5inch: "3.5-inch Screw"
  };

  useEffect(() => {
    const type = localStorage.getItem("materialType");
    setMaterialType(type);

    const storedData = JSON.parse(localStorage.getItem(`${type}Data`) || "{}");
    setActiveData(storedData);
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text(`${materialType.toUpperCase()} MATERIAL TABLE`, 14, y);
    y += 10;

    Object.entries(activeData).forEach(([key, value], index) => {
      if (value > 0) {
        doc.setFontSize(12);
        doc.text(`${index + 1}. ${labelMap[key] || key}: ${value}`, 20, y);
        y += 7;
        if (y > 280) {
          doc.addPage();
          y = 10;
        }
      }
    });

    doc.save(`${materialType}-material.pdf`);

    // Clear all material data after saving
    localStorage.removeItem("slabData");
    localStorage.removeItem("gaalaData");
    localStorage.removeItem("wiringData");
    localStorage.removeItem("boardData");
    localStorage.removeItem("materialType");

    setActiveData({});
    setMaterialType("");
  };

  return (
    <div className="p-6">
      {Object.keys(activeData).length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            {materialType.charAt(0).toUpperCase() + materialType.slice(1)} Material Table
          </h3>
          <table className="w-full border border-collapse mb-4">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">S.no</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Item</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(activeData)
                .filter(([_, value]) => value > 0)
                .map(([key, value], index) => (
                  <tr key={key}>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{value}</td>
                    <td className="border p-2">{labelMap[key] || key}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="text-center mt-6">
            <button
              onClick={generatePDF}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save as PDF
            </button>
          </div>
        </div>
      )}

      {Object.keys(activeData).length === 0 && (
        <p className="text-center text-gray-500">No material data to display.</p>
      )}
    </div>
  );
};

export default FinalTablePage;
