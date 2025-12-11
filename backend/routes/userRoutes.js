const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, userCtrl.getUsers);
router.get("/me", auth, userCtrl.getMe);
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;
