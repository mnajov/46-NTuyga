const { Router } = require("express");
const { authController } = require("./auth.controller");

const router = Router();

router.post("/login", authController.login.bind(authController));
router.post("/register", authController.register.bind(authController));

module.exports = { router };
