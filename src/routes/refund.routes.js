const { Router } = require("express");
const router = Router();
const RefundControllers = require("../controllers/refund.controller");

router.get("/", RefundControllers.getRefunds);
router.get("/:id", RefundControllers.getRefundById);
router.post("/", RefundControllers.createRefund);
router.put("/:id", RefundControllers.updateRefund);
router.delete("/:id", RefundControllers.deleteRefund);

module.exports = router;