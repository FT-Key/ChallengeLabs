export const renderizarPseudoCodigo = (ctx, lines, colorMap) => {
  let isInQuote = false;

  const drawLineWithColor = (line, yPosition) => {
    let xPosition = 285;
    let currentWord = '';
    let isInWord = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === "'") {
        if (isInQuote) {
          ctx.fillStyle = '#D4CA6C';
          currentWord += char;
          ctx.fillText(currentWord, xPosition, yPosition);
          xPosition += ctx.measureText(currentWord).width + 5;
          currentWord = '';
        }
        if (!isInQuote) {
          currentWord += char;
        }
        isInQuote = !isInQuote;
      } else {
        if (isInQuote) {
          currentWord += char;
        } else {
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
            ctx.fillStyle = 'white';
            ctx.fillText(char, xPosition, yPosition);
            xPosition += ctx.measureText(char).width + 5;
          }
        }
      }
    }

    if (currentWord) {
      ctx.fillStyle = isInQuote ? '#D4CA6C' : (colorMap[currentWord] || 'white');
      ctx.fillText(currentWord, xPosition, yPosition);
    }
  };

  const lineHeight = 50;
  let yPosition = 430;
  lines.forEach((line) => {
    drawLineWithColor(line, yPosition);
    yPosition += lineHeight;
  });
};

export const generarLines = (nombre) => {
  const maxCharInLines = 36;
  const textoFijo = " alert('";
  const textoFinal = "');";
  const textoExtra = "¡Feliz Cumple ";

  const contenido = textoExtra + nombre;
  let nombrePartes = [];
  let palabras = contenido.split(' ');

  let lineaActual = textoFijo;
  let espacioDisponible = maxCharInLines - textoFijo.length - textoFinal.length;

  for (let palabra of palabras) {
    if ((lineaActual.length - textoFijo.length) + palabra.length + 1 <= espacioDisponible) {
      if (lineaActual !== textoFijo) {
        lineaActual += ' ';
      }
      lineaActual += palabra;
    } else {
      if (palabra.length > espacioDisponible) {
        let partePalabra = palabra;
        if (lineaActual !== textoFijo) {
          nombrePartes.push(lineaActual);
          lineaActual = '    ';
          espacioDisponible = maxCharInLines - 4;
        }
        while (partePalabra.length > 0) {
          const fragmento = partePalabra.slice(0, espacioDisponible);
          nombrePartes.push(lineaActual + fragmento);
          partePalabra = partePalabra.slice(espacioDisponible);
          lineaActual = '    ';
          espacioDisponible = maxCharInLines - 4;
        }
        console.log("nombrePartes", nombrePartes);
      } else {
        nombrePartes.push(lineaActual);
        lineaActual = '    ' + palabra;
        espacioDisponible = maxCharInLines - 4;
      }
    }
  }

  if (nombrePartes.length === 0) {
    nombrePartes.push(lineaActual + textoFinal);
  } else {
    nombrePartes.push(lineaActual + textoFinal);
  }

  return [
    'var i = 0, age = getAge();',
    'while(true) {',
    '    if (i === age) {',
    ...nombrePartes.map(line => '        ' + line),
    '    }',
    '    else {',
    '        i++;',
    '    }',
    '}',
  ];
};

export const aplicarEstiloTexto = (ctx, estilo) => {
  ctx.font = estilo.font;
  ctx.fillStyle = estilo.fillStyle;
  ctx.textAlign = estilo.textAlign;
};