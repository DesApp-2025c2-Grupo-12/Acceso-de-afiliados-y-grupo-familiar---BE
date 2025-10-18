const { Router } = require("express");
const router = Router();
const AppointmentScheduleControllers = require("../controllers/appointmentSchedule.controller");

router.get("/", AppointmentScheduleControllers.getAppointmentsSchedules);
router.get("/:id", AppointmentScheduleControllers.getAppointmentScheduleById);
router.post("/", AppointmentScheduleControllers.createAppointmentSchedule);
router.put("/:id", AppointmentScheduleControllers.updateAppointmentSchedule);
router.delete("/:id", AppointmentScheduleControllers.deleteAppointmentSchedule);

module.exports = router;