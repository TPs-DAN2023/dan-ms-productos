import productoRepo from "../repository/ProductoRepo.js"
import NotFoundException from "../exception/NotFoundException.js";
import MissingDataException from "../exception/MissingDataException.js";
import { validateProductFields } from "../utils/validation.js";
import InvalidFieldException from "../exception/InvalidFieldException.js";
import proveedorRepo from "../repository/ProveedorRepo.js";
import categoriaRepo from "../repository/CategoriaRepo.js";
import OrdenProvisionDetalleRepo from "../repository/OrdenProvisionDetalleRepo.js";

async function create(producto) {

  try {
    await validateProductFields(producto);
    return await productoRepo.create(producto);
  } catch (error) {
    throw error;
  }
}

async function getPrecio(producto) {
  const ordenes = await OrdenProvisionDetalleRepo.getByProductId(producto.id)
    .then((ordenes) => ordenes.sort((o1, o2) => o1.ordenProvision.fechaGeneracion < o2.ordenProvision.fechaGeneracion ? 1 : -1));

  if(ordenes.length < 1)
    return null;

  const costo = ordenes[0].precio;

  const res = await fetch(process.env.MS_OFERTAS_URL + '/api/precios/producto', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*'
    },
    body: JSON.stringify({
      id: producto.id,
      costo: costo,
    })
  });

  if(!res.ok)
    throw new Error(`Error al obtener el precio del producto ${producto.nombre}. id: ${producto.id}`);

  const precio = await res.json();
  return precio.monto;
}

async function get(nombre) {
  const prods = await productoRepo.get(nombre);

  await Promise.all(prods.map(async (p) => {
    p.precio = await getPrecio(p);
  }));

  return prods;
}

async function getById(id) {
  try {
    const producto = await productoRepo.getById(id);

    if (!producto)
      throw new NotFoundException(`No existe el producto con el id especificado (id=${id})`);

    const precio = await getPrecio(producto);

    return {
      ...producto,
      precio: precio
    };
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

    const prods = await productoRepo.getByCategoryName(nombre);

    await Promise.all(prods.map(async (p) => {
      p.precio = await getPrecio(p);
    }));

    return prods;

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

    const prods = await productoRepo.getByProviderName(nombre);

    await Promise.all(prods.map(async (p) => {
      p.precio = await getPrecio(p);
    }));

    return prods;
  } catch (error) {
    throw error;
  }
}

async function getByActualStock(cantidad) {

  if (cantidad < 0)
    throw new InvalidFieldException('La cantidad de stock actual no puede ser negativa');

  const prods = await productoRepo.getByActualStock(cantidad);

  await Promise.all(prods.map(async (p) => {
    p.precio = await getPrecio(p);
  }));

  return prods;
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