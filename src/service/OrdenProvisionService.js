import ordenProvisionRepo from "../repository/OrdenProvisionRepo.js"
import { validateSupplyOrderFields } from "../utils/validations.js";
import NotFoundException from "../exception/NotFoundException.js";
import MissingDataException from "../exception/MissingDataException.js";
import EstadoOrdenProvision from '../constants/EstadoOrdenProvision.js';
import OrdenProvisionDetalleRepo from "../repository/OrdenProvisionDetalleRepo.js";

async function create(ordenProvision) {

  validateSupplyOrderFields(ordenProvision);

  ordenProvision.detalles.forEach(async detalle => {
    validateSupplyOrderDetailFields(detalle);

    const product = await productoRepo.getById(detalle.productoId);

    if (!product)
      throw new NotFoundException(`No existe el producto con el id especificado (id=${detalle.productoId})`);

    if (detalle.cantidad > product.stockActual)
      throw new InvalidFieldException(`La cantidad solicitada (${detalle.cantidad}) del producto (${product.nombre}) supera su stock actual (${product.stockActual})`);
  });

  const createdSupplyOrder = await ordenProvisionRepo.create(ordenProvision);

  ordenProvision.detalles.forEach(async detalle => {
    detalle.ordenProvisionId = createdSupplyOrder.id;
    await OrdenProvisionDetalleRepo.create(detalle);
  })

  return createdSupplyOrder;
}

async function get() {
  return await ordenProvisionRepo.get();
}

async function getById(id) {
  const ordenProvision = await ordenProvisionRepo.getById(id);

  if (!ordenProvision)
    throw new NotFoundException(`No existe la orden de provisión con el id especificado (id=${id})`);

  return ordenProvision;
}

async function getByProviderId(id) {

  if (!id)
    throw new MissingDataException('El id del proveedor es requerido');

  const provider = await proveedorRepo.getById(id);

  if (!provider)
    throw new NotFoundException(`No existe el proveedor con el id especificado (id=${id})`);

  return await ordenProvisionRepo.getByProviderId(provider);
}

// TODO: Validar si es correcto
async function getByDate(desde, hasta) {

  if (!desde || !hasta)
    throw new MissingDataException('La fecha de inicio y fin son requeridas');

  if (desde > hasta)
    throw new InvalidFieldException('La fecha de inicio no puede ser mayor a la fecha de fin');

  return []
  // return await ordenProvisionRepo.getByDate(desde, hasta);
}

async function update(id, ordenProvision) {

  validateSupplyOrderFields(ordenProvision);

  return await ordenProvisionRepo.update(id, ordenProvision);
}

async function updateState(id, estado) {

  const POSSIBLE_STATES = Object.values(EstadoOrdenProvision)

  if (!POSSIBLE_STATES.includes(estado))
    throw new InvalidFieldException('El estado de la orden de provisión es inválido (debe ser Recibida o Cancelada)');

  return await ordenProvisionRepo.updateState(id, estado);
}

export default { create, get, getById, getByProviderId, getByDate, update, updateState };