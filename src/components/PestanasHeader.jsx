import React, { useState } from 'react';
import { Tabs } from 'antd';
import { StarFilled, GiftFilled } from '@ant-design/icons';
import SubirImagen from './SubirImagen.jsx';
import FormularioInputs from './FormularioInputs.jsx';
import '../styles/PestanasHeader.css';
import { useImagen } from '../context/ImagenContext.jsx';

const PestanasHeader = () => {
  const [activeKey, setActiveKey] = useState('cumple');
  const { imagen } = useImagen();

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  const items = [
    {
      label: (
        <span>
          <StarFilled
            className={`icon-starfilled ${activeKey === 'cumple' ? 'icon-active' : 'icon-inactive'}`}
          />
          Placa de Cumple
        </span>
      ),
      key: 'cumple',
      children: (
        <div className="pestana-contenido">
          <SubirImagen />
          {imagen && <FormularioInputs />}
        </div>
      ),
    },
    {
      label: (
        <span>
          <GiftFilled
            className={`icono-giftfilled ${activeKey === 'bienvenida' ? 'icono-active' : 'icono-inactive'} ${activeKey !== 'bienvenida' && 'icono-disabled'}`}
          />
          Placa de Bienvenida
        </span>
      ),
      key: 'bienvenida',
      disabled: true,
    },
  ];

  return (
    <div className="tabs-container">
      <Tabs activeKey={activeKey} onChange={handleTabChange} items={items} tabPosition="top" />
    </div>
  );
};

export default PestanasHeader;