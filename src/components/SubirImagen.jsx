import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import '../styles/SubirImagen.css';
import { useImagen } from '../context/ImagenContext.jsx';

const SubirImagen = () => {
  const [fileList, setFileList] = useState([]);
  const { handleImageUpload, handleImageRemove } = useImagen();

  const handleChange = ({ fileList }) => {
    const newFile = fileList[0];

    if (!newFile) {
      setFileList([]);
      handleImageRemove();
      return;
    }

    setFileList(fileList);
    handleImageUpload(newFile.originFileObj);
  };

  const beforeUpload = (file) => {
    const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPGorPNG) {
      message.error('Solo se pueden cargar imágenes en formato JPG o PNG!');
    }
    return isJPGorPNG;
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="subir-imagen">
      <Upload
        fileList={fileList}
        onChange={handleChange}
        beforeUpload={/* beforeUpload */ () => false}
        onPreview={handlePreview}
        accept=".jpg,.png"
        maxCount={1}
        showUploadList={{
          showRemoveIcon: true,
          showPreviewIcon: false,
        }}
      >
        <div className="upload-drop-zone">
          <InboxOutlined className="icono-inboxoutlined" />
          <h3>Arrastra la Foto de la persona aquí</h3>
          <p>Se utilizará una única imagen al a vez</p>
        </div>
      </Upload>
    </div>
  );
};

export default SubirImagen;