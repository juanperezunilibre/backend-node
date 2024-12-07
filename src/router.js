const express = require("express")
const yup = require("yup")

const { saludarConNombre, sumar } = require("./utils")

const connection = require("./db") // importar la conexión a la base de datos

const router = express.Router()

router.get("/", function (request, response) {
  response.send("Hello World")
}) // obtener datos

router.get("/saludar", function (request, response) {
  const saludo = saludarConNombre("Pepito")
  const suma = sumar(5, 3)
  response.send(saludo + " " + suma)
})

router.get("/usuario", function (request, response) {
  response.json({
    nombre: "Juan",
    apellido: "Perez",
    edad: 25,
    email: "juan.perez@unilibre.edu.co",
    telefono: "1234567890",
  })
})

router.get("/clientes", function (request, response) {
  connection.query("SELECT * FROM clientes", function (error, result) {
    if (error) {
      console.log("Error fetching clients", error)
    } else {
      response.json(result)
    }
  })
})

router.post("/cliente", async function (request, response) {
  const schema = yup.object().shape({
    documento: yup.string().required("El documento es obligatorio"),
    nombre: yup.string().required("El nombre es obligatorio"),
    apellidos: yup.string().required("Los apellidos son obligatorios"),
    email: yup
      .string()
      .email("El email es inválido")
      .required("El email es obligatorio"),
  })

  const datos = request.body

  try {
    const result = await schema.validate(datos) // validamos que el objeto cumpla con el esquema
    console.log(result)

    const query =
      "INSERT INTO clientes (documento, nombre, apellidos, email) VALUES (?, ?, ?, ?)"

    connection.execute(query, Object.values(datos), function (error, result) {
      if (error) {
        response.status(400).json({
          message: "Error al guardar el cliente",
          error: error,
        })
      } else {
        response.json({
          message: "Cliente guardado",
          data: result,
        })
      }
    })
  } catch (error) {
    response.status(400).json({
      message: error.message,
    })
  }
})

// desde 200 hasta 299 - OK
// desde 300 hasta 399 - Redirecciones
// desde 400 hasta 499 - Errores del cliente
// desde 500 hasta 599 - Errores del servidor

module.exports = router
