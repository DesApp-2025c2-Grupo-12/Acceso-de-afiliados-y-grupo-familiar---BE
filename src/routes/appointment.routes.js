const { Router } = require("express");
const router = Router();
const AppointmentControllers = require("../controllers/appointment.controller");

router.get("/", AppointmentControllers.getAppointments);
router.get("/:id", AppointmentControllers.getAppointmentById);
router.post("/", AppointmentControllers.createAppointment);
router.put("/:id", AppointmentControllers.updateAppointment);
router.delete("/:id", AppointmentControllers.deleteAppointment);

module.exports = router;