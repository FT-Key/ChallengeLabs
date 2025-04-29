const locales = ['es', 'en', 'fr', 'de', 'it'];

export const getMesNombre = (mes) => {
  if (!mes) return null;

  const mesInput = mes.trim().toLowerCase();

  for (let locale of locales) {
    for (let i = 0; i < 12; i++) {
      const fecha = new Date(2020, i, 1);
      const mesNombre = new Intl.DateTimeFormat(locale, { month: 'long' }).format(fecha);

      if (mesNombre.toLowerCase() === mesInput) {
        const mesEnEspanol = new Intl.DateTimeFormat('es', { month: 'long' }).format(fecha);
        return mesEnEspanol.charAt(0).toUpperCase() + mesEnEspanol.slice(1).toLowerCase();
      }
    }
  }

  return null;
};

