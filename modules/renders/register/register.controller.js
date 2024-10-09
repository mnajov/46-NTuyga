class RegisterController {
  async render(req, res, next) {
    try {
      res.render("register.ejs");
    } catch (error) {
      next(error);
    }
  }
}

const registerController = new RegisterController();

module.exports = { registerController };
