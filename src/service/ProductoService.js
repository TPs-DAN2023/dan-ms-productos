import productoRepo from "../repository/ProductoRepo.js"

async function crearProducto(producto) {
  //TODO: validar lógica de negocio
  return await productoRepo.createProducto(producto);
}

async function listarProductos() {
  // TODO: validar lógica de negocio
  return await productoRepo.getProductos();
}

async function listarProductoPorId(id) {
  // TODO: validar lógica de negocio
  return await productoRepo.getProductoById(id);
}

async function listarProductoPorNombre(nombre) {
  // TODO: validar lógica de negocio
  return await productoRepo.getProductoByNombre(nombre);
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

async function eliminarProducto(id) {
  // TODO: validar lógica de negocio
  return await productoRepo.deleteProducto(id);
}

export default { crearProducto, listarProductos, listarProductoPorId, listarProductoPorNombre, listarProductoPorNombreCategoria, listarProductoPorNombreProveedor, listarProductoPorStockActual, modificarProducto, eliminarProducto }