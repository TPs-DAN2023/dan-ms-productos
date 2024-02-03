import productoRepo from "../repository/ProductoRepo.js"
import NotFoundException from "../exception/NotFoundException.js";
import MissingDataException from "../exception/MissingDataException.js";
import { validateProductFields } from "../utils/validation.js";
import InvalidFieldException from "../exception/InvalidFieldException.js";
import proveedorRepo from "../repository/ProveedorRepo.js";
import categoriaRepo from "../repository/CategoriaRepo.js";

async function create(producto) {

  try {
    await validateProductFields(producto);
    return await productoRepo.create(producto);
  } catch (error) {
    throw error;
  }
}

async function get(nombre) {
  return await productoRepo.get(nombre);
}

async function getById(id) {
  try {
    const producto = await productoRepo.getById(id);

    if (!producto)
      throw new NotFoundException(`No existe el producto con el id especificado (id=${id})`);

    return producto;
  } catch (error) {
    throw error;
  }
}

async function getByCategoryName(nombre) {

  if (!nombre)
    throw new MissingDataException('El nombre de la categoría es requerido');

  try {
    const category = await categoriaRepo.get(nombre);

    if (!category)
      throw new NotFoundException(`No existe la categoría con el nombre especificado (nombre=${nombre})`);

    return await productoRepo.getByCategoryName(nombre);
  } catch (error) {
    throw error;
  }
}

async function getByProviderName(nombre) {

  if (!nombre)
    throw new MissingDataException('El nombre del proveedor es requerido');

  try {

    const provider = await proveedorRepo.get(nombre);

    if (!provider)
      throw new NotFoundException(`No existe el proveedor con el nombre especificado (nombre=${nombre})`);

    return await productoRepo.getByProviderName(nombre);
  } catch (error) {
    throw error;
  }
}

async function getByActualStock(cantidad) {

  if (cantidad < 0)
    throw new InvalidFieldException('La cantidad de stock actual no puede ser negativa');

  return await productoRepo.getByActualStock(cantidad);
}

async function update(id, newProduct) {
  try {
    const product = await productoRepo.getById(id);

    if (!product)
      throw new NotFoundException(`No existe el producto con el id especificado (id=${id})`);

    await validateProductFields(newProduct);
    return await productoRepo.update(id, newProduct);
  } catch (error) {
    throw error;
  }
}

async function updateStock(id, cantidad) {

  if (cantidad < 0)
    throw new InvalidFieldException('La cantidad de stock actual no puede ser negativa');

  const product = await productoRepo.getById(id);

  if (!product)
    throw new NotFoundException(`No existe el producto con el id especificado (id=${id})`);

  return await productoRepo.updateStock(id, cantidad);
}

async function deleteProd(id) {

  const product = await productoRepo.getById(id);

  if (!product)
    throw new NotFoundException(`No existe el producto con el id especificado (id=${id})`);

  return await productoRepo.deleteProd(id);
}

export default { create, get, getById, getByCategoryName, getByProviderName, getByActualStock, update, updateStock, deleteProd };