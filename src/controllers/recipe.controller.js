const { Recipe } = require("../db/models");

// CREAR RECETA
const createRecipe = async (req, res) => {
    try {
        // Validación de campos obligatorios
        const {
            nombreDelMedicamento,
            presentacion,
            paciente,
            numeroDeDocumento,
            fechaDeEmision,
            cantidad,
            estado
        } = req.body;

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

        // Crear receta
        const nuevaReceta = await Recipe.create(req.body);
        res.status(201).json(nuevaReceta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// OBTENER TODAS LAS RECETAS
const getRecipes = async (req, res) => {
    try {
        const recetas = await Recipe.findAll();
        res.status(200).json(recetas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// OBTENER RECETA POR ID
const getRecipeById = async (req, res) => {
    try {
        const id = req.params.id;
        const recetaPorId = await Recipe.findByPk(id);
        if (!recetaPorId) {
            return res.status(404).json({ error: "Receta no encontrada" });
        }
        res.status(200).json(recetaPorId);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ACTUALIZAR RECETA
const updateRecipe = async (req, res) => {
    try {
        const id = req.params.id;
        const recetaAModificar = await Recipe.findByPk(id);
        if (!recetaAModificar) {
            return res.status(404).json({ error: "Receta no encontrada" });
        }
        const recetaModificada = await recetaAModificar.update(req.body);
        res.status(200).json(recetaModificada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ELIMINAR RECETA
const deleteRecipe = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Recipe.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ error: "Receta no encontrada" });
        }
        res.status(200).json({ message: "Receta eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRecipe,
    getRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe
};

