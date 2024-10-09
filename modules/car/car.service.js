const { generationId } = require("../../lib/generationId");
const { Repository } = require("../../lib/repository");
const { ResData } = require("../../lib/resData");
const path = require("node:path");

class CarService {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }

  async getAll() {
    const cars = await this.#repository.read();

    const resData = new ResData(200, "success", cars);

    return resData;
  }

  async create(dto) {
    const generatedId = generationId();

    dto.id = generatedId;

    const carData = await this.#repository.read();

    carData.push(dto);

    await this.#repository.write(carData);

    const resData = new ResData(201, "created", dto);

    return resData;
  }
}

const carDbUrl = path.join(__dirname, "../../database", "cars.json");

const repository = new Repository(carDbUrl);

const carService = new CarService(repository);

module.exports = { carService };
