import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../Styles/selectionpage.css"; // Import the CSS

const SelectionPage = ({ setSelectedType }) => {
  const [type, setType] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    if (!type) return;
    setSelectedType(type);

    switch (type) {
      case "Slab Material":
        history.push("/slab-material");
        break;
      case "Gaala Material":
        history.push("/gaala-material");
        break;
      case "Wiring Material":
        history.push("/wiring-material");
        break;
      case "Board Fitting Material":
        history.push("/board-fitting-material");
        break;
      default:
        break;
    }
  };

  return (
    <div className="selection-container">
      
      <div className="selection-box">
        <div><h2>Select Material Type</h2></div>
        <select
          className="selection-dropdown"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="Slab Material">Slab Material</option>
          <option value="Gaala Material">Gaala Material</option>
          <option value="Wiring Material">Wiring Material</option>
          <option value="Board Fitting Material">Board Fitting Material</option>
        </select>
        <button className="next-button" onClick={handleSubmit}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectionPage;
