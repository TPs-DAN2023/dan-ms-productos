import { Router } from "express";
import controller from "../controller/ProveedorController.js";

const routerProveedores = Router();

// Crear un proveedor
routerProveedores.post('/', controller.create);
routerProveedores.get('/', controller.get);
routerProveedores.get('/:id', controller.getById);
routerProveedores.get('/:id/ordenes', controller.getOrdersByProviderId);

export default routerProveedores;