const { Router } = require("express");
const { authMiddleware } = require("../../../middlewares/auth.middleware");
const { setRole } = require("../../../lib/setRole");
const { roleMiddleware } = require("../../../middlewares/role.middleware");
const { carController } = require("./car.controller");

const router = Router();

router.get("/",  
    authMiddleware.checkToken.bind(authMiddleware),
    authMiddleware.checkUser.bind(authMiddleware), 
    carController.render.bind(carController));


module.exports = { router };
