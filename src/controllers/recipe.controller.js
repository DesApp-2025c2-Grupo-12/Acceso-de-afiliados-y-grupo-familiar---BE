const { Recipe } = require("../db/models");
const { Op } = require("sequelize");
const { validateRecipeData } = require("../db/utils/validations/recipeValidation");

// Crear receta
const createRecipe = async (req, res) => {
  try {
    const data = req.body;

    const hoy = new Date();
    const fechaHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

    // Validar datos antes de crear
    await validateRecipeData(data);

    const nuevaReceta = await Recipe.create({
      ...data,
      fechaDeEmision: fechaHoy,
      estado: data.estado || "Recibido",
    });

    res.status(201).json(nuevaReceta);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

// Buscar recetas por nombre de medicamento
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
    if (!receta) return res.status(404).json({ error: "Receta no encontrada" });

    // Validar datos antes de actualizar
    await validateRecipeData(req.body, true, receta.id);

    const recetaModificada = await receta.update(req.body);
    res.status(200).json(recetaModificada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar receta
const deleteRecipe = async (req, res) => {
  try {
    const receta = await Recipe.findByPk(req.params.id);
    if (!receta) return res.status(404).json({ error: "Receta no encontrada" });

    if (receta.estado === "Aprobado") {
      return res.status(400).json({ error: "No se puede eliminar una receta aprobada" });
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
