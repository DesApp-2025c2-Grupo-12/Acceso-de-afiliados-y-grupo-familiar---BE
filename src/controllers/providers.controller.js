const { Op } = require("sequelize");
const { Provider } = require("../db/models");
const {
  validateProviderBody,
  validateProviderQuery,
} = require("../db/utils/validations/providerValidation");

// Crear un prestador
const createProvider = async (req, res) => {
  try {
    const errores = validateProviderBody(req.body);
    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    const nuevoPrestador = await Provider.create(req.body);
    res.status(201).json(nuevoPrestador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los prestadores (con filtros)
const getProviders = async (req, res) => {
  try {
    const errores = validateProviderQuery(req.query);
    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    const { nombre, especialidad, location, zona } = req.query;
    const where = {};

    if (nombre) where.nombreCompleto = { [Op.iLike]: `%${nombre}%` };
    if (especialidad) where.especialidad = especialidad;
    if (location) where.direccion = { [Op.iLike]: `%${location}%` };
    if (zona) {
      where.integraCentro = zona;
      where.esCentro = true;
    }

    const prestadores = await Provider.findAll({ where });
    res.status(200).json(prestadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener prestador por ID
const getProviderById = async (req, res) => {
  try {
    const { id } = req.params;
    const prestador = await Provider.findByPk(id);

    if (!prestador) {
      return res.status(404).json({ error: "Prestador no encontrado" });
    }

    res.status(200).json(prestador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un prestador
const updateProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const prestador = await Provider.findByPk(id);

    if (!prestador) {
      return res.status(404).json({ error: "Prestador no encontrado" });
    }

    const errores = validateProviderBody(req.body);
    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    const actualizado = await prestador.update(req.body);
    res.status(200).json(actualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un prestador
const deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;
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
  deleteProvider,
};
