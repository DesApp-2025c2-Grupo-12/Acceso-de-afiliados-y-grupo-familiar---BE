const { Recipe } = require("../db/models");
const { Op } = require("sequelize");

// Crear receta
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
      !fechaDeEmision ||
      !cantidad ||
      !estado
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Validación de formato del nombre del medicamento
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]{1,60}$/.test(nombreDelMedicamento)) {
      return res.status(400).json({
        error:
          "El nombre del medicamento debe tener solo letras, números o espacios y no superar los 60 caracteres",
      });
    }

    // Validar cantidad
    if (isNaN(cantidad) || cantidad < 1 || cantidad > 2) {
      return res
        .status(400)
        .json({ error: "La cantidad debe ser un número válido entre 1 y 2" });
    }

    // Validar documento
    if (!/^[0-9]{7,9}$/.test(numeroDeDocumento)) {
      return res
        .status(400)
        .json({ error: "El número de documento debe tener entre 7 y 9 dígitos" });
    }

    // Validación de fecha
    const fecha = new Date(fechaDeEmision);
    const hoy = new Date();
    const inicioMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const finMesSiguiente = new Date(hoy.getFullYear(), hoy.getMonth() + 2, 0);

    if (fecha < inicioMesActual || fecha > finMesSiguiente) {
      return res.status(400).json({
        error: "La fecha de emisión debe estar dentro del mes actual o el siguiente",
      });
    }

    const mes = fecha.getMonth();
    const anio = fecha.getFullYear();

    // No permitir recetas idénticas en el mismo mes
    const recetasIdenticasMes = await Recipe.findAll({
      where: {
        paciente,
        nombreDelMedicamento,
        fechaDeEmision: {
          [Op.gte]: new Date(anio, mes, 1),
          [Op.lte]: new Date(anio, mes + 1, 0),
        },
      },
    });

    if (recetasIdenticasMes.length > 0) {
      return res.status(400).json({
        error: `Ya existe una receta para "${nombreDelMedicamento}" en el mes seleccionado. No se permiten recetas idénticas en el mismo mes.`,
      });
    }

    // Límite de 2 unidades por paciente por mes
    const recetasMes = await Recipe.findAll({
  where: {
    paciente,
    nombreDelMedicamento, // 🔹 solo mismo medicamento
    fechaDeEmision: {
      [Op.gte]: new Date(anio, mes, 1),
      [Op.lte]: new Date(anio, mes + 1, 0),
    },
  },
});
    const totalCantidad = recetasMes.reduce(
      (acc, r) => acc + parseInt(r.cantidad),
      0
    );

    if (totalCantidad + parseInt(cantidad) > 2) {
      return res.status(400).json({
        error: `Este paciente ya tiene ${totalCantidad} unidades en el mes seleccionado. No puede superar 2 unidades.`,
      });
    }

    // Límite de 30 recetas diferentes por mes
    if (recetasMes.length >= 30) {
      return res.status(400).json({
        error:
          "Se ha alcanzado el límite de 30 recetas diferentes por mes para este paciente",
      });
    }

    // Crear receta
    const nuevaReceta = await Recipe.create({
      nombreDelMedicamento,
      presentacion,
      paciente,
      numeroDeDocumento,
      fechaDeEmision,
      cantidad,
      estado,
      observaciones,
    });

    res.status(201).json(nuevaReceta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las recetas
const getRecipes = async (req, res) => {
  try {
    const recetas = await Recipe.findAll();
    res.status(200).json(recetas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener recetas por nombre del medicamento
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

// Actualizar receta
const updateRecipe = async (req, res) => {
  try {
    const receta = await Recipe.findByPk(req.params.id);
    if (!receta)
      return res.status(404).json({ error: "Receta no encontrada" });

    const data = req.body;

    // Validaciones básicas
    if (
      data.nombreDelMedicamento &&
      !/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]{1,60}$/.test(data.nombreDelMedicamento)
    ) {
      return res.status(400).json({
        error:
          "El nombre del medicamento debe tener solo letras, números o espacios y no superar los 60 caracteres",
      });
    }

    if (
      data.numeroDeDocumento &&
      !/^[0-9]{7,9}$/.test(data.numeroDeDocumento)
    ) {
      return res
        .status(400)
        .json({ error: "El número de documento debe tener entre 7 y 9 dígitos" });
    }

    // Si se modifica la fecha, validar límites y duplicados
    if (data.fechaDeEmision) {
      const fecha = new Date(data.fechaDeEmision);
      const hoy = new Date();
      const inicioMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
      const finMesSiguiente = new Date(hoy.getFullYear(), hoy.getMonth() + 2, 0);

      if (fecha < inicioMesActual || fecha > finMesSiguiente) {
        return res.status(400).json({
          error: "La fecha de emisión debe estar dentro del mes actual o el siguiente",
        });
      }

      const mes = fecha.getMonth();
      const anio = fecha.getFullYear();

      const recetasIdenticasMes = await Recipe.findAll({
        where: {
          paciente: data.paciente || receta.paciente,
          nombreDelMedicamento:
            data.nombreDelMedicamento || receta.nombreDelMedicamento,
          fechaDeEmision: {
            [Op.gte]: new Date(anio, mes, 1),
            [Op.lte]: new Date(anio, mes + 1, 0),
          },
          id: { [Op.ne]: receta.id },
        },
      });

      if (recetasIdenticasMes.length > 0) {
        return res.status(400).json({
          error: `Ya existe una receta para "${data.nombreDelMedicamento || receta.nombreDelMedicamento}" en el mes seleccionado. No se permiten recetas idénticas en el mismo mes.`,
        });
      }

   const recetasMes = await Recipe.findAll({
  where: {
    paciente: data.paciente || receta.paciente,
    nombreDelMedicamento: data.nombreDelMedicamento || receta.nombreDelMedicamento, // 🔹 filtra por medicamento
    fechaDeEmision: {
      [Op.gte]: new Date(anio, mes, 1),
      [Op.lte]: new Date(anio, mes + 1, 0),
    },
    id: { [Op.ne]: receta.id },
  },
});

      const totalCantidad = recetasMes.reduce(
        (acc, r) => acc + parseInt(r.cantidad),
        0
      );
      const nuevaCantidad = parseInt(data.cantidad || receta.cantidad);

      if (totalCantidad + nuevaCantidad > 2) {
        return res.status(400).json({
          error: `Este paciente ya tiene ${totalCantidad} unidades en el mes seleccionado. No puede superar 2 unidades.`,
        });
      }

      if (recetasMes.length >= 30) {
        return res.status(400).json({
          error: "Se ha alcanzado el límite de 30 recetas diferentes por mes para este paciente",
        });
      }
    }

    const recetaModificada = await receta.update(data);
    res.status(200).json(recetaModificada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar receta
const deleteRecipe = async (req, res) => {
  try {
    const deleted = await Recipe.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Receta no encontrada" });
    res.status(200).json({ message: "Receta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipesByName,
  updateRecipe,
  deleteRecipe,
  getRecipeById,
};
