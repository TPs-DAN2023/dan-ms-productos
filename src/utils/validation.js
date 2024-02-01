import DuplicatedFieldException from "../exception/DuplicatedFieldException.js";
import InvalidFieldException from "../exception/InvalidFieldException.js";
import MissingDataException from "../exception/MissingDataException.js";
import NotFoundException from "../exception/NotFoundException.js";

export default function isDuplicated(list, field, value) {
  return list.some(item => item[field] === value);
}

export default function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function isNameValid(name) {
  return name.length >= 3 && name.length <= 80;
}

export default function isDescriptionValid(description) {
  return description.length >= 3 && description.length <= 200;
}

export default function isStockValid(stock) {
  return stock >= 0;
}

function getMissingData(prod, fields) {
  let missingData = [];
  fields.forEach(field => {
    if (!prod[field]) missingData.push(field);
  });
  return missingData;
}

export default async function validateCategoryFields(category) {
  if (!category.nombre)
    throw new MissingDataException('Faltan campos: nombre');

  if (!isNameValid(category.nombre))
    throw new InvalidFieldException('El nombre de la categoría debe tener entre 3 y 80 caracteres');

  const categories = await categoriaRepo.get();

  if (await isDuplicated(categories, 'nombre', category.nombre))
    throw new DuplicatedFieldException('Ya existe una categoría con ese nombre');
}

export default async function validateProviderFields(provider) {
  if (!provider.nombre || !provider.mail)
    throw new MissingDataException(`Faltan campos: ${getMissingData(provider, ['nombre', 'mail']).join(', ')}`);

  if (!isNameValid(provider.nombre))
    throw new InvalidFieldException('El nombre del proveedor debe tener entre 3 y 80 caracteres');

  if (!isEmailValid(provider.mail))
    throw new InvalidFieldException('El mail del proveedor es inválido');

  const providers = await proveedorRepo.get();

  if (await isDuplicated(providers, 'nombre', provider.nombre))
    throw new DuplicatedFieldException('Ya existe un proveedor con ese nombre');

  if (await isDuplicated(providers, 'mail', provider.mail))
    throw new DuplicatedFieldException('Ya existe un proveedor con ese mail');
}

export default async function validateProductFields(product) {
  if (!product.nombre || !product.descripcion || !product.proveedorId || !product.stockActual || !product.categoriaId)
    throw new MissingDataException(`Faltan campos: ${getMissingData(product, ['nombre', 'descripcion', 'proveedorId', 'stockActual', 'categoriaId']).join(', ')}`);

  if (!isNameValid(product.nombre))
    throw new InvalidFieldException('El nombre del producto debe tener entre 3 y 80 caracteres');

  if (!isDescriptionValid(product.descripcion))
    throw new InvalidFieldException('La descripción del producto debe tener entre 3 y 200 caracteres');

  if (!isStockValid(product.stockActual))
    throw new InvalidFieldException('El stock actual del producto no puede ser negativo');

  const provider = await proveedorRepo.getById(product.proveedorId);
  const category = await categoriaRepo.getById(product.categoriaId);

  if (!provider)
    throw new NotFoundException(`No existe el proveedor con el id especificado (id=${product.proveedorId})`);

  if (!category)
    throw new NotFoundException(`No existe la categoría con el id especificado (id=${product.categoriaId})`);

  const products = await productoRepo.get();

  if (await isDuplicated(products, 'nombre', product.nombre))
    throw new DuplicatedFieldException('Ya existe un producto con ese nombre');
}