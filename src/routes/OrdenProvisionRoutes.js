import { Router } from "express";
import controller from "../controller/OrdenProvisionController.js";

const routerOrdenesProvision = Router();

// Crear una orden de provisión
routerOrdenesProvision.post('/', controller.crearOrdenProvision);

export default routerOrdenesProvision;