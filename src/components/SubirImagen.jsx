import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';
import '../styles/SubirImagen.css';

const SubirImagen = ({ onImageUpload }) => {
  const [fileList, setFileList] = useState([]);

  const handleChange = ({ fileList }) => {
    const newFile = fileList[0];

    if (!newFile) {
      setFileList([]);
      return;
    }

    setFileList(fileList);

    onImageUpload(newFile.originFileObj);
  };

  const beforeUpload = (file) => {
    const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPGorPNG) {
      message.error('Solo se pueden cargar imágenes en formato JPG o PNG!');
    }
    return isJPGorPNG;
  };

  return (
    <div className="subir-imagen">
      <Upload
        fileList={fileList}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        accept=".jpg,.png"
        maxCount={1}
        showUploadList={{
          showRemoveIcon: true,
          showPreviewIcon: false,
        }}
      >
        <div
          className="upload-drop-zone"
        >
          <InboxOutlined className='icono-inboxoutlined' />
          <h3>Arrastra la Foto de la persona aquí</h3>
          <p>
            Se utilizará una única imagen al a vez
          </p>
        </div>
      </Upload>
    </div >
  );
};

export default SubirImagen;
