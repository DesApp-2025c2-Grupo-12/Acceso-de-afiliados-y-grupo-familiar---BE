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

    // Validación campos obligatorios
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

    // Validaciones
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]{1,60}$/.test(nombreDelMedicamento)) {
      return res.status(400).json({
        error: "El nombre del medicamento debe tener solo letras, números o espacios y no superar los 60 caracteres",
      });
    }

    if (isNaN(cantidad) || cantidad < 1 || cantidad > 2) {
      return res.status(400).json({ error: "La cantidad debe ser un número válido entre 1 y 2" });
    }

    if (!/^[0-9]{7,9}$/.test(numeroDeDocumento)) {
      return res.status(400).json({ error: "El número de documento debe tener entre 7 y 9 dígitos" });
    }

    // Validación de fecha
    const fecha = new Date(fechaDeEmision);
    const hoy = new Date();
    const inicioMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const finMesSiguiente = new Date(hoy.getFullYear(), hoy.getMonth() + 2, 0);

    if (fecha < inicioMesActual || fecha > finMesSiguiente) {
      return res.status(400).json({
        error: "La fecha de emisión debe estar dentro del mes actual o el siguiente"
      });
    }

    // Validación límite de 2 recetas por paciente por mes
    const mes = fecha.getMonth();        
    const anio = fecha.getFullYear();

    const recetasMes = await Recipe.findAll({
      where: {
        paciente,
        fechaDeEmision: {
          [Op.gte]: new Date(anio, mes, 1),
          [Op.lte]: new Date(anio, mes + 1, 0)
        }
      }
    });

const totalCantidad = recetasMes.reduce((acc, r) => acc + r.cantidad, 0);
if (totalCantidad + cantidad > 2) {
  return res.status(400).json({
    error: "Este paciente ya alcanzó el límite de 2 unidades en el mes seleccionado"
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
    if (!receta) return res.status(404).json({ error: "Receta no encontrada" });

    const data = req.body;

    if (data.nombreDelMedicamento && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]{1,60}$/.test(data.nombreDelMedicamento)) {
      return res.status(400).json({ error: "El nombre del medicamento debe tener solo letras, números o espacios y no superar los 60 caracteres" });
    }

    if (data.numeroDeDocumento && !/^[0-9]{7,9}$/.test(data.numeroDeDocumento)) {
      return res.status(400).json({ error: "El número de documento debe tener entre 7 y 9 dígitos" });
    }

    if (data.fechaDeEmision) {
      const fecha = new Date(data.fechaDeEmision);
      const hoy = new Date();
      const inicioMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
      const finMesSiguiente = new Date(hoy.getFullYear(), hoy.getMonth() + 2, 0);

      if (fecha < inicioMesActual || fecha > finMesSiguiente) {
        return res.status(400).json({ error: "La fecha de emisión debe estar dentro del mes actual o el siguiente" });
      }

      // Validación límite de 2 recetas por paciente por mes (excepto esta receta) 
      const mes = fecha.getMonth();
      const anio = fecha.getFullYear();
      const recetasMes = await Recipe.findAll({
        where: {
          paciente: receta.paciente,
          fechaDeEmision: {
            [Op.gte]: new Date(anio, mes, 1),
            [Op.lte]: new Date(anio, mes + 1, 0)
          },
          id: { [Op.ne]: receta.id }
        }
      });

      if (recetasMes.length >= 2) {
        return res.status(400).json({
          error: "Este paciente ya tiene 2 recetas en el mes seleccionado"
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
  getRecipeById
};
