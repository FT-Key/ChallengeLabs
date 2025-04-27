import React, { useState } from 'react';
import { Tabs } from 'antd';
import cumpleIcon from '../assets/star_icon.svg';
import regaloIcon from '../assets/gift_icon.svg';
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
          <img src={cumpleIcon} alt="Placa de Cumple" style={{ marginRight: 8, width: 20 }} />
          Placa de Cumple
        </span>
      ),
      key: 'cumple',
    },
    {
      label: (
        <span>
          <img src={regaloIcon} alt="Placa de Bienvenida" style={{ marginRight: 8, width: 20 }} />
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
        style={{ display: 'inline-block', marginRight: 10 }}
      />
    </div>
  );
};

export default PestañasHeader;
