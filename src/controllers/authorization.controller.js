const { Authorization, Affiliate } = require("../db/models");
const { Op } = require("sequelize");

const createAuthorization = async (req, res) => {
  try {
    const {
      affiliateId,
      fechaDePrestacion,
      nombreDelMedico,
      especialidad,
      lugarDePrestacion,
      diasDeInternacion,
      observaciones,
    } = req.body;

    // Validación básica
    if (
      !affiliateId ||
      !fechaDePrestacion ||
      !nombreDelMedico ||
      !especialidad ||
      !lugarDePrestacion ||
      diasDeInternacion === undefined ||
      diasDeInternacion === null
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios." });
    }

    // Buscar el afiliado por ID
    const afiliado = await Affiliate.findByPk(affiliateId);
    if (!afiliado) {
      return res.status(404).json({ error: "No se encontró el afiliado." });
    }

    // Crear la autorización con el nombre del afiliado
    const nuevaAutorizacion = await Authorization.create({
      affiliateId,
      fechaDePrestacion,
      nombreDelAfiliado: `${afiliado.nombre} ${afiliado.apellido}`,
      nombreDelMedico,
      especialidad,
      lugarDePrestacion,
      diasDeInternacion,
      observaciones,
      estado: "Pendiente",
    });

    res.status(201).json(nuevaAutorizacion);
  } catch (error) {
    console.error("Error al crear autorización:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

const getAuthorizations = async (req, res) => {
  try {
    
    const numeroDeDocumento = req.query.numeroDeDocumento;
    if (!numeroDeDocumento) return res.status(400).json({ error: "Falta el número de documento" });

    // buscamos al afiliado principal
    const afiliadoPrincipal = await Affiliate.findOne({ where: { numeroDeDocumento } });
    if (!afiliadoPrincipal) return res.status(404).json({ error: "Afiliado no encontrado" });

    let ids;
    
    if (afiliadoPrincipal.parentesco === 'TITULAR') {
      // Si es titular, buscar él y sus familiares
      const grupoFamiliar = await Affiliate.findAll({ 
        where: { titularId: afiliadoPrincipal.id } 
      });
      ids = [afiliadoPrincipal.id, ...grupoFamiliar.map(a => a.id)];
    } else {
      // Si NO es titular, buscar su titular y todos los del titular
      const titular = await Affiliate.findByPk(afiliadoPrincipal.titularId);
      const grupoFamiliar = await Affiliate.findAll({ 
        where: { titularId: afiliadoPrincipal.titularId } 
      });
      ids = [titular.id, ...grupoFamiliar.map(a => a.id)];
    }

    // traemos las autorizaciones de esos IDs
    const autorizaciones = await Authorization.findAll({
      where: { affiliateId: { [Op.in]: ids } },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(autorizaciones);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener las autorizaciones" });
  }
};

module.exports = { getAuthorizations };


// Obtener autorizacion por ID
const getAuthorizationById = async (req, res) => {
    try {
        const id = req.params.id;
        const autorizacionPorId = await Authorization.findByPk(id);
        if (!autorizacionPorId) {
            return res.status(404).json({ error: "Autorización no encontrada" });
        }
        res.status(200).json(autorizacionPorId);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualización de una autorización (ej: estado)
const updateAuthorization = async (req, res) => {
    try {
        const id = req.params.id;
        const autorizacionAModificar = await Authorization.findByPk(id);
        if (!autorizacionAModificar) {
            return res.status(404).json({ error: "Autorización no encontrada" });
        }
        const autorizacionModificada = await autorizacionAModificar.update(req.body);
        res.status(200).json(autorizacionModificada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminación de una autorización
const deleteAuthorization = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Authorization.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ error: "Autorización no encontrada" });
        }
        res.status(200).json({ message: "Autorización eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createAuthorization,
    getAuthorizations,
    getAuthorizationById,
    updateAuthorization,
    deleteAuthorization
}