const userController = require("../controllers/user.controller");
const router = require("express").Router();
const { authToken } = require("../middleware/authToken");

router.post("/login", userController.loginUser);
router.post("/register", authToken, userController.registerUser);
router.get("/", authToken, userController.getAllUsers);
router.get("/:id", authToken, userController.getOneUser);
router.put("/:id", authToken, userController.updateUser);
router.delete("/:id", authToken, userController.delete);

module.exports = router;
