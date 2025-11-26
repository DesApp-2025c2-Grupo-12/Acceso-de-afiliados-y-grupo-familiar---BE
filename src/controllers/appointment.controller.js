const { where } = require("sequelize");
const { Appointment } = require("../db/models");
const { Affiliate } = require("../db/models/");
const { Op } = require('sequelize');




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
        const fechaActual = new Date()
        const diferencia2hs = new Date(fechaActual.getTime() + (2 * 60 * 60 * 1000))
        const fechaHoy = fechaActual.toISOString().split('T')[0]
        const horaMinima = diferencia2hs.toTimeString().split(' ')[0];

        const unreserved = await Appointment.findAll({
            where: {
                affiliateId: null,
                [Op.or]: [
                    /*filtro o validacion para que el turno no tenga menos de dos horas de anticipacion.Los casos son
                     o tiene una fecha mayor a la actual o si tiene la fecha del dia presente se fija que haya
                    mas de 2 horas de diferencia entre el turno y la hora actual.*/
                    {
                        fecha: {
                            [Op.gt]: fechaHoy
                        }
                    },

                    {
                        fecha: fechaHoy,
                        horario: {
                            [Op.gte]: horaMinima
                        }
                    }
                ]
            },
            include: [{
                model: Affiliate,
                as: 'afiliado',
                attributes: ['id', 'nombre', 'apellido', 'numeroDeDocumento'],
                required: false
            }]

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

const turnosFuturosDeAfiliado = async (req, res) => {
    try {
        fechaActual = new Date()
        const turnos = await Appointment.findAll({
            where: {
                affiliateId: req.params.id,
                fecha: { [Op.gte]: new Date() }
            },

            include: [{
                model: Affiliate,
                as: 'afiliado',
                attributes: ['id', 'nombre', 'apellido', 'numeroDeDocumento'],
                required: false
            }]

        })
        res.status(200).json(turnos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const turnosFuturosHijos = async (req, res) => {
  try {
    fechaActual = new Date()
    const afiliado = await Affiliate.findOne({
      where: { id: req.params.id }
    })

    if (!afiliado) {
      return res.status(404).json({ error: 'Afiliado no encontrado' });
    }

    let hijos;
    
    if (afiliado.parentesco === 'TITULAR') {
      hijos = await Affiliate.findAll({
        where: {
          titularId: afiliado.id,
          parentesco: 'HIJO'
        }
      });
    } else if (afiliado.parentesco === 'CONYUGE') {
      hijos = await Affiliate.findAll({
        where: {
          titularId: afiliado.titularId,
          parentesco: 'HIJO'
        }
      });
    } else {
      hijos = [];
    }

    const idsHijos = hijos.map(h => h.id)

    const turnos = await Appointment.findAll({
      where: {
        affiliateId: { [Op.in]: idsHijos },
        fecha: { [Op.gte]: fechaActual }
      },
      include: [{
        model: Affiliate,
        as: 'afiliado',
        attributes: ['id', 'nombre', 'apellido', 'numeroDeDocumento'],
        required: false
      }]
    })
    
    res.status(200).json(turnos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const asignarTurnoAAfiliado = async (req, res) => {
    try {
        const afiliado = req.params.affiliateId
        const turnoID = req.params.turnoId
        const turno = await Appointment.findByPk(turnoID);

        turno.affiliateId = afiliado;
        await turno.save();

        res.status(200).json({
            message: "Turno reservado correctamente",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const cancelarTurno = async (req, res) => {
    try {
        const turnoId = req.params.turnoId;
        const turno = await Appointment.findByPk(turnoId);

        turno.affiliateId = null;
        await turno.save();

        res.status(200).json({
            message: "Turno cancelado correctamente"
        });



    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getAppointments,
    getAppointmentById,
    apointmentsFromAffiliate,
    unreservedAppointments,
    especialidadesDisponibles,
    turnosFuturosDeAfiliado,
    asignarTurnoAAfiliado,
    cancelarTurno,
    turnosFuturosHijos
}