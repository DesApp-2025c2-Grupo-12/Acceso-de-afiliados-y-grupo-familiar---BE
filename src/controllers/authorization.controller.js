const { Authorization } = require("../db/models");

// Crear una autorización
const createAuthorization = async (req, res) => {
    try {
        const {
            fechaDePrestacion,
            nombreDelAfiliado,
            nombreDelMedico,
            especialidad,
            lugarDePrestacion,
            diasDeInternacion,
            observaciones
        } = req.body;
        // Validación de campos obligatorios
        if (
            !fechaDePrestacion ||
            !nombreDelAfiliado ||
            !nombreDelMedico ||
            !especialidad ||
            !lugarDePrestacion ||
            diasDeInternacion === undefined || diasDeInternacion === null
        ) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        // Crear autorización con estado inicial
        const nuevaAutorizacion = await Authorization.create({
            fechaDePrestacion,
            nombreDelAfiliado,
            nombreDelMedico,
            especialidad,
            lugarDePrestacion,
            diasDeInternacion,
            estado: "Pendiente", // por defecto
            observaciones,
        });

        res.status(201).json(nuevaAutorizacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las autorizaciones
const getAuthorizations = async (req, res) => {
    try {
        const autorizaciones = await Authorization.findAll(
            {order: [["createdAt", "DESC"]],} //esto es para el orden de visualización.
        );
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