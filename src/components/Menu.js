import React from 'react';
import Button from './Button'; // Importar el componente de botón
import './Menu.css'; // Estilos CSS para el menú

const Menu = ({ onCliqueClick, onGraphColoringClick, onSubsetSumClick }) => {
    return (
        <div className="menu">
            <h1>Menú Principal</h1>
            <Button text="Clique" onClick={onCliqueClick} />
            <Button text="Coloración de Grafos" onClick={onGraphColoringClick} />
            <Button text="Problema del subconjunto" onClick={onSubsetSumClick} />
        </div>
    );
};

export default Menu;
