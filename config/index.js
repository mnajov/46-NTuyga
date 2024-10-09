require("dotenv").config();

const config = {
  port: +process.env.PORT,
  jwtKey: process.env.JWT_KEY,
  fileServerUrl: process.env.FILE_SERVER_URL,
};

module.exports = { config };
