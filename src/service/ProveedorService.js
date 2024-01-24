import proveedorRepo from "../repository/ProveedorRepo.js"

async function crearProveedor(proveedor) {

  //TODO: validar lógica de negocio
  return await proveedorRepo.createProveedor(proveedor);

}

export default { crearProveedor }