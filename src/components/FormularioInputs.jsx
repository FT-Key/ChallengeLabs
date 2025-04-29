import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import { EyeFilled } from '@ant-design/icons';
import ModalPrevisualizar from './ModalPrevisualizar.jsx';
import '../styles/FormularioInputs.css';
import { getMesNombre } from '../utils/manejadorFechas.js';

const FormularioInputs = () => {
  const [nombre, setNombre] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    validateForm();
  }, [nombre, dia, mes]);

  const validateForm = () => {
    const diaNumero = Number(dia);
    const isNombreValid = nombre.length >= 2 && nombre.length <= 80 && nombre.trim() !== '';
    const isDiaValid = !isNaN(diaNumero) && diaNumero >= 1 && diaNumero <= 31;
    const isMesValid = getMesNombre(mes) !== null;
    setIsFormValid(isNombreValid && isDiaValid && isMesValid);
  };

  const handleDiaChange = (e) => {
    const value = e.target.value;

    // Solo permitir números
    if (!/^\d*$/.test(value)) {
      message.error('El día debe ser un número del 1 al 31');
      setDia('1'); // Poner en 1 si escribe letra u otro caracter
      return;
    }

    const numero = Number(value);

    if (numero > 31) {
      message.error('El día no puede ser mayor que 31');
      setDia('31');
    } else if (numero < 1 && value !== '') {
      message.error('El día debe ser un número mayor o igual a 1');
      setDia('1');
    } else {
      setDia(value);
    }
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
          id="nombre"
          name="nombre"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="input-field"
          maxLength={80}
        />
        <Input
          id="dia"
          name="dia"
          placeholder="Día"
          value={dia}
          onChange={handleDiaChange}
          className="input-number-field"
          maxLength={2}
        />
        <Input
          id="mes"
          name="mes"
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
        dia={Number(dia)}
        mes={mes}
      />
    </div>
  );
};

export default FormularioInputs;