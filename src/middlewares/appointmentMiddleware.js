const { Appointment, Affiliate } = require("../db/models");
const { Op } = require("sequelize");

const validateAppointmentOperations = async (req, res, next) => {
    try {
        //  VALIDACIONES PARA ASIGNAR TURNO
        
        if (req.method === 'PUT' && req.params.turnoId && req.params.affiliateId) {
            const afiliado = req.params.affiliateId;
            const turnoID = req.params.turnoId;
            
            console.log("🔍 Validando ASIGNACIÓN de turno:", turnoID, "afiliado:", afiliado);
            
            // validacion existencia del turno
            const turno = await Appointment.findByPk(turnoID);
            if (!turno) {
                return res.status(404).json({ error: "Turno no encontrado" });
            }
            
            // validacion de que el turno no estuviera reservado
            if (turno.affiliateId !== null) {
                return res.status(400).json({ error: "El turno ya está reservado" });
            }
            
            // validacion existencia del afiliado
            const afiliadoExiste = await Affiliate.findByPk(afiliado);
            if (!afiliadoExiste) {
                return res.status(404).json({ error: "Afiliado no encontrado" });
            }

            // validacion que el afiliado no tenga un turno mismo dia o mismo horario.
            const turnoExistente = await Appointment.findOne({
                where: {
                    affiliateId: afiliado,
                    fecha: turno.fecha,
                    horario: turno.horario,
                    id: { [Op.ne]: turnoID }
                }
            });

            if (turnoExistente) {
                return res.status(400).json({
                    error: "El afiliado ya tiene un turno asignado para esta fecha y hora"
                });
            }
        }

        //  VALIDACIONES PARA CANCELAR TURNO  
       
        if (req.method === 'PUT' && req.params.turnoId && req.body.affiliateId === null) {
            const turnoId = req.params.turnoId;
            
            console.log("🔍 Validando CANCELACIÓN de turno:", turnoId);
            
            const turno = await Appointment.findByPk(turnoId);
            
            // validacion de existencia del turno
            if (!turno) {
                return res.status(404).json({ error: "Turno no encontrado" });
            }
            
            // validacion que el turno este reservado
            if (turno.affiliateId === null) {
                return res.status(400).json({ error: "El turno no está reservado" });
            }
            
            // validacion que no se pueda cancelar el turno con menos de 24 hs de antelacion
            const fechaActual = new Date();
            const fechaTurno = new Date(`${turno.fecha}T${turno.horario}`);
            const diferencia24hs = 24 * 60 * 60 * 1000;

            if ((fechaTurno - fechaActual) < diferencia24hs) {
                return res.status(400).json({
                    error: "No se puede cancelar el turno con menos de 24 horas de anticipación"
                });
            }
        }

        console.log("✅ Validaciones pasadas - continuando al controller");
        next();
    } catch (error) {
        console.error("❌ Error en validaciones:", error.message);
        return res.status(400).json({ error: error.message });
    }
};

module.exports = validateAppointmentOperations;