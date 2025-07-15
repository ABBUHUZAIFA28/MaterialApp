import React, { useEffect, useState,useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js"

const WiringMaterialFinalPage = () => {
  const [quantities, setQuantities] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("wiringData")) || {};
    setQuantities(storedData);
  }, []);

  const renderLabel = (key) => (
    <span className="ml-2 font-semibold">{quantities[key] || 0}</span>
  );

  const wireData = [
    {
      label: "6-SQ MM Wire Coil",
      key: "w6",
      colors: [
        { label: "Red", key: "w6r" },
        { label: "Black", key: "w6b" }
      ],
    },
    {
      label: "4-SQ MM Wire Coil",
      key: "w4",
      colors: [
        { label: "Red", key: "w4r" },
        { label: "Black", key: "w4b" }
      ],
    },
    {
      label: "2.5-SQ MM Wire Coil",
      key: "w25",
      colors: [
        { label: "Red", key: "w25r" },
        { label: "Black", key: "w25b" }
      ],
    },
    {
      label: "1.5-SQ MM Wire Coil",
      key: "w15",
      colors: [
        { label: "Green", key: "w15g" },
        { label: "Grey", key: "w15gy" },
        { label: "Other", key: null }
      ],
    },
    {
      label: "1-SQ MM Wire Coil",
      key: "w1",
      colors: [
        { label: "Red", key: "w1r" },
        { label: "Black", key: "w1b" },
        { label: "Green", key: "w1g" },
        { label: "Yellow", key: "w1y" },
        { label: "Blue", key: "w1bu" }
      ],
    }
  ];

  const others = [
    { label: "Flexible Pipe Bag", key: "fp" },
    { label: "Spring Box With Hooks", key: "sb" },
    { label: "PVC Tapes", key: "pvcTape" }
  ];

   const handleDownloadPDF = () => {
     const element = tableRef.current;
     const filename = prompt("Enter a filename for the PDF:", "WiringMaterial");
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

  // Helper to check if any quantity > 0 for main item or any colors
  const hasPositiveQuantity = ({ key, colors }) => {
    if ((quantities[key] || 0) > 0) return true;
    if (!colors) return false;
    return colors.some(({ key: colorKey }) => colorKey && (quantities[colorKey] || 0) > 0);
  };

  return (
    <div ref={tableRef}>
      <div className="grid place-items-center border border-black w-full h-full">
      <table className="w-auto mx-20px border border-collapse">
        <caption >Wiring Material</caption>
        <thead className="bg-gray-200">
          <tr>
            <th className="sn-col">S.no</th>
            <th className="qty-col">Quantity</th>
            <th className="item-col">Item</th>
          </tr>
        </thead>
        <tbody>
          {wireData.map(({ label, key, colors }) => {
            if (!hasPositiveQuantity({ key, colors })) return null;

            // Count colors with qty > 0 or that have no key but label 'Other'
            const validColors = colors.filter(({ key: colorKey, label: colorLabel }) => {
              if (!colorKey && colorLabel === "Other") return true; // Always show 'Other'
              return colorKey && (quantities[colorKey] || 0) > 0;
            });

            return (
              <React.Fragment key={key}>
                <tr>
                  <td className="sn-col" rowSpan={validColors.length + 1}>
                    {serial++}.
                  </td>
                  <td className="qty-col" rowSpan={validColors.length + 1}>
                    {renderLabel(key)}
                  </td>
                  <td className="item-col">{label}</td>
                </tr>
                {validColors.map(({ label: colorLabel, key: colorKey }) => (
                  <tr key={colorLabel}>
                    <td className="border p-2">
                      {colorLabel}:{" "}
                      {colorKey ? (
                        renderLabel(colorKey)
                      ) : (
                        <span className="ml-2 font-semibold">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            );
          })}

          {others.map(({ label, key }) => {
            if ((quantities[key] || 0) <= 0) return null;
            return (
              <tr key={key}>
                <td className="border p-2">{serial++}.</td>
                <td className="border p-2">{renderLabel(key)}</td>
                <td className="border p-2">{label}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
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

export default WiringMaterialFinalPage;
