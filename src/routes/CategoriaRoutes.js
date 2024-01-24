import { Router } from "express";
import controller from "../controller/CategoriaController.js";

const routerCategorias = Router();

// Crear una categoría
routerCategorias.post('/', controller.crearCategoria);
routerCategorias.get('/', controller.listarCategorias);
routerCategorias.get('/:id', controller.listarCategoriaPorId);
routerCategorias.get('/:nombre', controller.listarCategoriaPorNombre);

export default routerCategorias;