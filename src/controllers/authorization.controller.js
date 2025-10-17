const { Authorization } = require("../db/models");

// Creación de una autorización
const createAuthorization = async (req, res) => {
    try {
        // Validación de campos obligatorios
        const {
            fechaDePrestacion,
            nombreDelAfiliado,
            nombreDelMedico,
            especialidad,
            lugarDePrestacion,
            diasDeInternacion
        } = req.body;

        if (
            !fechaDePrestacion ||
            !nombreDelAfiliado ||
            !nombreDelMedico ||
            !especialidad ||
            !lugarDePrestacion ||
            !diasDeInternacion 
        ) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        // Crear autorización
        const nuevaAutorizacion = await Authorization.create(req.body);
        res.status(201).json(nuevaAutorizacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las autorizaciones
const getAuthorizations = async (req, res) => {
    try {
        const autorizaciones = await Authorization.findAll();
        res.status(200).json(autorizaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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

// Actualización de una autorización
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