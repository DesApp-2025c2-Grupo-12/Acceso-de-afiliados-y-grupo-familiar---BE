const db = require("../db/models");
const { Op } = require("sequelize");

const Appointment = db.Appointment;
const Recipe = db.Recipe;
const Refund = db.Refund;
const Authorization = db.Authorization;

const getDashboardResumen = async (req, res) => {
  try {
    const { affiliateId } = req.params;
    if (!affiliateId) {
      return res.status(400).json({ error: "affiliateId requerido en params" });
    }

    // fecha de hoy en formato YYYY-MM-DD para comparaciones con DATEONLY
    const hoy = new Date().toISOString().slice(0, 10);

    // 1) Turnos "pendientes": los que tienen fecha >= hoy
    // (porque tu modelo Appointment no tiene campo 'estado')
    const turnosPendientes = await Appointment.count({
      where: {
        affiliateId,
        fecha: { [Op.gte]: hoy }
      }
    });

    // 2) Recetas aprobadas (tu modelo Recipe tiene campo 'estado' con valor "Aprobado")
    const recetasAprobadas = await Recipe.count({
      where: {
        affiliateId,
        estado: "Aprobado"
      }
    });

    // 3) Reintegros: tu modelo Refund NO tiene 'estado' definido.
    // Por ahora contamos TODOS los reintegros del afiliado.
    // Si querés filtrar por estado, necesitás agregar esa columna en la BD.
    const reintegrosAprobados = await Refund.count({
      where: {
        affiliateId
      }
    });

    // 4) Autorizaciones aprobadas (Authorization tiene 'estado' con "Aprobada")
    const autorizacionesAprobadas = await Authorization.count({
      where: {
        affiliateId,
        estado: "Aprobada"
      }
    });

    return res.json({
      turnosPendientes,
      recetasAprobadas,
      reintegrosAprobados,
      autorizacionesAprobadas
    });
  } catch (error) {
    console.error("Error en getDashboardResumen:", error);
    return res.status(500).json({ error: "Error obteniendo datos del dashboard" });
  }
};

module.exports = { getDashboardResumen };
