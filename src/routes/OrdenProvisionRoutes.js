import { Router } from "express";
import controller from "../controller/OrdenProvisionController.js";

const routerOrdenesProvision = Router();

// Crear una orden de provisión
routerOrdenesProvision.post('/', controller.create);
routerOrdenesProvision.get('/', controller.get);
routerOrdenesProvision.get('/:id', controller.getById);
routerOrdenesProvision.get('/proveedor/:id', controller.getByProviderId);
// TODO: Chequear si la siguiente es correcta o no
routerOrdenesProvision.get('/fecha/:desde/:hasta', controller.getByDate);
routerOrdenesProvision.put('/:id', controller.update);
routerOrdenesProvision.patch('/:id/estado', controller.updateState);

export default routerOrdenesProvision;