import { Router } from "express";
import controller from "../controller/CategoriaController.js";

const routerCategorias = Router();

// Crear una categoría
routerCategorias.post('/', controller.create);
routerCategorias.get('/', controller.get);
routerCategorias.get('/:id', controller.getById);

export default routerCategorias;