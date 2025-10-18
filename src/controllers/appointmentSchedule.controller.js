const { AppointmentSchedule } = require("../db/models");

// crear una agenda de turnos medico
const createAppointmentSchedule = async (req, res) => {
    try {
        // Validación de campos obligatorios
        const {
            nombreDelPrestador,
            lugarDeAtencion,
            especialidad,
            horarioInicio,
            horarioFin
        } = req.body;

        if (
            !nombreDelPrestador ||
            !lugarDeAtencion ||
            !especialidad ||
            !horarioInicio ||
            !horarioFin
        ) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        // Crear agenda de turno medico
        const nuevaAgendaDeTurnoMedico = await AppointmentSchedule.create(req.body);
        res.status(201).json(nuevaAgendaDeTurnoMedico);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los turnos medicos
const getAppointmentsSchedules = async (req, res) => {
    try {
        const agendasDeturnosMedicos = await AppointmentSchedule.findAll();
        res.status(200).json(agendasDeturnosMedicos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una agenda de turno medico por ID
const getAppointmentScheduleById = async (req, res) => {
    try {
        const id = req.params.id;
        const agendaDeturnoMedicoPorId = await AppointmentSchedule.findByPk(id);
        if (!agendaDeturnoMedicoPorId) {
            return res.status(404).json({ error: "Agenda de turno no encontrada" });
        }
        res.status(200).json(agendaDeturnoMedicoPorId);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar agenda de turno medico
const updateAppointmentSchedule = async (req, res) => {
    try {
        const id = req.params.id;
        const agendaDeturnoAModificar = await AppointmentSchedule.findByPk(id);
        if (!agendaDeturnoAModificar) {
            return res.status(404).json({ error: "Agenda de turno no encontrada" });
        }
        const agendaDeturnoModificado = await agendaDeturnoAModificar.update(req.body);
        res.status(200).json(agendaDeturnoModificado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar agenda de turno medico
const deleteAppointmentSchedule = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await AppointmentSchedule.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ error: "Agenda de turno no encontrada" });
        }
        res.status(200).json({ message: "Agenda de turno eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createAppointmentSchedule,
    getAppointmentsSchedules,
    getAppointmentScheduleById,
    updateAppointmentSchedule,
    deleteAppointmentSchedule
}