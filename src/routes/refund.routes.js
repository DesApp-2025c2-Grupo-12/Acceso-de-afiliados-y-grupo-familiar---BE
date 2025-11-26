const { Router } = require("express");
const router = Router();
const RefundControllers = require("../controllers/refund.controller");
const { validateRefundSchema,
    validateRefundQuerySchema,
    defaultRefundValues,
    billingConsistency,
    normalizeRefund } = require("../middlewares/refundMiddleware")
const validateIds = require('../middlewares/validateIds')
const { canManageFamilyMember } = require('../middlewares/affiliateMiddlewares');

router.get("/",
    validateRefundQuerySchema,
    RefundControllers.getRefunds);

router.get("/:id", validateIds, RefundControllers.getRefundById);

router.post("/",
    billingConsistency,
    validateRefundSchema,
    defaultRefundValues,
    normalizeRefund,
    canManageFamilyMember,
    RefundControllers.createRefund);

router.put("/:id",
    validateIds,
    billingConsistency,
    validateRefundSchema,
    normalizeRefund,
    RefundControllers.updateRefund);

router.delete("/:id", RefundControllers.deleteRefund);

module.exports = router;