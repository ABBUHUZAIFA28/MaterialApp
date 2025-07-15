import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

const SlabMaterialFinalPage = () => {
  const [quantities, setQuantities] = useState({});
  const tableRef = useRef(null); 

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("SlabData"));
    if (storedData) {
      setQuantities(storedData);
    }
  }, []);
  const handleDownloadPDF = () => {
    const element = tableRef.current;
    const filename = prompt("Enter a filename for the PDF:", "SlabMaterial");
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
  return (
    <div className="w-full  mx-auto h-screen border border-black">
      <div ref={tableRef}>
        
        <div className=" border border-black   max-w-4xl">
          <table className="w-full border border-collapse ">
            <caption >Slab Material</caption>
            <thead className="bg-gray-200">
              <tr>
                <th className="sn-col">S.no</th>
                <th className="qty-col">Quantity</th>
                <th className="item-col">Item</th>
              </tr>
            </thead>
            <tbody>
              
              {[
                ["p18", "1.8-inch Pipes"],
              ["p12", "1.2-inch Pipes"],
              ["db1", "Deep Boxes1-inch"],
              ["be", "1-inch Bends"],
               ["bd","Box Dummies"],
              ["abl", "HackSaw Blades"],
               ["hks", "FanHooks"],
              ["sol", "Solution Bottle"],
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

export default SlabMaterialFinalPage;
