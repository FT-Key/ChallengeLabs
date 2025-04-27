import fondoCumple from '../assets/fondo_cumple.png';

export const cargarImagenes = async (imagen) => {
  return new Promise((resolve, reject) => {
    const fondo = new Image();
    fondo.src = fondoCumple;

    const img = imagen ? new Image() : null;
    if (imagen) {
      img.src = URL.createObjectURL(imagen);
    }

    let loadedImages = 0;

    const checkImagesLoaded = () => {
      loadedImages += 1;
      if (loadedImages === 2) {
        resolve({ fondo, img });
      }
    };

    fondo.onload = checkImagesLoaded;
    if (img) {
      img.onload = checkImagesLoaded;
    }

    fondo.onerror = reject;
    if (img) {
      img.onerror = reject;
    }
  });
};