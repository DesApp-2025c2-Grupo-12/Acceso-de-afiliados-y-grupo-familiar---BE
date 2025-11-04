const { Router } = require("express");
const router = Router();
const AppointmentControllers = require("../controllers/appointment.controller");

router.get("/", AppointmentControllers.getAppointments);
router.get("/unreserved-appointments/",AppointmentControllers.unreservedAppointments)
router.get("/especialidades/",AppointmentControllers.especialidadesDisponibles)
router.get("/:id", AppointmentControllers.getAppointmentById);
router.get("/turnosFuturos/:id",AppointmentControllers.turnosFuturosDeAfiliado)
router.get("/affiliated-appointments/:id",AppointmentControllers.apointmentsFromAffiliate)
router.post("/", AppointmentControllers.createAppointment);
router.put("/:id", AppointmentControllers.updateAppointment);
router.delete("/:id", AppointmentControllers.deleteAppointment);

module.exports = router;