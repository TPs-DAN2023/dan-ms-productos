import ordenProvisionRepo from "../repository/OrdenProvisionRepo.js"

async function create(ordenProvision) {
  //TODO: validar lógica de negocio
  return await ordenProvisionRepo.create(ordenProvision);
}

async function get() {
  // TODO: validar lógica de negocio
  return await ordenProvisionRepo.get();
}

async function getById(id) {
  // TODO: validar lógica de negocio
  return await ordenProvisionRepo.getById(id);
}

async function getByProviderId(id) {
  // TODO: validar lógica de negocio
  return await ordenProvisionRepo.getByProviderId(id);
}

// TODO: Validar si es correcto
async function getByDate(desde, hasta) {
  // TODO: validar lógica de negocio
  return await ordenProvisionRepo.getByDate(desde, hasta);
}

async function update(id, ordenProvision) {
  // TODO: validar lógica de negocio
  return await ordenProvisionRepo.update(id, ordenProvision);
}

async function updateState(id, estado) {
  // TODO: validar lógica de negocio
  return await ordenProvisionRepo.updateState(id, estado);
}

export default { create, get, getById, getByProviderId, getByDate, update, updateState };