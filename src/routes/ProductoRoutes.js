import { Router } from "express";
import controller from "../controller/ProductoController.js";

const routerProductos = Router();

// Crear un producto
routerProductos.post('/', controller.crearProducto);
routerProductos.get('/', controller.listarProductos);
routerProductos.get('/:id', controller.listarProductoPorId);
routerProductos.get('/categoria/:nombre', controller.listarProductoPorNombreCategoria);
routerProductos.get('/proveedor/:nombre', controller.listarProductoPorNombreProveedor);
routerProductos.get('/stock/:cantidad', controller.listarProductoPorStockActual);
routerProductos.put('/:id', controller.modificarProducto);
routerProductos.delete('/:id', controller.eliminarProducto);

export default routerProductos;