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

  
    const hoy = new Date().toISOString().slice(0, 10);

    const turnosPendientes = await Appointment.count({
      where: {
        affiliateId,
        fecha: { [Op.gte]: hoy }
      }
    });

    const recetasAprobadas = await Recipe.count({
      where: {
        affiliateId,
        estado: "Aprobado"
      }
    });

    
    const reintegrosAprobados = await Refund.count({
      where: {
        affiliateId,
        estado: "Aprobado"
      }
    });

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
