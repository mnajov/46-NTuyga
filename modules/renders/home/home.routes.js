const { Router } = require("express");
const { homeController } = require("./home.controller");
const { authMiddleware } = require("../../../middlewares/auth.middleware");
const { setRole } = require("../../../lib/setRole");
const { roleMiddleware } = require("../../../middlewares/role.middleware");

const router = Router();

router.get(
  "/",
  authMiddleware.checkToken.bind(authMiddleware),
  authMiddleware.checkUser.bind(authMiddleware),
  setRole("admin"),
  roleMiddleware.checkRole.bind(roleMiddleware),
  homeController.render.bind(homeController)
);

module.exports = { router };
