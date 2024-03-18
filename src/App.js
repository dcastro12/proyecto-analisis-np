import React, { useState } from 'react';
import './App.css';
import Menu from './components/Menu';
import CliqueVisualization from './components/CliqueVisualization';
import ColoringVisualization from './components/ColoringVisualization';
import SubSetSumVisualization from './components/SubSetSumVisualization';

function App() {

   const [view, setView] = useState('menu');

   const handleCliqueClick = () => {
      setView('clique');
   };

   const handleGraphColoringClick = () => {
      setView('coloring');
   };

   const handleSubsetSumClick = () => {
      setView("subsetsum");
   };

   const handleBack = () => {
      setView('menu');
   };

   return (
      <div className="App">
         {view === 'menu' ? (
            <Menu
               onCliqueClick={handleCliqueClick}
               onGraphColoringClick={handleGraphColoringClick}
               onSubsetSumClick={handleSubsetSumClick}
            />
         ) : null}
         {view === 'clique' ? <CliqueVisualization onBack={handleBack} /> : null}
         {view === 'coloring' ? <ColoringVisualization onBack={handleBack} /> : null}
         {view === 'subsetsum' ? <SubSetSumVisualization onBack={handleBack} /> : null}
      </div>
   );
}

export default App;
