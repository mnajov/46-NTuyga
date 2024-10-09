const { Router } = require("express");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { carController } = require("./car.controller");

const router = Router();

router.get("/", carController.getAll.bind(carController));
router.post("/",
     authMiddleware.checkToken.bind(authMiddleware),
     authMiddleware.checkUser.bind(authMiddleware), 
     carController.creatCar.bind(carController));
router.get("/delet", carController.deletCar.bind(carController));

module.exports = { router };
