// /utils/validateProvider.js
function validateProvider(data) {
  const errores = [];

  const camposObligatorios = [
    "numeroDeCuit_Cuil",
    "nombreCompleto",
    "especialidad",
    "telefono",
    "correoElectronico",
    "direccion",
    "horarioInicio",
    "horarioFin",
    "dias"
  ];

  // Validar campos vacíos
  for (const campo of camposObligatorios) {
    if (data[campo] === undefined || data[campo] === null || data[campo] === "") {
      errores.push(`El campo "${campo}" es obligatorio.`);
    }
  }

  // Validar esCentro (booleano y no vacío)
  if (data.esCentro === undefined || data.esCentro === null) {
    errores.push(`El campo "esCentro" es obligatorio y debe ser true o false.`);
  } else if (typeof data.esCentro !== "boolean") {
    errores.push(`El campo "esCentro" debe ser un valor booleano (true/false).`);
  }
  // 🔹 Validar dependencia con integraCentro
  if (data.esCentro === true && !data.integraCentro) {
    errores.push(`El campo "integraCentro" debe completarse cuando "esCentro" es true.`);
  }
  if (data.esCentro === false && data.integraCentro) {
    errores.push(`El campo "integraCentro" solo debe completarse cuando "esCentro" es true.`);
  }
  return errores;
}

module.exports = validateProvider;
