import { Router } from "express";
import controller from "../controller/ProveedorController.js";

const routerProveedores = Router();

// Crear un proveedor
routerProveedores.post('/', controller.crearProveedor);

export default routerProveedores;