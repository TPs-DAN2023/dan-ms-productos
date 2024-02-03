import { Router } from "express";
import controller from "../controller/OrdenProvisionController.js";

const routerOrdenesProvision = Router();

routerOrdenesProvision.post('/', controller.create);
routerOrdenesProvision.get('/', controller.get);
routerOrdenesProvision.get('/:id', controller.getById);
routerOrdenesProvision.get('/proveedor/:id', controller.getByProviderId);
routerOrdenesProvision.get('/fechaGeneracion/:fechaInicio/:fechaFin', controller.getByGenerationDate);
routerOrdenesProvision.get('/fechaRecepcion/:fechaInicio/:fechaFin', controller.getByReceptionDate);
routerOrdenesProvision.put('/:id', controller.update);
routerOrdenesProvision.patch('/:id/estado/:estado', controller.updateState);

export default routerOrdenesProvision;