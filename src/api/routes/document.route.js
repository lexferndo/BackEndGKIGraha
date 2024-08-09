const documentController = require("../controllers/document.controller");
const router = require("express").Router();
const upload = require("../middleware/upload");

router.get("/", documentController.findAll);
router.get("/:id", documentController.findOne);
router.post("/", upload.single("url_file"), documentController.create);
router.put("/:id", upload.single("url_file"), documentController.update);
router.delete("/:id", documentController.delete);

module.exports = router;
