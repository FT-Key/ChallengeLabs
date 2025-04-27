import React, { useState, useEffect } from 'react';
import { Input, InputNumber, Button } from 'antd';
import { EyeFilled } from '@ant-design/icons';
import ModalPrevisualizar from './ModalPrevisualizar.jsx';
import '../styles/FormularioInputs.css';

const FormularioInputs = ({ imagen }) => {
  const [nombre, setNombre] = useState('');
  const [dia, setDia] = useState(null);
  const [mes, setMes] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    validateForm();
  }, [nombre, dia, mes]);

  const validateForm = () => {
    const isNombreValid = nombre.length <= 80 && nombre.trim() !== '';
    const isDiaValid = dia !== null && dia > 0 && dia <= 31;
    const isMesValid = mes !== null && mes > 0 && mes <= 12;
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
        <InputNumber
          placeholder="Día"
          value={dia}
          onChange={(value) => setDia(value)}
          className="input-number-field"
          min={1}
          max={31}
        />
        <InputNumber
          placeholder="Mes"
          value={mes}
          onChange={(value) => setMes(value)}
          className="input-number-field"
          min={1}
          max={12}
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
        imagen={imagen}
        nombre={nombre}
        dia={dia}
        mes={mes}
      />
    </div>
  );
};

export default FormularioInputs;
