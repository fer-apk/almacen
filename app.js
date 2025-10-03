const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./router");
const app = express();
//middlewares globales
app.use(cors()); //permite que se conecten otros servidores
app.use(express.json()); //validacion de json
app.use(express.urlencoded({ extended: true })); // formularios HTML
// static
app.use(express.static(path.join(__dirname, "public")));
// página de login
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});
//prefix
app.use("/api", routes);

//rutas

module.exports = app;