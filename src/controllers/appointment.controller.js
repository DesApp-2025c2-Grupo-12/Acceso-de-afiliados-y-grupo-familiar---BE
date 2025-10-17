const { Appointment } = require("../db/models");

// crear un turno médico
const createAppointment = async (req, res) => {
    try {
        // Validación de campos obligatorios
        const {
            presentacion,
            nombreDelPrestador,
            especialidad,
            fechaDeEmision,
            hora,
            lugarDeAtencion,
            estado
        } = req.body;

        if (
            !presentacion ||
            !nombreDelPrestador ||
            !especialidad ||
            !fechaDeEmision ||
            !hora ||
            !lugarDeAtencion ||
            !estado
        ) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        // Crear turno medico
        const nuevoTurnoMedico = await Appointment.create(req.body);
        res.status(201).json(nuevoTurnoMedico);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los turnos medicos
const getAppointments = async (req, res) => {
    try {
        const turnosMedicos = await Appointment.findAll();
        res.status(200).json(turnosMedicos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un turno medico por ID
const getAppointmentById = async (req, res) => {
    try {
        const id = req.params.id;
        const turnoMedicoPorId = await Appointment.findByPk(id);
        if (!turnoMedicoPorId) {
            return res.status(404).json({ error: "Turno no encontrado" });
        }
        res.status(200).json(turnoMedicoPorId);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar turno medico
const updateAppointment = async (req, res) => {
    try {
        const id = req.params.id;
        const turnoAModificar = await Appointment.findByPk(id);
        if (!turnoAModificar) {
            return res.status(404).json({ error: "Turno no encontrado" });
        }
        const turnoModificado = await turnoAModificar.update(req.body);
        res.status(200).json(turnoModificado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar turno medico
const deleteAppointment = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Appointment.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ error: "Turno no encontrado" });
        }
        res.status(200).json({ message: "Turno eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
}