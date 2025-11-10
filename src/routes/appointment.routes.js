const { Router } = require("express");
const router = Router();
const AppointmentControllers = require("../controllers/appointment.controller");
const validateIds = require('../middlewares/validateIds')
const validateAppointmentOperations = require('../middlewares/appointmentMiddleware');

router.get("/", AppointmentControllers.getAppointments);
router.get("/unreserved-appointments/",AppointmentControllers.unreservedAppointments);
router.get("/especialidades/",AppointmentControllers.especialidadesDisponibles);
router.get("/:id/turnosHijos",validateIds,AppointmentControllers.turnosFuturosHijos);
router.get("/:id", validateIds,AppointmentControllers.getAppointmentById);
router.get("/turnosFuturos/:id",validateIds,AppointmentControllers.turnosFuturosDeAfiliado);
router.get("/affiliated-appointments/:id",validateIds,AppointmentControllers.apointmentsFromAffiliate);
router.post("/", AppointmentControllers.createAppointment);
router.put('/:turnoId/cancel',validateIds,validateAppointmentOperations, AppointmentControllers.cancelarTurno);
router.put('/:turnoId/assign/:affiliateId',validateIds,validateAppointmentOperations, AppointmentControllers.asignarTurnoAAfiliado);
router.put("/:id",validateIds, AppointmentControllers.updateAppointment);
router.delete("/:id",validateIds, AppointmentControllers.deleteAppointment);

module.exports = router;