import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import { EyeFilled } from '@ant-design/icons';
import '../styles/FormularioInputs.css';

const FormularioInputs = () => {
  const [nombre, setNombre] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNombreChange = (e) => setNombre(e.target.value);
  const handleDiaChange = (e) => setDia(e.target.value);
  const handleMesChange = (e) => setMes(e.target.value);

  const validateForm = () => {
    const isNombreValid = nombre.length <= 80 && nombre.trim() !== '';
    const isDiaValid = !isNaN(dia) && dia > 0 && dia <= 31;
    const isMesValid = !isNaN(mes) && mes > 0 && mes <= 12;
    setIsFormValid(isNombreValid && isDiaValid && isMesValid);
  };

  useEffect(() => {
    validateForm();
  }, [nombre, dia, mes]);

  return (
    <div className="formulario-inputs">
      <div className="inputs-container">
        <Input
          placeholder="Nombre"
          value={nombre}
          onChange={handleNombreChange}
          maxLength={80}
          className="input-field"
        />
        <input
          type="number"
          name="dia"
          value={dia}
          onChange={handleDiaChange}
          min="1"
          max="31"
          placeholder="Día"
        />

        <input
          type="number"
          name="mes"
          value={mes}
          onChange={handleMesChange}
          min="1"
          max="12"
          placeholder="Mes"
        />
      </div>

      {/* Botón de previsualización */}
      <Button
        type="primary"
        disabled={!isFormValid}
        className={`preview-button ${!isFormValid ? 'disabled' : ''}`}
      >
        <EyeFilled /> Previsualizar
      </Button>
    </div>
  );
};

export default FormularioInputs;
