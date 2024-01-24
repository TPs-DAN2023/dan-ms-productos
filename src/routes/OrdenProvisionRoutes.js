import { Router } from "express";
import controller from "../controller/OrdenProvisionController.js";

const routerOrdenesProvision = Router();

// Crear una orden de provisión
routerOrdenesProvision.post('/', controller.crearOrdenProvision);
routerOrdenesProvision.get('/', controller.listarOrdenesProvision);
routerOrdenesProvision.get('/:id', controller.listarOrdenProvisionPorId);
routerOrdenesProvision.get('/proveedor/:id', controller.listarOrdenProvisionPorIdProveedor);
// TODO: Chequear si la siguiente es correcta o no
routerOrdenesProvision.get('/fecha/:desde/:hasta', controller.listarOrdenProvisionPorFecha);
routerOrdenesProvision.put('/:id', controller.modificarOrdenProvision);
routerOrdenesProvision.patch('/:id/estado', controller.cambiarEstadoOrdenProvision);

export default routerOrdenesProvision;