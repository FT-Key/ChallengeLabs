import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { EyeFilled } from '@ant-design/icons';
import ModalPrevisualizar from './ModalPrevisualizar.jsx';
import '../styles/FormularioInputs.css';
import { mesesValidos } from '../constants/constantes.js';

const FormularioInputs = () => {
  const [nombre, setNombre] = useState('');
  const [dia, setDia] = useState(null);
  const [mes, setMes] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    validateForm();
  }, [nombre, dia, mes]);

  const validateForm = () => {
    const isNombreValid = nombre.length <= 80 && nombre.trim() !== '';
    const isDiaValid = dia !== null && dia > 0 && dia <= 31;
    const isMesValid = mesesValidos.some((m) => m.toLowerCase() === mes.trim().toLowerCase());
    setIsFormValid(isNombreValid && isDiaValid && isMesValid);
  };

  const handlePrevisualizar = () => {
    setIsModalOpen(true);
  };

  const handleCerrarModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="formulario-inputs">
      <div className="inputs-container">
        <Input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="input-field"
          maxLength={80}
        />
        <Input
          placeholder="Día"
          value={dia}
          onChange={(e) => setDia(Number(e.target.value))}
          className="input-number-field"
          maxLength={2}
        />
        <Input
          placeholder="Mes"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          className="input-field month-field"
          maxLength={15}
        />
      </div>

      <Button
        type="primary"
        disabled={!isFormValid}
        onClick={handlePrevisualizar}
        className="boton-previsualizar"
      >
        <EyeFilled /> Previsualizar
      </Button>

      <ModalPrevisualizar
        open={isModalOpen}
        onClose={handleCerrarModal}
        nombre={nombre}
        dia={dia}
        mes={mes}
      />
    </div>
  );
};

export default FormularioInputs;