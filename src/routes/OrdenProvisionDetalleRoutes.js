import { Router } from "express";
import controller from "../controller/OrdenProvisionDetalleController.js";

const routerOrdenesProvisionDetalle = Router();

// Crear un detalle de orden de provisión
routerOrdenesProvisionDetalle.post('/', controller.crearOrdenProvisionDetalle);

export default routerOrdenesProvisionDetalle;