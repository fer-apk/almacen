const express = require("express");
const cors = require("cors");
const routes = require("./router");
const app = express();
//middlewares globales
app.use(cors()); //permite que se conecten otros servidores
app.use(express.json()); //validacion de json
//prefix
app.use("/api", routes);

//rutas

module.exports = app;