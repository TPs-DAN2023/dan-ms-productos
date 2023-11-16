import { Router } from "express";
import controller from "../controller/ProductoController.js";

const routerProductos = Router();

// crear un producto
routerProductos.post('/', controller.crearProducto);

export default routerProductos;