const { where } = require("sequelize");
const { Appointment } = require("../db/models");
const { Affiliate } = require("../db/models/");


// crear un turno médico
const createAppointment = async (req, res) => {
    try {
        // Validación de campos obligatorios
        const {
            nombreDelPrestador,
            lugarDeAtencion,
            especialidad,
            horario,
            fecha,
        } = req.body;

        if (
            !nombreDelPrestador ||
            !lugarDeAtencion ||
            !especialidad ||
            !horario ||
            !fecha
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
//obtenes todos los turnos de un afiliado en especifico

const apointmentsFromAffiliate = async (req, res) => {
    try {
        const idAfilliate = req.params.id;
        const affiliateExists = await Affiliate.findByPk(idAfilliate);
        if (!affiliateExists) {
            return res.status(404).json({ error: "Afiliado no encontrado" })
        }
        const afilliatedAppointments = await Appointment.findAll(
            { where: { AffiliateId: idAfilliate } }
        );
        if (afilliatedAppointments.length === 0) {
            return res.status(404).json({ error: "Afiliado no tiene turnos" })
        }
        res.status(200).json(afilliatedAppointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//obtener todos los turnos sin reservar por ningun afiliado 
const unreservedAppointments = async (req, res) => {
    try {

        const unreserved = await Appointment.findAll({
            where: { affiliateId: null }
        });

        if (unreserved.length === 0) {
            return res.status(404).json({ error: "No hay turnos que no hayan sido reservados" });
        }

        res.status(200).json(unreserved);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const especialidadesDisponibles = async (req, res) => {
    try {
        const turnosMedicos = await Appointment.findAll();

        const especialidades = [...new Set(turnosMedicos.map(turno => turno.especialidad))];

        res.status(200).json(especialidades);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    apointmentsFromAffiliate,
    unreservedAppointments,
    especialidadesDisponibles
}