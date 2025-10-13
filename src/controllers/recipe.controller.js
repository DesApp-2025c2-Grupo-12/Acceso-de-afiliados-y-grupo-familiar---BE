const { Recipe, Affiliate } = require("../db/models");
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

    // Validar que el paciente exista en el sistema
    const afiliadoExiste = await Affiliate.findOne({
      where: { numeroDeDocumento: paciente },
    });
    if (!afiliadoExiste) {
      return res.status(404).json({
        error: "El paciente no está registrado en el sistema",
      });
    }

    // Validar que el documento coincida con el paciente
    if (numeroDeDocumento !== paciente) {
      return res.status(400).json({
        error: "El número de documento debe coincidir con el paciente seleccionado",
      });
    }

    // Validar estado
    const estadosValidos = ["Pendiente", "Aprobada", "Rechazada", "Entregada"];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({
        error: `Estado inválido. Los estados permitidos son: ${estadosValidos.join(", ")}`,
      });
    }

    // Validar presentación
    const presentacionesValidas = [
      "Comprimidos",
      "Jarabe",
      "Gotas",
      "Cápsulas",
      "Crema",
      "Inyectable",
      "Otros",
    ];
    if (!presentacionesValidas.includes(presentacion)) {
      return res.status(400).json({
        error: `Presentación inválida. Las presentaciones permitidas son: ${presentacionesValidas.join(", ")}`,
      });
    }

    // Validaciones básicas de formato
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]{1,60}$/.test(nombreDelMedicamento)) {
      return res.status(400).json({
        error: "El nombre del medicamento debe tener solo letras, números o espacios y no superar los 60 caracteres",
      });
    }

    if (isNaN(cantidad) || cantidad < 1 || cantidad > 2) {
      return res.status(400).json({
        error: "La cantidad debe ser un número válido entre 1 y 2",
      });
    }

    if (!/^[0-9]{7,9}$/.test(numeroDeDocumento)) {
      return res.status(400).json({
        error: "El número de documento debe tener entre 7 y 9 dígitos",
      });
    }

    // Validación de fecha
    const fecha = new Date(fechaDeEmision);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    // No permitir fechas anteriores al día actual
    if (fecha < hoy) {
      return res.status(400).json({
        error: "No se pueden crear recetas con fecha anterior al día actual",
      });
    }

    // Debe estar dentro del mes actual o el siguiente
    const inicioMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const finMesSiguiente = new Date(hoy.getFullYear(), hoy.getMonth() + 2, 0);

    if (fecha < inicioMesActual || fecha > finMesSiguiente) {
      return res.status(400).json({
        error: "La fecha de emisión debe estar dentro del mes actual o el siguiente",
      });
    }

    // Validar longitud de observaciones
    if (observaciones && observaciones.length > 500) {
      return res.status(400).json({
        error: "Las observaciones no pueden superar los 500 caracteres",
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
        fechaDeEmision: {
          [Op.gte]: new Date(anio, mes, 1),
          [Op.lte]: new Date(anio, mes + 1, 0),
        },
      },
    });
    const totalCantidad = recetasMes.reduce((acc, r) => acc + parseInt(r.cantidad), 0);
    if (totalCantidad + parseInt(cantidad) > 2) {
      return res.status(400).json({
        error: `Este paciente ya tiene ${totalCantidad} unidades en el mes seleccionado. No puede superar 2 unidades.`,
      });
    }

    // Límite de 30 recetas diferentes por mes
    if (recetasMes.length >= 30) {
      return res.status(400).json({
        error: "Se ha alcanzado el límite de 30 recetas diferentes por mes para este paciente",
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

// Buscar recetas por nombre
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

// Actualizar receta (con todas las validaciones)
const updateRecipe = async (req, res) => {
  try {
    const receta = await Recipe.findByPk(req.params.id);
    if (!receta) return res.status(404).json({ error: "Receta no encontrada" });

    const data = req.body;

    // Validaciones si se modifican campos
    if (
      data.nombreDelMedicamento === "" ||
      data.presentacion === "" ||
      data.paciente === "" ||
      data.numeroDeDocumento === "" ||
      data.fechaDeEmision === "" ||
      data.cantidad === "" ||
      data.estado === ""
    ) {
      return res.status(400).json({ error: "No se puede dejar un campo obligatorio vacío" });
    }

    // Validar paciente si se cambia
    if (data.paciente) {
      const afiliadoExiste = await Affiliate.findOne({
        where: { numeroDeDocumento: data.paciente },
      });
      if (!afiliadoExiste) {
        return res.status(404).json({
          error: "El paciente no está registrado en el sistema",
        });
      }
    }

    // Documento debe coincidir
    if (data.numeroDeDocumento && data.paciente && data.numeroDeDocumento !== data.paciente) {
      return res.status(400).json({
        error: "El número de documento debe coincidir con el paciente seleccionado",
      });
    }

    // Estado válido
    if (data.estado) {
      const estadosValidos = ["Pendiente", "Aprobada", "Rechazada", "Entregada"];
      if (!estadosValidos.includes(data.estado)) {
        return res.status(400).json({
          error: `Estado inválido. Los estados permitidos son: ${estadosValidos.join(", ")}`,
        });
      }
    }

    // Presentación válida
    if (data.presentacion) {
      const presentacionesValidas = [
        "Comprimidos",
        "Jarabe",
        "Gotas",
        "Cápsulas",
        "Crema",
        "Inyectable",
        "Otros",
      ];
      if (!presentacionesValidas.includes(data.presentacion)) {
        return res.status(400).json({
          error: `Presentación inválida. Las presentaciones permitidas son: ${presentacionesValidas.join(", ")}`,
        });
      }
    }

    // Validaciones de formato
    if (data.nombreDelMedicamento && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]{1,60}$/.test(data.nombreDelMedicamento)) {
      return res.status(400).json({
        error: "El nombre del medicamento debe tener solo letras, números o espacios y no superar los 60 caracteres",
      });
    }

    if (data.cantidad && (isNaN(data.cantidad) || data.cantidad < 1 || data.cantidad > 2)) {
      return res.status(400).json({ error: "La cantidad debe ser un número válido entre 1 y 2" });
    }

    if (data.numeroDeDocumento && !/^[0-9]{7,9}$/.test(data.numeroDeDocumento)) {
      return res.status(400).json({ error: "El número de documento debe tener entre 7 y 9 dígitos" });
    }

    // Validación de fecha
    if (data.fechaDeEmision) {
      const fecha = new Date(data.fechaDeEmision);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      if (fecha < hoy) {
        return res.status(400).json({
          error: "No se pueden crear recetas con fecha anterior al día actual",
        });
      }

      const inicioMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
      const finMesSiguiente = new Date(hoy.getFullYear(), hoy.getMonth() + 2, 0);
      if (fecha < inicioMesActual || fecha > finMesSiguiente) {
        return res.status(400).json({
          error: "La fecha de emisión debe estar dentro del mes actual o el siguiente",
        });
      }

      // Evitar duplicadas
      const mes = fecha.getMonth();
      const anio = fecha.getFullYear();
      const recetasIdenticasMes = await Recipe.findAll({
        where: {
          paciente: data.paciente || receta.paciente,
          nombreDelMedicamento: data.nombreDelMedicamento || receta.nombreDelMedicamento,
          fechaDeEmision: {
            [Op.gte]: new Date(anio, mes, 1),
            [Op.lte]: new Date(anio, mes + 1, 0),
          },
          id: { [Op.ne]: receta.id },
        },
      });
      if (recetasIdenticasMes.length > 0) {
        return res.status(400).json({
          error: `Ya existe una receta para "${data.nombreDelMedicamento || receta.nombreDelMedicamento}" en el mes seleccionado.`,
        });
      }

      // Límite de unidades
      const recetasMes = await Recipe.findAll({
        where: {
          paciente: data.paciente || receta.paciente,
          fechaDeEmision: {
            [Op.gte]: new Date(anio, mes, 1),
            [Op.lte]: new Date(anio, mes + 1, 0),
          },
          id: { [Op.ne]: receta.id },
        },
      });
      const totalCantidad = recetasMes.reduce((acc, r) => acc + parseInt(r.cantidad), 0);
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

    // Validar longitud de observaciones
    if (data.observaciones && data.observaciones.length > 500) {
      return res.status(400).json({
        error: "Las observaciones no pueden superar los 500 caracteres",
      });
    }

    // Actualizar
    const recetaModificada = await receta.update(data);
    res.status(200).json(recetaModificada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🟢 Eliminar receta
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
  getRecipeById,
  getRecipesByName,
  updateRecipe,
  deleteRecipe,
};
