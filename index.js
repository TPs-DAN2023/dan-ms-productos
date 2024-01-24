import express from 'express'
import routerProductos from './src/routes/ProductoRoutes.js';
import routerCategorias from './src/routes/CategoriaRoutes.js';
import routerProveedores from './src/routes/ProveedorRoutes.js';
import routerOrdenesProvision from './src/routes/OrdenProvisionRoutes.js';
import routerOrdenesProvisionDetalle from './src/routes/OrdenProvisionDetalleRoutes.js';

const PORT = process.env.PORT ?? 1234;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  // res.status(200).send('<h1>Mi pagina</h1>')
  res.json({ message: 'Hola mundo' })
})

// .use para usar un router
app.use('/api/productos', routerProductos);
app.use('/api/categorias', routerCategorias);
app.use('/api/proveedores', routerProveedores);
app.use('/api/ordenes-provision', routerOrdenesProvision);
app.use('/api/ordenes-provision-detalle', routerOrdenesProvisionDetalle);


// app.get('/api/categorias', (req, res) => {
//   res.json({ message: 'Hola categorias' })
// })

// app.get('/api/proveedores', (req, res) => {
//   res.json({ message: 'Hola proveedores' })
// })

// app.get('/api/ordenes', (req, res) => {
//   res.json({ message: 'Hola ordenes' })
// })

// la última a la que va a llegar
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})