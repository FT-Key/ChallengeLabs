import React, { useState } from 'react';
import { Tabs } from 'antd';
import { StarFilled, GiftFilled } from '@ant-design/icons';
import SubirImagen from './SubirImagen';
import '../styles/pestañasHeader.css';

const PestañasHeader = () => {
  const [activeKey, setActiveKey] = useState('cumple');

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
        <div className="pestaña-contenido">
          <SubirImagen onImageUpload={(file) => console.log(file)} />
        </div>
      ),
    },
    {
      label: (
        <span>
          <GiftFilled
            className={`icono-giftfilled 
              ${activeKey === 'bienvenida' ? 'icono-active' : 'icono-inactive'} 
              ${activeKey !== 'bienvenida' && 'icono-disabled'}`}
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
      <Tabs
        activeKey={activeKey}
        onChange={handleTabChange}
        items={items}
        tabPosition="top"
      />
    </div>
  );
};

export default PestañasHeader;