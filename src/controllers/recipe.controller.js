const { Recipe, Affiliate } = require("../db/models");
const { Op } = require("sequelize");
const { validateRecipeData } = require("../db/utils/validations/recipeValidation");
const affiliate = require("../db/models/affiliate");

// Crear receta
const createRecipe = async (req, res) => {
  try {
    await validateRecipeData(req.body);

    const hoy = new Date();
    const fechaHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

    const nuevaReceta = await Recipe.create({
      ...req.body,
      fechaDeEmision: fechaHoy,
      estado: req.body.estado || 'Recibido'
    });

    res.status(201).json(nuevaReceta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las recetas
const getRecipes = async (req, res) => {
  try {
    const recetas = await Recipe.findAll({
      include: { model: Affiliate, as: 'afiliado' } // <-- Incluye info del afiliado
    });
    res.status(200).json(recetas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener receta por ID
const getRecipeById = async (req, res) => {
  try {
    const receta = await Recipe.findByPk(req.params.id, {
      include: { model: Affiliate, as: 'afiliado' } // <-- Incluye info del afiliado
    });
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
      include: { model: Affiliate, as: 'afiliado' } // <-- Incluye info del afiliado
    });
    res.status(200).json(recetas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipeFromAffiliate = async (req, res) => {
  try {
    const affiliateId = req.params.affiliateId
    const affiliate = await Affiliate.findByPk(affiliateId)

    //validacion id afiliado
    if (!affiliateId) {
      return res.status(400).json({ error: "ID de afiliado requerido" });
    }

    //validacion existencia afiliado
    if (!affiliate) {
      return res.status(404).json({ error: "Afiliado no encontrado" })
    }
    const recipesFromAffiliate = await Recipe.findAll({
      where: { affiliateId: affiliateId },
      include: { model: Affiliate, as: 'afiliado' }
    })

    res.status(200).json(recipesFromAffiliate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getChildrensRecipes = async (req, res) => {

  try {
    const affiliateId = req.params.affiliateId
    const affiliate = await Affiliate.findByPk(affiliateId)
    //validacion id afiliado
    if (!affiliateId) {
      return res.status(400).json({ error: "ID de afiliado requerido" });
    }

    //validacion existencia afiliado
    if (!affiliate) {
      return res.status(404).json({ error: "Afiliado no encontrado" })
    }

    let hijos;

    if (affiliate.parentesco === 'TITULAR') {
      hijos = await Affiliate.findAll({
        where: {
          titularId: affiliate.id,
          parentesco: 'HIJO'
        }
      });
    } else if (affiliate.parentesco === 'CONYUGE') {
      hijos = await Affiliate.findAll({
        where: {
          titularId: affiliate.titularId,
          parentesco: 'HIJO'
        }
      });
    } else {
      hijos = [];
    }

    const idsHijos = hijos.map(h => h.id)

    const recipesFromChildren = await Recipe.findAll({
      where: {
        affiliateId: { [Op.in]: idsHijos }
      },
      include: { model: Affiliate, as: 'afiliado' }
    })

    res.status(200).json(recipesFromChildren);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}


// Actualizar receta
const updateRecipe = async (req, res) => {
  try {
    const receta = await Recipe.findByPk(req.params.id);
    if (!receta) return res.status(404).json({ error: "Receta no encontrada" });

    await validateRecipeData(req.body, true, receta.id);

    let datos = { ...req.body };

    // Si el estado pasa a "Aprobado", guardar la fecha de aprobación
    if (req.body.estado === "Aprobado" && receta.estado !== "Aprobado") {
      const hoy = new Date();
      datos.fechaDeAprobacion = new Date(
        hoy.getFullYear(),
        hoy.getMonth(),
        hoy.getDate()
      );
    }

  

    const recetaModificada = await receta.update(datos);
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
  getRecipeFromAffiliate,
  getChildrensRecipes
};
