import ordenProvisionRepo from "../repository/OrdenProvisionRepo.js"

async function crearOrdenProvision(ordenProvision) {
  //TODO: validar lógica de negocio
  return await ordenProvisionRepo.createOrdenProvision(ordenProvision);
}

async function listarOrdenesProvision() {
  // TODO: validar lógica de negocio
  return await ordenProvisionRepo.getOrdenesProvision();
}

async function listarOrdenProvisionPorId(id) {
  // TODO: validar lógica de negocio
  return await ordenProvisionRepo.getOrdenProvisionById(id);
}

async function listarOrdenProvisionPorIdProveedor(id) {
  // TODO: validar lógica de negocio
  return await ordenProvisionRepo.getOrdenProvisionByProveedorId(id);
}

// TODO: Validar si es correcto
async function listarOrdenProvisionPorFecha(desde, hasta) {
  // TODO: validar lógica de negocio
  return await ordenProvisionRepo.getOrdenProvisionByFecha(desde, hasta);
}

async function modificarOrdenProvision(id, ordenProvision) {
  // TODO: validar lógica de negocio
  return await ordenProvisionRepo.updateOrdenProvision(id, ordenProvision);
}

async function cambiarEstadoOrdenProvision(id, estado) {
  // TODO: validar lógica de negocio
  return await ordenProvisionRepo.updateEstadoOrdenProvision(id, estado);
}

export default { crearOrdenProvision, listarOrdenesProvision, listarOrdenProvisionPorId, listarOrdenProvisionPorIdProveedor, listarOrdenProvisionPorFecha, modificarOrdenProvision, cambiarEstadoOrdenProvision };