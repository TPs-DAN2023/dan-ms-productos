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
  res.json({ message: 'La etapa 2 del TP de Desarrollo de Aplicaciones en la Nube levantó correctamente.' })
})

// .use para usar un router
app.use('/api/productos', routerProductos);
app.use('/api/categorias', routerCategorias);
app.use('/api/proveedores', routerProveedores);
app.use('/api/ordenes', routerOrdenesProvision);

// la última a la que va a llegar
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})