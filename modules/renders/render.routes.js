const { Router } = require("express");
const homeRoutes = require("./home/home.routes");
const loginRoutes = require("./login/login.routes");
const registerRoutes = require("./register/register.routes");
const carRoutes = require("./car/car.routes");

const router = Router();

router.use("/home", homeRoutes.router);
router.use("/login", loginRoutes.router);
router.use("/register", registerRoutes.router);
router.use("/car", carRoutes.router);

module.exports = { router };
