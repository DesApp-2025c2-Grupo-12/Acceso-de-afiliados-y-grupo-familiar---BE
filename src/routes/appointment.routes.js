const { Router } = require("express");
const router = Router();
const AppointmentControllers = require("../controllers/appointment.controller");
const validateIds = require('../middlewares/validateIds')
const validateAppointmentOperations = require('../middlewares/appointmentMiddleware');
const { canManageFamilyMember } = require('../middlewares/affiliateMiddlewares');

router.get("/", AppointmentControllers.getAppointments);
router.get("/unreserved-appointments/",AppointmentControllers.unreservedAppointments);
router.get("/especialidades/",AppointmentControllers.especialidadesDisponibles);
router.get("/:id/turnosHijos",validateIds,AppointmentControllers.turnosFuturosHijos);
router.get("/:id", validateIds,AppointmentControllers.getAppointmentById);
router.get("/turnosFuturos/:id",validateIds,AppointmentControllers.turnosFuturosDeAfiliado);
router.get("/affiliated-appointments/:id",validateIds,AppointmentControllers.apointmentsFromAffiliate);
router.put('/:turnoId/cancel',validateIds,validateAppointmentOperations, AppointmentControllers.cancelarTurno);
router.put('/:turnoId/assign/:usuarioLogueadoId/:affiliateId', validateIds, canManageFamilyMember, validateAppointmentOperations, AppointmentControllers.asignarTurnoAAfiliado);

module.exports = router;