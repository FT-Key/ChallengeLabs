import React, { createContext, useState, useContext } from 'react';

const ImagenContext = createContext();

export const ImagenProvider = ({ children }) => {
  const [imagen, setImagen] = useState(null);

  const handleImageUpload = (file) => {
    setImagen(file);
  };

  return (
    <ImagenContext.Provider value={{ imagen, handleImageUpload }}>
      {children}
    </ImagenContext.Provider>
  );
};

export const useImagen = () => useContext(ImagenContext);
