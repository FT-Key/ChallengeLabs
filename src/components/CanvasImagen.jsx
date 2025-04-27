import React, { useRef, useEffect, useState } from 'react';
import '../styles/CanvasImagen.css';
import fondoCumple from '../assets/fondo_cumple.png';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const CanvasImage = ({ imagen, dia, mes, nombre }) => {
  const canvasRef = useRef(null);
  const [canvasImage, setCanvasImage] = useState(null);

  const getMesNombre = (mes) => {
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return meses[mes - 1];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Establecer el tamaño del canvas para que coincida con la resolución de la imagen de fondo
    canvas.width = 1440;
    canvas.height = 1800;

    // Crear una promesa que espera que se carguen todas las imágenes
    const loadImages = async () => {
      return new Promise((resolve, reject) => {
        const fondo = new Image();
        fondo.src = fondoCumple;

        const img = imagen ? new Image() : null;
        if (imagen) {
          img.src = URL.createObjectURL(imagen);
        }

        // Contador para verificar que todas las imágenes se hayan cargado
        let loadedImages = 0;

        // Función para comprobar si todas las imágenes están cargadas
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

    loadImages()
      .then(({ fondo, img }) => {
        // Dibujar el fondo en el canvas
        ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);

        // Si hay una imagen cargada, dibujarla en el canvas
        if (img) {
          const imgWidth = 575;
          const imgHeight = 415;
          const xPos = 695;
          const yPos = 979;
          ctx.drawImage(img, xPos, yPos, imgWidth, imgHeight);
        }

        // Pseudo-código
        ctx.font = '30px monospace';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';

        const lines = [
          'var i = 0, age = getAge();',
          'while(true) {',
          '  if (i === age) {',
          `    alert('¡Feliz Cumple ${nombre}!');`,
          '  }',
          '  else {',
          '    i++;',
          '}',
        ];

        const colorMap = {
          var: '#F92672',
          while: '#F92672',
          if: '#F92672',
          else: '#F92672',
          0: '#AD80FD',
          true: '#AD80FD',
          '¡Feliz Cumple': '#D4CA6C',
        };

        // Función para dibujar cada línea con el color aplicado a las palabras clave
        const drawLineWithColor = (line, yPosition) => {
          let xPosition = 285; // Coordenada X inicial

          let currentWord = '';
          let isInWord = false;
          let isInQuote = false;

          for (let i = 0; i < line.length; i++) {
            const char = line[i];

            // Si encontramos una comilla, cambiamos el estado de isInQuote
            if (char === "'") {
              if (isInQuote) {
                ctx.fillStyle = '#D4CA6C';
                ctx.fillText(currentWord, xPosition, yPosition);
                xPosition += ctx.measureText(currentWord).width + 5;
                currentWord = '';
              }
              isInQuote = !isInQuote;
            } else {
              if (isInQuote) {
                currentWord += char;
              } else {
                // Si no estamos dentro de comillas, procesamos como lo hacíamos antes
                if (/[a-zA-Z0-9_]/.test(char)) {
                  currentWord += char;
                  isInWord = true;
                } else {
                  if (isInWord) {
                    const color = colorMap[currentWord] || 'white';
                    ctx.fillStyle = color;
                    ctx.fillText(currentWord, xPosition, yPosition);
                    xPosition += ctx.measureText(currentWord).width + 5;
                    currentWord = '';
                    isInWord = false;
                  }

                  // Dibujar caracteres fuera de palabras (como los espacios y puntuaciones)
                  ctx.fillStyle = 'white';
                  ctx.fillText(char, xPosition, yPosition);
                  xPosition += ctx.measureText(char).width + 5;
                }
              }
            }
          }

          // Si al final queda una palabra sin dibujar
          if (isInWord) {
            // Buscar el color para las palabras clave
            const color = colorMap[currentWord] || 'white';
            ctx.fillStyle = color;
            ctx.fillText(currentWord, xPosition, yPosition);
          }
        };

        // Dibuja cada línea del "código"
        const lineHeight = 50; // Espacio entre las líneas de texto
        let yPosition = 455; // Coordenada Y inicial

        lines.forEach((line) => {
          drawLineWithColor(line, yPosition);
          yPosition += lineHeight; // Incrementar la posición Y para la siguiente línea
        });

        // Dibuja el día
        ctx.font = 'bold 120px sans-serif';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.fillText(dia, 350, 1200);

        // Dibuja el mes
        ctx.font = 'bold 40px sans-serif';
        ctx.fillStyle = '#808080';
        ctx.textAlign = 'left';
        const mesNombre = getMesNombre(mes);
        ctx.fillText(`de`, 300, 1325);
        ctx.fillText(mesNombre, 300, 1375);

        // Convertir el canvas a una imagen (dataURL)
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
      {/* Mostrar la imagen generada con una clase CSS */}
      {canvasImage && (
        <>
          <img src={canvasImage} alt="Imagen Feliz Cumple" className="preview-image" />
          <div className='download-button-container'>
            <Button onClick={handleDownload} type="primary">
              <DownloadOutlined /> Descargar
            </Button>
          </div>
        </>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} /> {/* Ocultar el canvas */}
    </div>
  );
};

export default CanvasImage;
