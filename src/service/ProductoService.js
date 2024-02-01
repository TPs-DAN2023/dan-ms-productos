import productoRepo from "../repository/ProductoRepo.js"
import NotFoundException from "../exception/NotFoundException.js";
import MissingDataException from "../exception/MissingDataException.js";

async function create(producto) {
  validateProductFields(producto);

  return await productoRepo.create(producto);
}

async function get(nombre) {
  return await productoRepo.get(nombre);
}

async function getById(id) {
  const producto = await productoRepo.getById(id);

  if (!producto)
    throw new NotFoundException(`No existe el producto con el id especificado (id=${id})`);

  return producto;
}

async function getByCategoryName(nombre) {

  if (!nombre)
    throw new MissingDataException('El nombre de la categoría es requerido');

  const category = await categoriaRepo.get(nombre);

  if (!category)
    throw new NotFoundException(`No existe la categoría con el nombre especificado (nombre=${nombre})`);

  return await productoRepo.getByCategory(category);
}

async function getByProviderName(nombre) {

  if (!nombre)
    throw new MissingDataException('El nombre del proveedor es requerido');

  const provider = await proveedorRepo.get(nombre);

  if (!provider)
    throw new NotFoundException(`No existe el proveedor con el nombre especificado (nombre=${nombre})`);

  return await productoRepo.getByProvider(provider);
}

async function getByActualStock(cantidad) {

  if (cantidad < 0)
    throw new InvalidActualStockException('La cantidad de stock actual no puede ser negativa');

  return await productoRepo.getByActualStock(cantidad);
}

async function update(id, producto) {

  validateProductFields(producto);

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