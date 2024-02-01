import { Router } from "express";
import controller from "../controller/ProductoController.js";

const routerProductos = Router();

routerProductos.post('/', controller.create);
routerProductos.get('/', controller.get);
routerProductos.get('/:id', controller.getById);
routerProductos.get('/categoria/:nombre', controller.getByCategoryName);
routerProductos.get('/proveedor/:nombre', controller.getByProviderName);
routerProductos.get('/stock/:cantidad', controller.getByActualStock);
routerProductos.put('/:id', controller.update);
routerProductos.delete('/:id', controller.deleteProd);

export default routerProductos;