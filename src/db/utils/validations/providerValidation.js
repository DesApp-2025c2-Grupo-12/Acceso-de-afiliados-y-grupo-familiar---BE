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

const validateProviderBody = (data) => {
  const errores = [];
  const {
    numeroDeCuit_Cuil,
    nombreCompleto,
    especialidad,
    esCentro,
    telefono,
    correoElectronico,
    direccion,
    horarioInicio,
    horarioFin,
    dias,
    integraCentro,
  } = data;

  const camposObligatorios = [
    "numeroDeCuit_Cuil",
    "nombreCompleto",
    "especialidad",
    "telefono",
    "correoElectronico",
    "direccion",
    "horarioInicio",
    "horarioFin",
    "dias",
  ];

  for (const campo of camposObligatorios) {
    if (data[campo] === undefined || data[campo] === null || data[campo] === "") {
      errores.push(`El campo "${campo}" es obligatorio.`);
    }
  }

  // esCentro obligatorio y booleano
  if (esCentro === undefined || esCentro === null) {
    errores.push(`El campo "esCentro" es obligatorio y debe ser true o false.`);
  } else if (typeof esCentro !== "boolean") {
    errores.push(`El campo "esCentro" debe ser un valor booleano (true/false).`);
  }

  // Nombre
  if (nombreCompleto && !/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]{1,50}$/.test(nombreCompleto)) {
    errores.push("El nombre completo solo puede contener letras y espacios (máx. 50 caracteres).");
  }

  // Especialidad
  if (especialidad && !ESPECIALIDADES.includes(especialidad)) {
    errores.push("Especialidad inválida. Debe ser una de las permitidas.");
  }

  // Correo electrónico
  if (correoElectronico && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoElectronico)) {
    errores.push("Correo electrónico inválido.");
  }

  // Relación esCentro / integraCentro
  if (esCentro === true && !integraCentro) {
    errores.push(`El campo "integraCentro" debe completarse cuando "esCentro" es true.`);
  }
  if (esCentro === false && integraCentro) {
    errores.push(`El campo "integraCentro" solo debe completarse cuando "esCentro" es true.`);
  }

  // Si integraCentro existe, debe ser válido
  if (integraCentro && !ZONAS.includes(integraCentro)) {
    errores.push("Zona inválida.");
  }

  return errores;
};

// Validar query (filtros)
const validateProviderQuery = ({ nombre, especialidad, location, zona }) => {
  const errores = [];

  if (nombre && !/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]{1,50}$/.test(nombre)) {
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
  validateProviderBody,
  validateProviderQuery,
};
