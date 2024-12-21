const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const router = require("./router")
const cors = require("cors");

const app = express();
app.use(cors({
    origin: ["http://localhost:5173", "https://clientes-creditos.netlify.app", "https://react-ts-example-alpha.vercel.app"]
})) // aceptar peticiones de cualquier origen
app.use(express.json())
app.use(router)

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});