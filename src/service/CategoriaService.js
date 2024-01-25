import categoriaRepo from "../repository/CategoriaRepo.js"

async function crearCategoria(categoria) {
  //TODO: validar lógica de negocio
  return await categoriaRepo.createCategoria(categoria);
}

async function listarCategorias(nombre) {
  //TODO: validar lógica de negocio
  return await categoriaRepo.getCategorias(nombre);
}

async function listarCategoriaPorId(id) {
  //TODO: validar lógica de negocio
  return await categoriaRepo.getCategoriaById(id);
}

export default { crearCategoria, listarCategorias, listarCategoriaPorId }