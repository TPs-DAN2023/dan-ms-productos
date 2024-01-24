import { Router } from "express";
import controller from "../controller/CategoriaController.js";

const routerCategorias = Router();

// Crear una categoría
routerCategorias.post('/', controller.crearCategoria);

export default routerCategorias;