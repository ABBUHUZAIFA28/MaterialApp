import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import  html2pdf  from "html2pdf.js";

const GaalaMaterialFinalPage = () => {
  const [quantities, setQuantities] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("GaalaData"));
    if (storedData) {
      setQuantities(storedData);
    }
  }, []);

  const handleDownloadPDF = () => {
    const element = tableRef.current;
    const filename = prompt("Enter a filename for the PDF:", "GaalaMaterial");
    if (!filename) return; // User cancelled
    const opt = {
      margin:       0.5,
      filename:     `${filename}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
  
    html2pdf().from(element).set(opt).save();
  };
  

  let serial = 1;

  // MCB mapping & selection
  const mcbTypeMap = {
    "6Way": "MCB Box - 6Way",
    "8Way": "MCB Box - 8Way",
    "10Way": "MCB Box - 10Way",
    "12Way": "MCB Box - 12Way",
    "16Way": "MCB Box - 16Way",
  };
  const mcbTpnMap = {
    "6Way-TPN": "MCB Box - 6Way-TPN",
    "8Way-TPN": "MCB Box - 8Way-TPN",
    "10Way-TPN": "MCB Box - 10Way-TPN"
  }

  const selectedMcbLabel = mcbTypeMap[quantities.mcbType];
  const selectedMcbTpnLabel = mcbTpnMap[quantities.mcbTpn];
  const selectedMcbQty = quantities.mcbQty || 0;
  const selectedMcbTQty = quantities.mcbTQty || 0;
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div ref={tableRef}>
        <div className="overflow-x-auto w-full max-w-4xl">
          <table className="w-full border border-collapse">
            <caption >Gaala Material</caption>
            <thead className="bg-gray-200">
              <tr>
                <th className="sn-col">S.no</th>
                <th className="qty-col">Quantity</th>
                <th className="item-col">Item</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["m18", "18-Modular Metal Box"],
                ["m16", "16-Modular Metal Box"],
                ["m12", "12-Modular Metal Box"],
                ["m8", "8-Modular Metal Box"],
                ["m6", "6-Modular Metal Box"],
                ["m4", "4-Modular Metal Box"],
                ["m3", "3-Modular Metal Box"],
                ["m2", "2-Modular Metal Box"],
              ]
              .filter(([key]) => quantities[key] > 0)
              .map(([key, label]) => (
                <tr key={key}>
                  <td className="sn-col">{serial++}.</td>
                  <td className="qty-col">{quantities[key] || 0}</td>
                  <td className="item-col">{label}</td>
                </tr>
              ))}

              {/* Show only selected MCB type and quantity */}
              {selectedMcbLabel && selectedMcbQty > 0 && (
                <tr>
                  <td className="">{serial++}.</td>
                  <td className="">{selectedMcbQty}</td>
                  <td className="">{selectedMcbLabel}</td>
                </tr>
              )}

              {selectedMcbTpnLabel && selectedMcbTQty > 0 && (
                <tr>
                  <td className="sn-col text-center border p-2">{serial++}.</td>
                  <td className="">{selectedMcbTQty}</td>
                  <td className="">{selectedMcbTpnLabel}</td>
                </tr>
              )}

              {[
                ["p1", "1-inch Pipes(1.2 guage"],
                ["p75", "3/4-inch Pipes"],
                ["b1", "1-inch Boxes"],
                ["b75", "3/4-inch Boxes"],
                ["be1", "1-inch Bends"],
                ["be75", "3/4-inch Bends"],
                ["bl", "Wall Cutting Blades 5-inch Swastik Gold Black"],
                ["abl", "HackSaw Blades"],
                ["cw", "CopperWire"],
                ["n", "2.5-inchNails in kg"],
                ["pvcTape", "PVC Tape"],
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
      </div>

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

export default GaalaMaterialFinalPage;
