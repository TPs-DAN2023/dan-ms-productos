import ordenProvisionDetalleRepo from "../repository/OrdenProvisionDetalleRepo.js"

async function create(ordenProvisionDetalle) {

  //TODO: validar lógica de negocio
  return await ordenProvisionDetalleRepo.create(ordenProvisionDetalle);

}

export default { create }