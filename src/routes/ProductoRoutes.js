import { Router } from "express";
import { crearProducto } from "../controller/ProductoController";

const routerProductos = Router();

// crear un producto
routerProductos.post('/productos', crearProducto);

export { routerProductos }