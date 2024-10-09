const { Router } = require("express");
const { carController } = require("./car.controller");

const router = Router();

router.get("/", carController.render.bind(carController));

module.exports = { router };
