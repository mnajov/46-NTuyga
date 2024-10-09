const { carService } = require("../../car/car.service");

class CarController {
  #carService;
  constructor(carService) {
    this.#carService = carService;
  }

  async render(req, res, next) {
    try {
      const cars = await this.#carService.getAll();

      res.render("car.ejs", cars);
    } catch (error) {
      next(error);
    }
  }
}

const carController = new CarController(carService);

module.exports = { carController };
