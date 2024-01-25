import productoRepo from "../repository/ProductoRepo.js"

async function crearProducto(producto) {
  //TODO: validar lógica de negocio
  return await productoRepo.createProducto(producto);
}

async function listarProductos(nombre) {
  // TODO: validar lógica de negocio
  return await productoRepo.getProductos(nombre);
}

async function listarProductoPorId(id) {
  // TODO: validar lógica de negocio
  return await productoRepo.getProductoById(id);
}

async function listarProductoPorNombreCategoria(nombre) {
  // TODO: validar lógica de negocio
  return await productoRepo.getProductoByNombreCategoria(nombre);
}

async function listarProductoPorNombreProveedor(nombre) {
  // TODO: validar lógica de negocio
  return await productoRepo.getProductoByNombreProveedor(nombre);
}

async function listarProductoPorStockActual(cantidad) {
  // TODO: validar lógica de negocio
  return await productoRepo.getProductoByStockActual(cantidad);
}

async function modificarProducto(id, producto) {
  // TODO: validar lógica de negocio
  return await productoRepo.updateProducto(id, producto);
}

async function modificarStockDeProducto(id, cantidad) {
  // TODO: validar lógica de negocio
  return await productoRepo.updateStockDeProducto(id, cantidad);
}

async function eliminarProducto(id) {
  // TODO: validar lógica de negocio
  return await productoRepo.deleteProducto(id);
}

export default { crearProducto, listarProductos, listarProductoPorId, listarProductoPorNombreCategoria, listarProductoPorNombreProveedor, listarProductoPorStockActual, modificarProducto, eliminarProducto }