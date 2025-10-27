const ESPECIALIDADES = [
  "Cardiología",
  "Pediatría",
  "Dermatología",
  "Clínica Médica",
  "Ginecología",
  "Neurología",
  "Traumatología",
];

const UBICACIONES = ["CABA", "Buenos Aires", "Córdoba", "Santa Fe", "Mendoza"];
const ZONAS = ["Norte", "Sur", "Este", "Oeste"];

/**
 * Valida los query params para GET /provider
 */
const validateProviderQuery = ({ nombre, especialidad, location, zona }) => {
  const errores = [];

  if (nombre && !/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]{1,50}$/.test(nombre.trim())) {
    errores.push("Nombre inválido (solo letras y hasta 50 caracteres).");
  }

  if (especialidad && !ESPECIALIDADES.includes(especialidad)) {
    errores.push("Especialidad inválida.");
  }

  if (location && !UBICACIONES.includes(location)) {
    errores.push("Ubicación inválida.");
  }

  if (zona) {
    if (location !== "Buenos Aires") {
      errores.push("La zona solo aplica si la ubicación es 'Buenos Aires'.");
    } else if (!ZONAS.includes(zona)) {
      errores.push("Zona inválida.");
    }
  }

  return errores;
};

module.exports = {
  validateProviderQuery,
};

