const { Recipe } = require("../../models");
const { Op } = require("sequelize");

const validateRecipeData = async (data, isUpdate = false, recipeId = null) => {
  const {
    nombreDelMedicamento,
    presentacion,
    paciente,
    cantidad,
    estado,
    observaciones,
    fechaDeEmision,
  } = data;

  // Campos obligatorios al crear receta
  if (!isUpdate) {
    if (!paciente) throw new Error("Debe seleccionar un paciente");
    if (!nombreDelMedicamento) throw new Error("Debe ingresar el nombre del medicamento");
    if (!presentacion) throw new Error("Debe seleccionar la presentación");
    if (!cantidad) throw new Error("Cantidad inválida (mínimo 1, máximo 2)");
    if (!estado) throw new Error('El estado debe ser "Pendiente" o "Aprobada"');
    if (!observaciones) throw new Error("Debe ingresar observaciones");
  }

  // Observaciones: máximo 300 caracteres
  if (observaciones && observaciones.length > 300) {
    throw new Error("Las observaciones no pueden superar los 300 caracteres");
  }

  // Estado válido
  if (estado && !["Pendiente", "Aprobada"].includes(estado)) {
    throw new Error('El estado debe ser "Pendiente" o "Aprobada"');
  }

  // Nombre del medicamento válido
  if (
    nombreDelMedicamento &&
    !/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]{1,60}$/.test(nombreDelMedicamento)
  ) {
    throw new Error(
      "El nombre del medicamento debe tener solo letras, números o espacios y no superar los 60 caracteres"
    );
  }

  // Cantidad válida (1-2)
  const cantidadNum = parseInt(cantidad);
  if (!isNaN(cantidadNum)) {
    if (cantidadNum < 1 || cantidadNum > 2) {
      throw new Error("La cantidad debe ser un número válido entre 1 y 2");
    }
  } else if (!isUpdate) {
    throw new Error("La cantidad debe ser un número válido entre 1 y 2");
  }

  // Validación de fecha de emisión si está aprobada
  if (fechaDeEmision && estado === "Aprobada") {
    const fecha = new Date(fechaDeEmision);
    if (isNaN(fecha.getTime())) {
      throw new Error("La fecha de emisión no es válida");
    }
  }

  // Validaciones de negocio (solo si hay paciente y medicamento)
  if (paciente && nombreDelMedicamento) {
    const hoy = new Date();
    const mes = hoy.getMonth();
    const anio = hoy.getFullYear();

    // Límite de 2 unidades del mismo medicamento por mes
    const totalCantidad = await Recipe.sum("cantidad", {
      where: {
        paciente,
        nombreDelMedicamento,
        createdAt: {
          [Op.gte]: new Date(anio, mes, 1),
          [Op.lte]: new Date(anio, mes + 1, 0),
        },
        ...(recipeId ? { id: { [Op.ne]: recipeId } } : {}),
      },
    });

    const cantidadTotal = (totalCantidad || 0) + (cantidadNum || 0);
    if (cantidadTotal > 2) {
      throw new Error(
        `Este paciente ya tiene ${totalCantidad || 0} unidades de "${nombreDelMedicamento}" este mes (máximo 2)`
      );
    }

    // No permitir recetas idénticas en el mismo mes (solo al crear)
    if (!isUpdate) {
      const recetaExistente = await Recipe.findOne({
        where: {
          paciente,
          nombreDelMedicamento,
          createdAt: {
            [Op.gte]: new Date(anio, mes, 1),
            [Op.lte]: new Date(anio, mes + 1, 0),
          },
        },
      });

      if (recetaExistente) {
        throw new Error(
          `Ya existe una receta para "${nombreDelMedicamento}" en este mes`
        );
      }

      // Límite total de 30 recetas por mes
      const recetasDelMes = await Recipe.count({
        where: {
          paciente,
          createdAt: {
            [Op.gte]: new Date(anio, mes, 1),
            [Op.lte]: new Date(anio, mes + 1, 0),
          },
        },
      });

      if (recetasDelMes >= 30) {
        throw new Error(
          "Se ha alcanzado el límite de 30 recetas por mes para este paciente"
        );
      }
    }
  }
};

module.exports = {
  validateRecipeData,
};
