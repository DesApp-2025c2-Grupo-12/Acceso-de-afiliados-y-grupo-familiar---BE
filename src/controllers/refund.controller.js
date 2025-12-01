const { Refund } = require("../db/models");
const { Affiliate } = require("../db/models");
const { Op } = require('sequelize');

// Crear un reintegro
const createRefund = async (req, res) => {
    try {
        const {
            fechaDePrestacion,
            nombreDelAfiliado,
            nombreDelMedico,
            especialidad,
            lugarDeAtencion,
            facturacion_Fecha,
            facturacion_Cuit,
            facturacion_ValorTotal,
            facturacion_NombreDePersonaACobrar,
            formaDePago,
            cbu
        } = req.body;

        if (
            !fechaDePrestacion ||
            !nombreDelAfiliado ||
            !nombreDelMedico ||
            !especialidad ||
            !lugarDeAtencion ||
            !facturacion_Fecha ||
            !facturacion_Cuit ||
            !facturacion_ValorTotal ||
            !facturacion_NombreDePersonaACobrar ||
            !formaDePago ||
            !cbu
        ) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        // Crear reintegro
        const nuevoReintegro = await Refund.create(req.body);
        console.log("Datos GUARDADOS en BD:", nuevoReintegro.toJSON());
        res.status(201).json(nuevoReintegro);
    } catch (error) {
        console.error("❌ Error en createRefund:", error);
        res.status(500).json({ error: error.message });
    }
};

// obtener todos los reintegros
const getRefunds = async (req, res) => {
    try {
        const reintegros = await Refund.findAll();
        res.status(200).json(reintegros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// obtener un reintegro por id
const getRefundById = async (req, res) => {
    try {
        const id = req.params.id;
        const reintegroPorId = await Refund.findByPk(id);
        if (!reintegroPorId) {
            return res.status(404).json({ error: "Reintegro no encontrado" });
        }
        res.status(200).json(reintegroPorId);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// actualizar un reintegro
const updateRefund = async (req, res) => {
    try {
        const id = req.params.id;
        const reintegroAModificar = await Refund.findByPk(id);
        if (!reintegroAModificar) {
            return res.status(404).json({ error: "Reintegro no encontrado" });
        }
        const reintegroModificado = await reintegroAModificar.update(req.body);
        res.status(200).json(reintegroModificado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// eliminar un reintegro
const deleteRefund = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Refund.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ error: "Reintegro no encontrado" });
        }
        res.status(200).json({ message: "Reintegro eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getRefundsFromAffiliate = async (req, res) => {
    try {
        const affiliateId = req.params.affiliateId
        const affiliate = await Affiliate.findByPk(affiliateId)

        //validacion id afiliado
        if (!affiliateId) {
            return res.status(400).json({ error: "ID de afiliado requerido" });
        }

        //validacion existencia afiliado
        if (!affiliate) {
            return res.status(404).json({ error: "Afiliado no encontrado" })
        }

        const refundsFromAffiliate = await Refund.findAll({
            where: {
                affiliateId: affiliateId
            }
        })

        res.status(200).json(refundsFromAffiliate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getRefundsFromChildren = async (req, res) => {
    try {
        const affiliateId = req.params.affiliateId
        const affiliate = await Affiliate.findByPk(affiliateId)
        //validacion id afiliado
        if (!affiliateId) {
            return res.status(400).json({ error: "ID de afiliado requerido" });
        }

        //validacion existencia afiliado
        if (!affiliate) {
            return res.status(404).json({ error: "Afiliado no encontrado" })
        }

        let hijos;

        if (affiliate.parentesco === 'TITULAR') {
            hijos = await Affiliate.findAll({
                where: {
                    titularId: affiliate.id,
                    parentesco: 'HIJO'
                }
            });
        } else if (affiliate.parentesco === 'CONYUGE') {
            hijos = await Affiliate.findAll({
                where: {
                    titularId: affiliate.titularId,
                    parentesco: 'HIJO'
                }
            });
        } else {
            hijos = [];
        }

        const idsHijos = hijos.map(h => h.id)

        const refundFromChildren = await Refund.findAll({
            where: {
                affiliateId: { [Op.in]: idsHijos }
            }

        })

        res.status(200).json(refundFromChildren);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createRefund,
    getRefunds,
    getRefundById,
    updateRefund,
    deleteRefund,
    getRefundsFromAffiliate,
    getRefundsFromChildren
}