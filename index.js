require("dotenv").config();
const app = require("./app.js");
const db = require("./db");

const PORT = process.env.PORT || 3000;

// Verificar conexión a la base de datos al iniciar para detectar errores tempranos
(async () => {
  try {
    // obtener una conexión del pool y ejecutar una consulta simple
    const conn = await db.getConnection();
    await conn.query("SELECT 1");
    conn.release();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("No se pudo conectar a la base de datos:", err.message || err);
    if (err && err.stack) console.error(err.stack);
    console.error("Comprueba que MySQL esté en ejecución, las credenciales en .env y el puerto/host configurados.");
    process.exit(1);
  }
})();