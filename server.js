const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { join } = require("path");
const { config } = require("./config/index");
const { CustomError } = require("./lib/customError");
const { ResData } = require("./lib/resData");
const { router } = require("./modules/module.routes");
const renderRoutes = require("./modules/renders/render.routes");
const fileUpload = require("express-fileupload");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.set("view engine", "ejs");
app.set("views", join(__dirname, "./views"));

app.use(express.static(join(__dirname, "./public")));

app.use("/api", router);
app.use("/", renderRoutes.router);

// app.post("/avatar", (req, res, next) => {
//   try {
//     console.log(req.files.ok);

//     res.redirect("/home");
//   } catch (error) {
//     next(error);
//   }
// });

app.use((req, res, next) => {
  try {
    const url = req.url;
    const method = req.method;

    throw new CustomError(404, `this ${url}  method ${method} is not found`);
  } catch (error) {
    next(error);
  }
});


app.use((err, req, res, next) => {
  const message = err.message;
  const status = err.status || 500;

  const resData = new ResData(status, message);

  res.render("error.ejs", resData);
});

app.listen(config.port, () => {
  console.log("http://localhost:" + config.port);
});
// git ushin
