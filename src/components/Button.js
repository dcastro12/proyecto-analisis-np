import React from 'react';
import './Button.css'; // Estilos CSS del botón

const Button = ({ text, onClick }) => {
    return (
        <button className="button" onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
