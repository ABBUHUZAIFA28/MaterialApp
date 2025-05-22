import React, { useState } from "react";
import './Styles/styles.css';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SelectionPage from "./pages/SelectionPage";
import SlabMaterialPage from "./pages/SlabMaterialPage";
import GaalaMaterialPage from "./pages/GaalaMaterialPage";
import WiringMaterialPage from "./pages/WiringMaterialPage";
import BoardFittingMaterialPage from "./pages/BoardFittingMaterialPage";

import FinalTablePage from "./pages/FinalTablePage";
import WiringMaterialFinalPage from "./pages/WiringMaterialFinalPage";
import BoardFittingFinalTablePage from "./pages/BoardFittingFinalTablePage";
import GaalaMaterialFinalPage from "./pages/GaalaMaterialFinalPage";
import SlabMaterialFinalPage from "./pages/SlabMaterialFinalPage";




function App() {
  const [selectedType, setSelectedType] = useState("");

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <SelectionPage setSelectedType={setSelectedType} />
          </Route>

          {/* Updated Routes for each material type */}
          <Route path="/slab-material" exact>
            <SlabMaterialPage />
          </Route>
          <Route path="/gaala-material" exact>
            <GaalaMaterialPage />
          </Route>
          <Route path="/wiring-material" exact>
            <WiringMaterialPage />
          </Route>
          <Route path="/board-fitting-material" exact>
            <BoardFittingMaterialPage />
          </Route>
          <Route path="/wiring-final-table" exact>
            <WiringMaterialFinalPage />
          </Route>
          <Route path="/board-final-table" exact><BoardFittingFinalTablePage /></Route>
          <Route path="/gaala-final-table" exact><GaalaMaterialFinalPage /></Route>
          <Route path="/slab-final-table" exact><SlabMaterialFinalPage /></Route>
      
          <Route path="/final-table">
            <FinalTablePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
