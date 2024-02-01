import proveedorRepo from "../repository/ProveedorRepo.js"
import DuplicatedFieldException from "../exception/DuplicatedFieldException.js";
import InvalidNameException from "../exception/InvalidNameException.js";
import MissingDataException from "../exception/MissingDataException.js";
import NotFoundException from "../exception/NotFoundException.js";
import { isDuplicated, validateEmail, validateName } from "../utils/validations.js";

async function create(proveedor) {

  if (!proveedor.nombre || !proveedor.mail)
    throw new MissingDataException(`Faltan campos: ${getMissingData(proveedor).join(', ')}`);

  if (!validateName(proveedor.nombre))
    throw new InvalidNameException('El nombre del proveedor debe tener entre 3 y 80 caracteres');

  if (!validateEmail(proveedor.mail))
    throw new InvalidNameException('El mail del proveedor es inválido');

  const proveedores = await proveedorRepo.get();

  if (await isDuplicated(proveedores, 'nombre', proveedor.nombre))
    throw new DuplicatedFieldException('Ya existe un proveedor con ese nombre');

  if (await isDuplicated(proveedores, 'mail', proveedor.mail))
    throw new DuplicatedFieldException('Ya existe un proveedor con ese mail');

  return await proveedorRepo.create(proveedor);
}

function getMissingData(provider) {
  let missingData = [];
  if (!provider.nombre) missingData.push('nombre');
  if (!provider.mail) missingData.push('mail');
  return missingData;
}

async function get(nombre) {
  // TODO: validar lógica de negocio
  return await proveedorRepo.get(nombre);
}

async function getById(id) {
  // TODO: validar lógica de negocio
  return await proveedorRepo.getById(id);
}

export default { create, get, getById }