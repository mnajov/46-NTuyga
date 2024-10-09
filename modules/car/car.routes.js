const { Router } = require("express");
const { carController } = require("./car.controller");

const router = Router();

router.get("/", carController.getAll.bind(carController));
router.post("/", carController.creatCar.bind(carController));

module.exports = { router };
