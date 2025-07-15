// src/pages/BoardFittingFinalTablePage.js
import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";


const BoardFittingFinalTablePage = () => {
  const [quantities, setQuantities] = useState({});
  const tableRef = useRef(null); 

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("boardData"));
    if (storedData) {
      setQuantities(storedData);
    }
  }, []);

  const handleDownloadPDF = () => {
  const element = tableRef.current;
  const opt = {
    margin:       0.5,
    filename:     'BoardFittingMaterial.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(element).set(opt).save();
};

  let serial = 1;

  const isolatorTypeMap = {
  "63A4pole": "63A 4-pole isolator",
  "63A3pole": "63A 3-pole isolator",
  "63A2pole": "63A 2-pole isolator",
  "40A2pole": "40A 2-pole isolator",
};

const selectedIsolatorLabel = isolatorTypeMap[quantities.isolatortype];
const selectedIsolatorQty = quantities.isolatorqty || 0;

  return (
    <div className="w-full max-w-4xl mx-auto">

      {/* ✅ Wrap this div with the ref */}
      <div ref={tableRef}>
        {/* Main Material Table */}
        <div className="overflow-x-auto w-full max-w-4xl">
          <table className="w-full border border-collapse">
            <caption >BoardFitting Material </caption>
            <thead className="bg-gray-200">
              <tr>
                <th className="sn-col">S.no</th>
                <th className="qty-col">Quantity</th>
                <th className="item-col">Item</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["plt18", "18-Modular Plate"],
                ["plt16", "16-Modular Plate"],
                ["plt12", "12-Modular Plate"],
                ["plt8", "8-Modular Plate"],
                ["plt6", "6-Modular Plate"],
                ["plt4", "4-Modular Plate"],
                ["plt3", "3-Modular Plate"],
                ["plt2", "2-Modular Plate"]
              ]
              .filter(([key]) => quantities[key] > 0)
              .map(([key, label]) => (
                <tr key={key}>
                  <td className="sn-col">{serial++}.</td>
                  <td className="qty-col">{quantities[key] || 0}</td>
                  <td className="item-col">{label}</td>
                </tr>
              ))}

              {/* MCB */}
              {(quantities.mcb > 0 || quantities.mcb16a > 0 || quantities.mcb20a > 0) && (
              <tr>
                <td className="sn-col">{serial++}.</td>
                <td className="qty-col">{quantities.mcb || 0}</td>
                <td className="item-col">
                  MCB
                  <div className="mt-1">16A: {quantities.mcb16a || 0}</div>
                  <div className="mt-1">20A: {quantities.mcb20a || 0}</div>
                </td>
              </tr>
              )}

              {/* Isolator Types */}
           {selectedIsolatorLabel && selectedIsolatorQty > 0 && (
                <tr>
                  <td className="sn-col">{serial++}.</td>
                  <td className="qty-col">{selectedIsolatorQty}</td>
                  <td className="item-col">{selectedIsolatorLabel}</td>
                </tr>
              )}

              {/* Other Fittings */}
              {[
                ["sw6a", "6A Switches"],
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
                ["splsht", "Special Round Sheets"],
                ["msplsht", "Medium Special Sheets"],
                ["mdmysht", "Medium Dummy Sheets"],
                ["pvcTape", "PVC Tape"]
              ]
              .filter(([key]) => quantities[key] > 0)
              .map(([key, label]) => (
                <tr key={key}>
                  <td className="sn-col">{serial++}.</td>
                  <td className="qty-col">{quantities[key] || 0}</td>
                  <td className="item-col">{label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Screws Table */}
        <h3 className="text-lg mt-6 mb-2 font-semibold text-center">Screws</h3>
        <table className="w-full max-w-4xl border border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="sn-col">S.no</th>
              <th className="qty-col">Quantity</th>
              <th className="item-col">Item</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["screw1inch", "1-inch screw"],
              ["screw1_5inch", "1.5-inch screw"],
              ["screw2inch", "2-inch screw"],
              ["screw2_5inch", "2.5-inch screw"],
              ["screw3inch", "3-inch screw"]
            ]
            .filter(([key]) => quantities[key] > 0)
            .map(([key, label]) => (
              <tr key={key}>
                <td className="sn-col">{serial++}.</td>
                <td className="qty-col">{quantities[key] || 0}</td>
                <td className="item-col">{label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ PDF Button */}
      <div className="button-container">
        <button
          onClick={handleDownloadPDF}
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
};

export default BoardFittingFinalTablePage;
