import proveedorRepo from "../repository/ProveedorRepo.js"

async function crearProveedor(proveedor) {
  //TODO: validar lógica de negocio
  return await proveedorRepo.createProveedor(proveedor);
}

async function listarProveedores(nombre) {
  // TODO: validar lógica de negocio
  return await proveedorRepo.getProveedores(nombre);
}

async function listarProveedorPorId(id) {
  // TODO: validar lógica de negocio
  return await proveedorRepo.getProveedorById(id);
}

export default { crearProveedor, listarProveedores, listarProveedorPorId }