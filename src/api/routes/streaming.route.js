const streamingController = require("../controllers/streaming.controller");
const router = require("express").Router();

router.get("/:id", streamingController.findOne);
router.put("/:id", streamingController.update);

module.exports = router;
