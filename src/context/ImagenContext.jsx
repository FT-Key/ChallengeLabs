import React, { createContext, useContext, useState } from 'react';

const ImagenContext = createContext();

export const useImagen = () => useContext(ImagenContext);

export const ImagenProvider = ({ children }) => {
  const [imagen, setImagen] = useState(null);

  const handleImageUpload = (image) => {
    setImagen(image);
  };

  const handleImageRemove = () => {
    setImagen(null);
  };

  return (
    <ImagenContext.Provider value={{ imagen, handleImageUpload, handleImageRemove }}>
      {children}
    </ImagenContext.Provider>
  );
};