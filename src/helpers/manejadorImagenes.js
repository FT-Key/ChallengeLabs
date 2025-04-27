export const renderizarPseudoCodigo = (ctx, lines, colorMap) => {
  const drawLineWithColor = (line, yPosition) => {
    let xPosition = 285;
    let currentWord = '';
    let isInWord = false;
    let isInQuote = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

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

    if (isInWord) {
      const color = colorMap[currentWord] || 'white';
      ctx.fillStyle = color;
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
  return [
    'var i = 0, age = getAge();',
    'while(true) {',
    '  if (i === age) {',
    `    alert('¡Feliz Cumple ${nombre}!');`,
    '  }',
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