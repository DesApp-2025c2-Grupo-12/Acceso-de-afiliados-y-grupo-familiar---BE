const { Provider } = require("../db/models");

// Crear un prestador
const createProvider = async (req, res) => {
    try {
        // Validación de campos obligatorios
        const {
            numeroDeCuit_Cuil,
            nombreCompleto,
            especialidad,
            esCentroOIndep,
            integraCentro,
            telefono,
            correoElectronico,
            direccion,
            horarioDeAtencion
        } = req.body;

        if (
            !numeroDeCuit_Cuil ||
            !nombreCompleto ||
            !especialidad ||
            !esCentroOIndep||
            !integraCentro ||
            !telefono || 
            !correoElectronico || 
            !direccion || 
            !horarioDeAtencion 
        ) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        // Crear prestador
        const nuevoPrestador = await Provider.create(req.body);
        res.status(201).json(nuevoPrestador);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los prestadores
const getProviders = async (req, res) => {
    try {
        const prestadores = await Provider.findAll();
        res.status(200).json(prestadores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener prestador por ID
const getProviderById = async (req, res) => {
    try {
        const id = req.params.id;
        const prestadorPorId = await Provider.findByPk(id);
        if (!prestadorPorId) {
            return res.status(404).json({ error: "Prestador no encontrado" });
        }
        res.status(200).json(prestadorPorId);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// actualizar un prestador
const updateProvider = async (req, res) => {
    try {
        const id = req.params.id;
        const prestadorAModificar = await Provider.findByPk(id);
        if (!prestadorAModificar) {
            return res.status(404).json({ error: "Prestador no encontrado" });
        }
        const prestadorModificado = await prestadorAModificar.update(req.body);
        res.status(200).json(prestadorModificado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un prestador
const deleteProvider = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Provider.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ error: "Prestador no encontrado" });
        }
        res.status(200).json({ message: "Prestador eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createProvider,
    getProviders,
    getProviderById,
    updateProvider,
    deleteProvider
}