import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
    const input = tableRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("SlabMaterial.pdf");
    });
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
