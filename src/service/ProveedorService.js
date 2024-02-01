import proveedorRepo from "../repository/ProveedorRepo.js";
import { validateProviderFields } from "../utils/validation.js";
import NotFoundException from "../exception/NotFoundException.js";

async function create(proveedor) {

  try {
    await validateProviderFields(proveedor);
    return await proveedorRepo.create(proveedor);
  } catch (error) {
    throw error;
  }
}

async function get(nombre) {
  return await proveedorRepo.get(nombre);
}

async function getById(id) {

  const proveedor = await proveedorRepo.getById(id);

  if (!proveedor)
    throw new NotFoundException(`No existe el proveedor con el id especificado (id=${id})`);

  return await proveedorRepo.getById(id);
}

export default { create, get, getById }