const { Recipe } = require("../db/models");
const { Op } = require("sequelize");

//  Crear receta
const createRecipe = async (req, res) => {
  try {
    const {
      nombreDelMedicamento,
      presentacion,
      paciente,
      numeroDeDocumento,
      fechaDeEmision,
      cantidad,
      estado,
      observaciones,
    } = req.body;

    // Validación de campos obligatorios
    if (
      !nombreDelMedicamento ||
      !presentacion ||
      !paciente ||
      !numeroDeDocumento ||
      !cantidad ||
      !estado
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }


    // Validar estado
    if (!["Pendiente", "Aprobada"].includes(estado)) {
      return res
        .status(400)
        .json({ error: 'El estado debe ser "Pendiente" o "Aprobada"' });
    }

    // Validar nombre
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]{1,60}$/.test(nombreDelMedicamento)) {
      return res.status(400).json({
        error:
          "El nombre del medicamento debe tener solo letras, números o espacios y no superar los 60 caracteres",
      });
    }

    // Validar cantidad (1 o 2)
    if (isNaN(cantidad) || cantidad < 1 || cantidad > 2) {
      return res
        .status(400)
        .json({ error: "La cantidad debe ser un número válido entre 1 y 2" });
    }

    // Validar número de documento
    if (!/^[0-9]{7,9}$/.test(numeroDeDocumento)) {
      return res
        .status(400)
        .json({ error: "El número de documento debe tener entre 7 y 9 dígitos" });
    }

    // Validar observaciones
    if (observaciones && observaciones.length > 300) {
      return res
        .status(400)
        .json({ error: "Las observaciones no pueden superar los 300 caracteres" });
    }

    // Validar que la fecha de emisión sea hoy
    const hoy = new Date();
    const fecha = new Date(fechaDeEmision);
    const fechaHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const fechaNormalizada = new Date(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate()
    );

    if (fechaNormalizada.getTime() !== fechaHoy.getTime()) {
      return res
        .status(400)
        .json({ error: "La fecha de emisión debe ser la fecha actual" });
    }

    const mes = hoy.getMonth();
    const anio = hoy.getFullYear();

    // No permitir recetas idénticas en el mismo mes
    const recetaExistente = await Recipe.findOne({
      where: {
        paciente,
        nombreDelMedicamento,
        fechaDeEmision: {
          [Op.gte]: new Date(anio, mes, 1),
          [Op.lte]: new Date(anio, mes + 1, 0),
        },
      },
    });

    if (recetaExistente) {
      return res.status(400).json({
        error: `Ya existe una receta para "${nombreDelMedicamento}" en este mes.`,
      });
    }

    // Límite de 2 unidades del mismo medicamento por mes
    const totalCantidad = await Recipe.sum("cantidad", {
      where: {
        paciente,
        nombreDelMedicamento,
        fechaDeEmision: {
          [Op.gte]: new Date(anio, mes, 1),
          [Op.lte]: new Date(anio, mes + 1, 0),
        },
      },
    });

    const cantidadTotal = (totalCantidad || 0) + parseInt(cantidad);
    if (cantidadTotal > 2) {
      return res.status(400).json({
        error: `Este paciente ya tiene ${totalCantidad || 0} unidades en el mes. No puede superar 2.`,
      });
    }

    // Límite de 30 recetas totales por mes
    const recetasDelMes = await Recipe.count({
      where: {
        paciente,
        fechaDeEmision: {
          [Op.gte]: new Date(anio, mes, 1),
          [Op.lte]: new Date(anio, mes + 1, 0),
        },
      },
    });

    if (recetasDelMes >= 30) {
      return res.status(400).json({
        error: "Se ha alcanzado el límite de 30 recetas por mes para este paciente",
      });
    }

    // Crear receta
    const nuevaReceta = await Recipe.create({
      nombreDelMedicamento,
      presentacion,
      paciente,
      numeroDeDocumento,
      fechaDeEmision: fechaHoy,
      cantidad,
      estado,
      observaciones,
    });

    res.status(201).json(nuevaReceta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Obtener todas las recetas
const getRecipes = async (req, res) => {
  try {
    const recetas = await Recipe.findAll();
    res.status(200).json(recetas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener receta por ID
const getRecipeById = async (req, res) => {
  try {
    const receta = await Recipe.findByPk(req.params.id);
    if (!receta) return res.status(404).json({ error: "Receta no encontrada" });
    res.status(200).json(receta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener recetas por nombre de medicamento
const getRecipesByName = async (req, res) => {
  try {
    const { nombre } = req.query;
    const recetas = await Recipe.findAll({
      where: {
        nombreDelMedicamento: { [Op.like]: `%${nombre}%` },
      },
    });
    res.status(200).json(recetas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar receta
const updateRecipe = async (req, res) => {
  try {
    const receta = await Recipe.findByPk(req.params.id);
    if (!receta)
      return res.status(404).json({ error: "Receta no encontrada" });

    const data = req.body;

    // Validar estado
    if (data.estado && !["Pendiente", "Aprobada"].includes(data.estado)) {
      return res
        .status(400)
        .json({ error: 'El estado debe ser "Pendiente" o "Aprobada"' });
    }

    // Validar nombre
    if (
      data.nombreDelMedicamento &&
      !/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]{1,60}$/.test(data.nombreDelMedicamento)
    ) {
      return res.status(400).json({
        error:
          "El nombre del medicamento debe tener solo letras, números o espacios y no superar los 60 caracteres",
      });
    }

    // Validar cantidad
    const nuevaCantidad = data.cantidad
      ? parseInt(data.cantidad)
      : parseInt(receta.cantidad);

    if (isNaN(nuevaCantidad) || nuevaCantidad < 1 || nuevaCantidad > 2) {
      return res.status(400).json({
        error: "La cantidad debe ser un número válido entre 1 y 2",
      });
    }

    // Validar observaciones
    if (data.observaciones && data.observaciones.length > 300) {
      return res
        .status(400)
        .json({ error: "Las observaciones no pueden superar los 300 caracteres" });
    }

    const paciente = data.paciente || receta.paciente;
    const nombreDelMedicamento =
      data.nombreDelMedicamento || receta.nombreDelMedicamento;

    const hoy = new Date();
    const mes = hoy.getMonth();
    const anio = hoy.getFullYear();

    // Límite de 2 unidades del mismo medicamento
    const totalCantidad = await Recipe.sum("cantidad", {
      where: {
        paciente,
        nombreDelMedicamento,
        fechaDeEmision: {
          [Op.gte]: new Date(anio, mes, 1),
          [Op.lte]: new Date(anio, mes + 1, 0),
        },
        id: { [Op.ne]: receta.id },
      },
    });

    const cantidadTotal = (totalCantidad || 0) + nuevaCantidad;
    if (cantidadTotal > 2) {
      return res.status(400).json({
        error: `Este paciente ya tiene ${totalCantidad || 0} unidades en el mes. No puede superar 2.`,
      });
    }

    const recetaModificada = await receta.update(data);
    res.status(200).json(recetaModificada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar receta (solo si no está aprobada)
const deleteRecipe = async (req, res) => {
  try {
    const receta = await Recipe.findByPk(req.params.id);
    if (!receta) {
      return res.status(404).json({ error: "Receta no encontrada" });
    }

    if (receta.estado === "Aprobada") {
      return res.status(400).json({
        error: "No se puede eliminar una receta aprobada",
      });
    }

    await receta.destroy();
    res.status(200).json({ message: "Receta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  getRecipesByName,
  updateRecipe,
  deleteRecipe,
};
