import React, { useRef, useEffect, useState, use } from 'react';
import { renderizarPseudoCodigo, generarLines, aplicarEstiloTexto } from '../helpers/manejadorImagenes.js';
import { cargarImagenes } from '../utils/manejadorImagenes.js';
import { getMesNombre } from '../utils/manejadorFechas.js';
import { colorMap, estilosTexto } from '../constants/constantes.js';
import '../styles/CanvasImagen.css';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useImagen } from '../context/ImagenContext.jsx';

const CanvasImage = ({ dia, mes, nombre }) => {
  const canvasRef = useRef(null);
  const [canvasImage, setCanvasImage] = useState(null);
  const { imagen } = useImagen();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = 1440;
    canvas.height = 1800;

    cargarImagenes(imagen)
      .then(({ fondo, img }) => {
        ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);

        if (img) {
          const imgWidth = img.width;
          const imgHeight = img.height;

          const targetWidth = 573;
          const targetHeight = 415;
          const targetX = 700;
          const targetY = 979;

          const imgAspectRatio = imgWidth / imgHeight;
          const targetAspectRatio = targetWidth / targetHeight;

          let drawWidth, drawHeight, xPos, yPos;

          if (imgAspectRatio > targetAspectRatio) {
            drawWidth = targetWidth;
            drawHeight = targetWidth / imgAspectRatio;
            xPos = targetX;
            yPos = targetY + (targetHeight - drawHeight) / 2;
          } else {
            drawHeight = targetHeight;
            drawWidth = targetHeight * imgAspectRatio;
            xPos = targetX + (targetWidth - drawWidth) / 2;
            yPos = targetY;
          }

          ctx.drawImage(img, 0, 0, imgWidth, imgHeight, xPos, yPos, drawWidth, drawHeight);
        }

        aplicarEstiloTexto(ctx, estilosTexto.pseudoCodigo);
        const lines = generarLines(nombre);
        renderizarPseudoCodigo(ctx, lines, colorMap);

        aplicarEstiloTexto(ctx, estilosTexto.textoDiaCumple);
        ctx.fillText(dia, 350, 1200);

        aplicarEstiloTexto(ctx, estilosTexto.textoMesCumple);
        const mesNombre = getMesNombre(mes);
        ctx.fillText(`de`, 300, 1325);
        ctx.fillText(mesNombre, 300, 1375);

        const imageUrl = canvas.toDataURL('image/png');
        setCanvasImage(imageUrl);
      })
      .catch((error) => {
        console.error('Error cargando las imágenes:', error);
      });
  }, [imagen, dia, mes, nombre]);

  const handleDownload = () => {
    if (canvasImage) {
      const link = document.createElement('a');
      link.href = canvasImage;
      link.download = `Cumple_${nombre}.png`;
      link.click();
    }
  };

  return (
    <div className='imagen-container'>
      {canvasImage && (
        <>
          <img src={canvasImage} alt={`imagen feliz cumple ${nombre}`} className="preview-image" />
          <div className='download-button-container'>
            <Button onClick={handleDownload} type="primary">
              <DownloadOutlined /> Descargar
            </Button>
          </div>
        </>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CanvasImage;
