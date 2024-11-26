//!este es mi MAIN index
import app from "./app.js";
import { PORT } from "./config.js";

app.listen(PORT);
console.log("Server is running in port", PORT);
