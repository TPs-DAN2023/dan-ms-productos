import express from 'express'
import Eureka from 'eureka-js-client';
import routerProductos from './src/routes/ProductoRoutes.js';
import routerCategorias from './src/routes/CategoriaRoutes.js';
import routerProveedores from './src/routes/ProveedorRoutes.js';
import routerOrdenesProvision from './src/routes/OrdenProvisionRoutes.js';

const PORT = process.env.PORT ?? 1234;

const app = express();
app.use(express.json());

// Eureka client configuration
// const client = new Eureka({
//   // application instance information
//   instance: {
//     app: 'PRODUCTS-SERVICE',
//     hostName: 'localhost',
//     ipAddr: '127.0.0.1',
//     port: {
//       '$': PORT,
//       '@enabled': 'true',
//     },
//     vipAddress: 'PRODUCTS-SERVICE',
//     statusPageUrl: `http://localhost:${PORT}`,
//     healthCheckUrl: `http://localhost:${PORT}/api/health`,
//     homePageUrl: `http://localhost:${PORT}`,
//     dataCenterInfo: {
//       '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
//       name: 'MyOwn',
//     },
//   },
//   eureka: {
//     // eureka server host / port / serviceUrls
//     host: 'localhost',
//     port: 8761,
//     servicePath: '/eureka/apps/',
//   },
// });

// client.start();

app.get('/', (req, res) => {
  res.json({ message: 'La etapa 2 del TP de Desarrollo de Aplicaciones en la Nube levantó correctamente.' })
})

// .use para usar un router
app.use('/api/productos', routerProductos);
app.use('/api/categorias', routerCategorias);
app.use('/api/proveedores', routerProveedores);
app.use('/api/ordenes', routerOrdenesProvision);

app.use('/api/health', (req, res) => {
  res.json({
    serverName: req.hostname,
    app: 'ms-usuarios',
    status: 'OK',
    timestamp: new Date().toISOString(),
    serverIp: 'localhost'
  })
});

// la última a la que va a llegar
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})