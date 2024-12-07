const express = require("express");
const { saludarConNombre, sumar } = require("./utils");

const connection = require("./db"); // importar la conexión a la base de datos

const router = express.Router();

router.get("/", function (request, response) {
  response.send("Hello World");
}); // obtener datos

router.get("/saludar", function (request, response) {
  const saludo = saludarConNombre("Pepito");
  const suma = sumar(5, 3);
  response.send(saludo + " " + suma);
});

router.get("/usuario", function (request, response) {
  response.json({
    nombre: "Juan",
    apellido: "Perez",
    edad: 25,
    email: "juan.perez@unilibre.edu.co",
    telefono: "1234567890",
  });
});

router.get("/clientes", function(request, response) {

  connection.query("SELECT * FROM clientes", function(error, result) {
    if (error) {
      console.log("Error fetching clients", error);
    } else {
      response.json(result);
    }
  })
  
})

module.exports = router;
