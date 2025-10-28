const { Recipe } = require("../db/models");
const { Op } = require("sequelize");
const { validateRecipeData } = require("../db/utils/validations/recipeValidation");

// Crear receta
const createRecipe = async (req, res) => {
  try {
    const data = req.body;
    await validateRecipeData(data);

    const hoy = new Date();
    const fechaHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

    const nuevaReceta = await Recipe.create({
      ...data,
      fechaDeEmision: fechaHoy,
    });

    res.status(201).json(nuevaReceta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las recetas (solo para prueba)
const getRecipes = async (req, res) => {
  try {
    const recetas = await Recipe.findAll();
    res.status(200).json(recetas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener receta por ID (solo para prueba)
const getRecipeById = async (req, res) => {
  try {
    const receta = await Recipe.findByPk(req.params.id);
    if (!receta) return res.status(404).json({ error: "Receta no encontrada" });
    res.status(200).json(receta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar por nombre de medicamento
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

// Actualizar receta (solo para prueba)
const updateRecipe = async (req, res) => {
  try {
    const receta = await Recipe.findByPk(req.params.id);
    if (!receta) return res.status(404).json({ error: "Receta no encontrada" });

    const data = req.body;
    await validateRecipeData(data, true, receta.id);

    const recetaModificada = await receta.update(data);
    res.status(200).json(recetaModificada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar receta (solo para prueba)
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
