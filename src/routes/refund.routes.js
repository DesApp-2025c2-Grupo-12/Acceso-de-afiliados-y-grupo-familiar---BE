const { Router } = require("express");
const router = Router();
const RefundControllers = require("../controllers/refund.controller");
const { validateSchema } = require('../db/utils/validations/validation');
const validateIds = require('../middlewares/validateIds')
const {
  createRefundSchema,
  updateRefundSchema,
  refundQuerySchema
} = require('../schemas/refund.schema');

router.get("/",
    validateSchema(refundQuerySchema, 'query') ,
    RefundControllers.getRefunds);

router.get("/:id", validateIds, RefundControllers.getRefundById);

router.post("/", 
    validateSchema(createRefundSchema),
    RefundControllers.createRefund);

router.put("/:id", 
    validateIds,
    validateSchema(updateRefundSchema), 
    RefundControllers.updateRefund);

router.delete("/:id", RefundControllers.deleteRefund);

module.exports = router;