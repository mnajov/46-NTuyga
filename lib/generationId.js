const { v4 } = require("uuid");

function generationId() {
  return v4();
}

module.exports = { generationId };
