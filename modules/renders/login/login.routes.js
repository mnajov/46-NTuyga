const { Router } = require("express");
const { loginController } = require("./login.controller");

const router = Router();

router.get("/", loginController.render.bind(loginController));

module.exports = { router };
