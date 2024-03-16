import React, {useState} from 'react';
import './App.css';
import Menu from './components/Menu';
import CliqueVisualization from './components/CliqueVisualization';

function App() {

  const [view, setView] = useState('menu');

  const handleCliqueClick = () => {
      setView('clique');
  };

  const handleGraphColoringClick = () => {
      console.log("Coloración de Grafos");
  };

  const handleIndependentSetClick = () => {
      console.log("Conjunto Independiente");
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
                  onIndependentSetClick={handleIndependentSetClick}
              />
          ) : null}
          {view === 'clique' ? <CliqueVisualization onBack={handleBack} /> : null}
      </div>
  );
}

export default App;
