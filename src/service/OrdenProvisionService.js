import ordenProvisionRepo from "../repository/OrdenProvisionRepo.js"

async function crearOrdenProvision(ordenProvision) {

  //TODO: validar lógica de negocio
  return await ordenProvisionRepo.createOrdenProvision(ordenProvision);

}

export default { crearOrdenProvision }