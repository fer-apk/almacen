const express = require("express");
const router = express.Router();
const db = require("./db");

// Autenticación básica contra tabla usuarios
router.post("/login", async (req, res) => {
  try {
    const { usuario, password } = req.body;
    if (!usuario || !password) {
      return res.status(400).json({ ok: false, message: "Usuario y contraseña son requeridos" });
    }

    const [rows] = await db.execute(
      "SELECT id_usuario, nombre, usuario, rol FROM usuarios WHERE usuario = ? AND password = ? LIMIT 1",
      [usuario, password]
    );

    if (!rows || rows.length === 0) {
      return res.status(401).json({ ok: false, message: "Credenciales inválidas" });
    }

    // Nota: Para producción, usa hashing (bcrypt) y sesiones/JWT.
    const user = rows[0];
    return res.json({ ok: true, user });
  } catch (err) {
    console.error("Error en /api/login:", err);
    return res.status(500).json({ ok: false, message: "Error del servidor" });
  }
});

// Lista de productos
router.get("/productos", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id_producto, nombre, descripcion, precio, stock FROM productos ORDER BY id_producto DESC"
    );
    return res.json({ ok: true, data: rows });
  } catch (err) {
    console.error("Error en /api/productos:", err);
    return res.status(500).json({ ok: false, message: "Error del servidor" });
  }
});

router.get("/", (req, res) => {
  res.send("Express funcionando");
});

module.exports = router;