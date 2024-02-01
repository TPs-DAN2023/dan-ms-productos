import categoriaRepo from "../repository/CategoriaRepo.js"
import NotFoundException from "../exception/NotFoundException.js";
import { validateCategoryFields } from "../utils/validation.js";

async function create(categoria) {

  try {
    await validateCategoryFields(categoria);
    return await categoriaRepo.create(categoria);
  } catch (error) {
    throw error;
  }
}

async function get(nombre) {
  return await categoriaRepo.get(nombre);
}

async function getById(id) {
  const categoria = await categoriaRepo.getById(id);

  if (!categoria)
    throw new NotFoundException(`No existe la categoría con el id especificado (id=${id})`);

  return categoria;
}

export default { create, get, getById }