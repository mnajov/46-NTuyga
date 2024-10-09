const { CustomError } = require("../lib/customError");
const { myJwt } = require("../lib/jwt");
const { userService } = require("../modules/user/user.service");

class AuthMiddleware {
  #jwt;
  #userService;
  constructor(jwt, userService) {
    this.#jwt = jwt;
    this.#userService = userService;
  }

  checkToken(req, res, next) {
    try {
      const token = req.cookies.token;
      if (!token) {
        throw new CustomError(401, "token must be required!");
      }

      const { id } = this.#jwt.verify(token);

      req.userId = id;
      next();
    } catch (error) {
      res.render("login.ejs", { message: error.message });
    }
  }

  async checkUser(req, res, next) {
    try {
      const userId = req.userId;
      if (!userId) {
        throw new CustomError(500, "userId not provided!");
      }

      const { data: user } = await this.#userService.getOneById(userId);

      req.currentUser = user;

      next();
    } catch (error) {
      res.render("login.ejs", { message: error.message });
    }
  }
}

const authMiddleware = new AuthMiddleware(myJwt, userService);

module.exports = { authMiddleware };
