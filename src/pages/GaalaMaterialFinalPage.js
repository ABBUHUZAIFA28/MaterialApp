import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
  const input = tableRef.current;

  html2canvas(input, {
    scale: 2, // Increase scale for higher resolution
    useCORS: true,
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4"); // Use pt units for better control

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate image dimensions for better scaling
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pdfWidth * 0.95; // 95% of page width
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    const marginX = (pdfWidth - imgWidth) / 2;
    const marginY = 20;

    pdf.addImage(imgData, "PNG", marginX, marginY, imgWidth, imgHeight);
    pdf.save("GaalaMaterial.pdf");
  });
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

  const selectedMcbLabel = mcbTypeMap[quantities.mcbType];
  const selectedMcbQty = quantities.mcbQty || 0;

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

              {[
                ["p1", "1-inch Pipes(1.2 guage"],
                ["p75", "3/4-inch Pipes"],
                ["b1", "1-inch Boxes"],
                ["b75", "3/4-inch Boxes"],
                ["be1", "1-inch Bends"],
                ["be75", "3/4-inch Bends"],
                ["bl", "Wall Cutting Blades"],
                ["abl", "HackSaw Blades"],
                ["cw", "CopperWire"],
                ["n", "Nails in kg"],
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
