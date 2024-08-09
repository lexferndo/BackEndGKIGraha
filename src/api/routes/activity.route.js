const activityController = require("../controllers/activity.controller");
const router = require("express").Router();
const upload = require("../middleware/upload");

router.get("/", activityController.findAll);
router.get("/:id", activityController.findOne);
router.post("/", upload.single("url_image"), activityController.create);
router.put("/:id", upload.single("url_image"), activityController.update);
router.delete("/:id", activityController.delete);

module.exports = router;
