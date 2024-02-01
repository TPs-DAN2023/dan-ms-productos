import proveedorRepo from "../repository/ProveedorRepo.js";
import { validateProviderFields } from "../utils/validations.js";

async function create(proveedor) {

  validateProviderFields(proveedor);

  return await proveedorRepo.create(proveedor);
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