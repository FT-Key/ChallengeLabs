import React, { useState, useEffect } from 'react';
import { Input, Button, message, Form } from 'antd';
import { EyeFilled } from '@ant-design/icons';
import ModalPrevisualizar from './ModalPrevisualizar.jsx';
import '../styles/FormularioInputs.css';
import { getMesIndex } from '../utils/manejadorFechas.js';

const FormularioInputs = () => {
  const [nombre, setNombre] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNombreValid, setIsNombreValid] = useState(true);
  const [isDiaValid, setIsDiaValid] = useState(true);
  const [isMesValid, setIsMesValid] = useState(true);


  useEffect(() => {
    validateForm();
  }, [nombre, dia, mes]);

  const validateForm = () => {
    const diaNumero = Number(dia);

    const nombreEsValido =
      nombre.length >= 2 &&
      nombre.length <= 80 &&
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ'’\- ]+$/.test(nombre.trim()) &&
      nombre.trim() !== '';

    const mesIndex = getMesIndex(mes);
    const mesEsValido = mesIndex !== null;

    const diaEsValido = !isNaN(diaNumero) && diaNumero >= 1 && diaNumero <= 31;
    const diaCompatibleConMes = mesIndex !== null &&
      diaNumero >= 1 &&
      diaNumero <= new Date(2024, mesIndex + 1, 0).getDate();

    setIsNombreValid(nombreEsValido);
    setIsMesValid(mesEsValido);
    setIsDiaValid(diaEsValido && diaCompatibleConMes);

    setIsFormValid(nombreEsValido && mesEsValido && diaEsValido && diaCompatibleConMes);
  };

  const handleDiaChange = (e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      message.error('El día debe ser un número del 1 al 31');
      setDia('1');
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
      <Form layout="vertical" className="inputs-container">
        <Form.Item
          label="Nombre"
          validateStatus={nombre ? (isNombreValid ? 'success' : 'error') : ''}
          help={nombre && !isNombreValid ? 'Debe tener entre 2 y 80 caracteres y solo letras' : ''}
          hasFeedback
          className="input-field"
        >
          <Input
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            type='text'
            required
            value={nombre}
            onChange={(e) => {
              const valor = e.target.value;
              if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ'’\- ]*$/.test(valor)) {
                setNombre(valor);
              }
            }}

            maxLength={80}
          />
        </Form.Item>

        <Form.Item
          label="Día"
          validateStatus={dia ? (isDiaValid ? 'success' : 'error') : ''}
          help={dia && !isDiaValid ? 'Número inválido para el mes' : ''}
          hasFeedback
          className="input-number-field"
        >
          <Input
            id="dia"
            name="dia"
            placeholder="Día"
            type='number'
            required
            value={dia}
            onChange={handleDiaChange}
            step={1}
            maxLength={2}
          />
        </Form.Item>

        <Form.Item
          label="Mes"
          validateStatus={mes ? (isMesValid ? 'success' : 'error') : ''}
          help={mes && !isMesValid ? 'Nombre de mes inválido' : ''}
          hasFeedback
          className="input-field month-field"
        >
          <Input
            id="mes"
            name="mes"
            placeholder="Mes"
            type='text'
            required
            value={mes}
            onChange={(e) => {
              const valor = e.target.value;
              if (valor === '' || /^[\p{L}\s]+$/u.test(valor)) {
                setMes(valor);
              }
            }}

            maxLength={15}
          />
        </Form.Item>
      </Form>

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