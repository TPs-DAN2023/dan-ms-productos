import { Router } from "express";
import controller from "../controller/ProductoController.js";

const routerProductos = Router();

// Crear un producto
routerProductos.post('/', controller.crearProducto);

export default routerProductos;