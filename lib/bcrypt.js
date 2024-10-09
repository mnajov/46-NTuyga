const { hash, compare } = require("bcrypt");

class Bcrypt {
  #saltRounds;
  constructor(saltRounds) {
    this.#saltRounds = saltRounds;
  }

  async hash(password) {
    return hash(password, this.#saltRounds);
  }

  async compare(password, hash) {
    return compare(password, hash);
  }
}

const bcrypt = new Bcrypt(10);

module.exports = { bcrypt };
