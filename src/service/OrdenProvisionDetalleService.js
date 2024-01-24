import ordenProvisionDetalleRepo from "../repository/OrdenProvisionDetalleRepo.js"

async function crearOrdenProvisionDetalle(ordenProvisionDetalle) {

  //TODO: validar lógica de negocio
  return await ordenProvisionDetalleRepo.createOrdenProvisionDetalle(ordenProvisionDetalle);

}

export default { crearOrdenProvisionDetalle }