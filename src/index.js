const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const router = require("./router")
const cors = require("cors");

const app = express();
app.use(cors()) // aceptar peticiones de cualquier origen
app.use(express.json())
app.use(router)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});