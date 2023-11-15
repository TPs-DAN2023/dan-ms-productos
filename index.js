// Esta es una prueba que se encuentra en el power NodeJS 
// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hola Mundo');
// });

// server.listen(port, hostname, () => {
//   console.log(`El servidor se esta ejecutando en http://${hostname}:${port}/`)
// });

const express = require('express');
// const exp = require('constants');

const PORT = process.env.PORT ?? 1234

const app = express()
// app.disable('x-powered-by')

// app.use(express.json())

app.get('/', (req, res) => {
  // res.status(200).send('<h1>Mi pagina</h1>')
  res.json({ message: 'Hola mundo' })
})

app.get('/api/productos', (req, res) => {
  // res.status(200).send('<h1>Mi pagina</h1>')
  res.json({ message: 'Hola productos' })
})

app.get('/api/categorias', (req, res) => {
  // res.status(200).send('<h1>Mi pagina</h1>')
  res.json({ message: 'Hola categorias' })
})

app.get('/api/proveedores', (req, res) => {
  // res.status(200).send('<h1>Mi pagina</h1>')
  res.json({ message: 'Hola proveedores' })
})

app.get('/api/ordenes', (req, res) => {
  // res.status(200).send('<h1>Mi pagina</h1>')
  res.json({ message: 'Hola ordenes' })
})

// app.get('/pokemon', (req, res) => {
//   res.status(201).json('Todo bien maestro')
// })

// la última a la que va a llegar
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})