const { Recipe } = require("../db/models");
const recipe = require("../db/models/recipe");




const createRecipe = async (req, res) => {
    try {
        const nuevaReceta = await Recipe.create(req.body);
        res.status(201).json(nuevaReceta)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getRecipes = async (req, res) => {
    try {
        const recetas = await Recipe.findAll()
        res.status(201).json(recetas)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const getRecipeById = async (req, res) => {
    try {
        const id = req.params.id
        const recetaPorId = await Recipe.findByPk(id)
        res.status(201).json(recetaPorId)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateRecipe = async (req, res) => {
    try {
        const id = req.params.id
        const recetaAModificar = await Recipe.findByPk(id)
        const recetaModificada = await recetaAModificar.update(req.body)
        res.status(201).json(recetaModificada)

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const deleteRecipe = async (req, res) => {
    try {
        const id = req.params.id
        await Recipe.destroy(
            {
                where: { id }
            })
       
        res.status(201).json({ message: "Receta eliminada correctamente"})

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = {
    createRecipe,
    getRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe

}