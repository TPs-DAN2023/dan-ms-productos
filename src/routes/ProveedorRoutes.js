import { Router } from "express";
import controller from "../controller/ProveedorController.js";

const routerProveedores = Router();

// Crear un proveedor
routerProveedores.post('/', controller.crearProveedor);
routerProveedores.get('/', controller.listarProveedores);
routerProveedores.get('/:id', controller.listarProveedorPorId);
routerProveedores.get('/:nombre', controller.listarProveedorPorNombre);

export default routerProveedores;