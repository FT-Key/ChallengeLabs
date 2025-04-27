export const getMesNombre = (mes) => {
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const mesLower = mes.trim().toLowerCase();

  const mesIndex = meses.findIndex(m => m.toLowerCase() === mesLower);

  return mesIndex !== -1 ? meses[mesIndex] : null;
};