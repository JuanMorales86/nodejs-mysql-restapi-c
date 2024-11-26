import express from "express";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";
const app = express();


const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json()); //para que el servidor pueda entender los datos que le enviamos en formato JSON, primero se llama use y dentro de use se llama a express.json() y esto luego se lo pasa a las rutas.

app.use(indexRoutes);
app.use("/api/", employeesRoutes);

app.use((req, res, next) => {
  //funcion middleware (req, res, next) => {})
  res.status(404).json({
    message: "Endpoint not found",
  });
});

export default app;