import productoRepo from "../repository/ProductoRepo.js"

async function crearProducto(producto) {

  //TODO: validar lógica de negocio
  return await productoRepo.createProducto(producto);

}

export default { crearProducto }