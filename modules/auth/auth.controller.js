const { CustomError } = require("../../lib/customError");
const { authService } = require("./auth.service");
const { userService } = require("../user/user.service");

class AuthController {
  #authService;
  #userService;
  constructor(authService, userService) {
    this.#authService = authService;
    this.#userService = userService;
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      if (!login || !password) {
        throw new CustomError(400, "login and password must be required");
      }

      const foundByLogin = await this.#userService.getByLogin(login);

      if (foundByLogin.status === 404) {
        throw new CustomError(400, "password or login is incorrect");
      }

      const userData = await this.#authService.login(
        foundByLogin.data,
        password
      );

      res.cookie("token", userData.data.token);
      res.redirect("/home");
    } catch (error) {
      res.render("login.ejs", { message: error.message });
    }
  }

  async register(req, res, next) {
    try {
      const { login, password, fullName, role } = req.body;

      if (!login || !password || !fullName || !role) {
        throw new CustomError(
          400,
          "login, password, fullName, role must be required"
        );
      }

      const foundByLogin = await this.#userService.getByLogin(login);

      if (foundByLogin.data) {
        throw new CustomError(400, "login already exists");
      }

      const hashedPassword = await this.#authService.register(password);

      await this.#userService.create({
        login,
        password: hashedPassword.data,
        fullName,
        role,
      });

      res.redirect("/login");
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController(authService, userService);

module.exports = { authController };
