import proveedorRepo from "../repository/ProveedorRepo.js"

async function crearProveedor(proveedor) {
  //TODO: validar lógica de negocio
  return await proveedorRepo.createProveedor(proveedor);
}

async function listarProveedores() {
  // TODO: validar lógica de negocio
  return await proveedorRepo.getProveedores();
}

async function listarProveedorPorId(id) {
  // TODO: validar lógica de negocio
  return await proveedorRepo.getProveedorById(id);
}

async function listarProveedorPorNombre(nombre) {
  // TODO: validar lógica de negocio
  return await proveedorRepo.getProveedorByNombre(nombre);
}

export default { crearProveedor, listarProveedores, listarProveedorPorId, listarProveedorPorNombre }