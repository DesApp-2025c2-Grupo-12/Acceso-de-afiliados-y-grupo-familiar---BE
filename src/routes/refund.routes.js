const { Router } = require("express");
const router = Router();
const RefundControllers = require("../controllers/refund.controller");
const {validateRefundSchema, validateRefundQuerySchema} = require("../middlewares/refundMiddleware")
const validateIds = require('../middlewares/validateIds')

router.get("/",
    validateRefundQuerySchema,
    RefundControllers.getRefunds);

router.get("/:id", validateIds, RefundControllers.getRefundById);

router.post("/", 
    validateRefundSchema,
    RefundControllers.createRefund);

router.put("/:id", 
    validateIds,
    validateRefundSchema, 
    RefundControllers.updateRefund);

router.delete("/:id", RefundControllers.deleteRefund);

module.exports = router;