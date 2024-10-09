const { Router } = require("express");
const authRoutes = require("./auth/auth.routes");
const carRoutes = require("./car/car.routes");

const router = Router();

router.use("/auth", authRoutes.router);
router.use("/car", carRoutes.router);

module.exports = { router };
