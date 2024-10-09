const { carService } = require("../../car/car.service");

class CarController {
  #carService;
  constructor(carService) {
    this.#carService = carService;
  }

  async render(req, res, next) {
    try {

      const user = req.currentUser
      const cars = await this.#carService.getAll();

      const data= cars.data.filter((el)=>{
        if(el.owner==user.id){
          return el
        }
      })

      res.render("car.ejs", {data});
    } catch (error) {
      next(error);
    }
  }
}

const carController = new CarController(carService);

module.exports = { carController };
