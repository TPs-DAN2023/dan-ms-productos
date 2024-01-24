import categoriaRepo from "../repository/CategoriaRepo.js"

async function crearCategoria(categoria) {

  //TODO: validar lógica de negocio
  return await categoriaRepo.createCategoria(categoria);

}

export default { crearCategoria }