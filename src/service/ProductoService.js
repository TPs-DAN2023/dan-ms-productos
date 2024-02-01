import productoRepo from "../repository/ProductoRepo.js"

async function create(producto) {
  //TODO: validar lógica de negocio
  return await productoRepo.create(producto);
}

async function get(nombre) {
  // TODO: validar lógica de negocio
  return await productoRepo.get(nombre);
}

async function getById(id) {
  // TODO: validar lógica de negocio
  return await productoRepo.getById(id);
}

async function getByCategoryName(nombre) {
  // TODO: validar lógica de negocio
  return await productoRepo.getByCategoryName(nombre);
}

async function getByProviderName(nombre) {
  // TODO: validar lógica de negocio
  return await productoRepo.getByProviderName(nombre);
}

async function getByActualStock(cantidad) {
  // TODO: validar lógica de negocio
  return await productoRepo.getByActualStock(cantidad);
}

async function update(id, producto) {
  // TODO: validar lógica de negocio
  return await productoRepo.update(id, producto);
}

async function updateStock(id, cantidad) {
  // TODO: validar lógica de negocio
  return await productoRepo.updateStock(id, cantidad);
}

async function deleteProd(id) {
  // TODO: validar lógica de negocio
  return await productoRepo.deleteProd(id);
}

export default { create, get, getById, getByCategoryName, getByProviderName, getByActualStock, update, updateStock, deleteProd };