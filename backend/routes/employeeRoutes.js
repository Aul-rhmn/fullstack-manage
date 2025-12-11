const express = require("express");
const router = express.Router();
const empCtrl = require("../controllers/employeeController");
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.get("/", auth, empCtrl.getEmployees);
router.post("/", auth, upload.single("photo"), empCtrl.createEmployee);
router.delete("/:id", auth, empCtrl.deleteEmployee);

module.exports = router;
