export const renderizarPseudoCodigo = (ctx, lines, colorMap) => {
  let isInQuote = false; // Ahora lo declaramos FUERA para que dure entre líneas

  const drawLineWithColor = (line, yPosition) => {
    let xPosition = 285;
    let currentWord = '';
    let isInWord = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === "'") {
        if (isInQuote) {
          // Cerrar la comilla
          ctx.fillStyle = '#D4CA6C'; // Color de comillas (amarillo)
          ctx.fillText(currentWord, xPosition, yPosition);
          xPosition += ctx.measureText(currentWord).width + 5;
          currentWord = '';
        }
        isInQuote = !isInQuote; // Alternar estado
      } else {
        if (isInQuote) {
          // Todo el contenido entre comillas
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

    // Si queda algo pendiente al final
    if (currentWord) {
      ctx.fillStyle = isInQuote ? '#D4CA6C' : (colorMap[currentWord] || 'white');
      ctx.fillText(currentWord, xPosition, yPosition);
    }
  };

  const lineHeight = 50;
  let yPosition = 455;
  lines.forEach((line) => {
    drawLineWithColor(line, yPosition);
    yPosition += lineHeight;
  });
};

export const generarLines = (nombre) => {
  const maxFirstLine = 18;
  const maxOtherLines = 36;
  const nombreCompleto = `¡Feliz Cumple ${nombre}!`;
  let nombrePartes = [];

  if (nombreCompleto.length <= maxFirstLine + 14) { 
    nombrePartes.push(nombreCompleto);
  } else {
    let restante = nombreCompleto.slice(0);
    let primeraParte = restante.slice(0, maxFirstLine);
    nombrePartes.push(primeraParte);
    restante = restante.slice(maxFirstLine);

    while (restante.length > 0) {
      nombrePartes.push(restante.slice(0, maxOtherLines));
      restante = restante.slice(maxOtherLines);
    }

    let ultimaParte = nombrePartes.pop();
    if (!ultimaParte.endsWith('!')) {
      ultimaParte += '!'; 
    }
    nombrePartes.push(ultimaParte + "');");
  }

  return [
    'var i = 0, age = getAge();',
    'while(true) {',
    '  if (i === age) {',
    `    alert('${nombrePartes[0]}`,
    ...nombrePartes.slice(1).map(linea => `    ${linea}`),
    '  else {',
    '    i++;',
    '}',
  ];
};

export const aplicarEstiloTexto = (ctx, estilo) => {
  ctx.font = estilo.font;
  ctx.fillStyle = estilo.fillStyle;
  ctx.textAlign = estilo.textAlign;
};