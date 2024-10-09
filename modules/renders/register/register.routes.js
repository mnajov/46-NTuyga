const { Router } = require("express");
const { registerController } = require("./register.controller");

const router = Router();

router.get("/", registerController.render.bind(registerController));

module.exports = { router };
