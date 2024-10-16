const { CustomError } = require("../../lib/customError");
const { carService } = require("./car.service");
const path = require("node:path");
const { config } = require("../../config/index");
const { generationId } = require("../../lib/generationId");
const { userService } = require("../user/user.service");

class CarController {
  #carService;
  #userService;
  constructor(carService, userService) {
    this.#carService = carService;
    this.#userService = userService;
  }

  async getAll(req, res, next) {
    try {
      const resData = await this.#carService.getAll();

      res.status(resData.status).json(resData);
    } catch (error) {
      next(error);
    }
  }

  async creatCar(req, res, next) {
    try {
      req.body.owner= req.currentUser.id
      const { model, owner } = req.body;
      const { image } = req.files;

      if (!model || !owner || !image) {
        throw new CustomError(400, "model and owner and image are required!");
      }

      await this.#userService.getOneById(owner);

      const [type, extname] = image.mimetype.split("/");

      if (type !== "image") {
        throw new CustomError(400, "image type must be image!");
      }

      const uuid = generationId();

      const fileName = `${uuid}.${extname}`;

      const fileUrl = path.join("uploads", fileName);

      const filePath = path.join(
        __dirname,
        "../../public",
        "uploads",
        fileName
      );

      image.mv(filePath, async (err) => {
        if (err) {
          throw err;
        }

        const dto = { model, owner, image: fileUrl };

        await this.#carService.create(dto);

        res.redirect("/car");
      });
    } catch (error) {
      next(error);
    }
  }

  async deletCar (req,res, next){

    const {id}= req.query
   
    

    const {data:oldData}= await this.#carService.getAll()

    if(!id){
      throw new CustomError(401, "idni ciritmadingiz")
    }
    

    const idBormi = oldData.findIndex((el)=> el.id ==id)
    
    if (idBormi== -1){
      throw new CustomError(401, "bunday idli oshirliadigan elemen yoq")
    }

    const newData = oldData.splice(idBormi, 1)

    await this.#carService.write(oldData)
    res.redirect("/car");









  }
}

const carController = new CarController(carService, userService);

module.exports = { carController };
