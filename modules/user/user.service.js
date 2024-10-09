const { join } = require("node:path");
const { Repository } = require("../../lib/repository");
const { ResData } = require("../../lib/resData");
const { generationId } = require("../../lib/generationId");
const { CustomError } = require("../../lib/customError");

class UserService {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }

  async getOneById(id) {
    const users = await this.#repository.read();

    const foundUser = users.find((user) => user.id === id);

    if (!foundUser) {
      throw new CustomError(404, "user not found by id!");
    }

    const resData = new ResData(200, "success", foundUser);

    return resData;
  }

  async getAll() {
    const data = await this.#repository.read();

    const resData = new ResData(200, "success", data);

    return resData;
  }

  async getByLogin(login) {
    const data = await this.#repository.read();

    const foundUser = data.find((user) => user.login === login);

    const resData = new ResData(200, "success", foundUser);

    if (!foundUser) {
      resData.status = 404;
      resData.message = "user not found";
    }

    return resData;
  }

  async create(body) {
    const newId = generationId();

    body.id = newId;

    const data = await this.#repository.read();

    data.push(body);

    await this.#repository.write(data);

    const resData = new ResData(201, "created", body);

    return resData;
  }
}

const userDbUrl = join(__dirname, "../../database/users.json");

const repository = new Repository(userDbUrl);

const userService = new UserService(repository);

module.exports = { userService };
