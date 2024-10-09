const { JsonWebTokenError } = require("jsonwebtoken");
const fs = require("node:fs/promises");

class Repository {
  #dir;
  constructor(dir) {
    this.#dir = dir;
  }

  async read() {
    let data = [];
    const jsonData = await fs.readFile(this.#dir, "utf-8");

    if (jsonData) {
      data = JSON.parse(jsonData);
    }

    return data;
  }

  async write(data) {
    fs.writeFile(this.#dir, JSON.stringify(data, null, 2));
  }
}

module.exports = { Repository };
