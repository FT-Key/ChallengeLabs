import React from 'react';
import { Modal } from 'antd';
import CanvasImage from './CanvasImagen.jsx';
import '../styles/ModalPrevisualizar.css';

const ModalPrevisualizar = ({ open, onClose, imagen, nombre, dia, mes }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={800}
      className="modal-previsualizar"
      title={"Preview"}
    >

      {/* Contenido del modal con el componente CanvasImage */}
      <div className="preview-container">
        <CanvasImage
          imagen={imagen}
          nombre={nombre}
          dia={dia}
          mes={mes}
        />
      </div>
    </Modal>
  );
};

export default ModalPrevisualizar;
