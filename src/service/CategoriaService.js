import categoriaRepo from "../repository/CategoriaRepo.js"

async function crearCategoria(categoria) {
  //TODO: validar lógica de negocio
  return await categoriaRepo.createCategoria(categoria);
}

async function listarCategorias() {
  //TODO: validar lógica de negocio
  return await categoriaRepo.getCategorias();
}

async function listarCategoriaPorId(id) {
  //TODO: validar lógica de negocio
  return await categoriaRepo.getCategoriaById(id);
}

async function listarCategoriaPorNombre(nombre) {
  //TODO: validar lógica de negocio
  return await categoriaRepo.getCategoriaByNombre(nombre);
}

export default { crearCategoria, listarCategorias, listarCategoriaPorId, listarCategoriaPorNombre }