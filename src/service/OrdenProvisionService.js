import { validateSupplyOrderFields, validateSupplyOrderDetailFields } from "../utils/validation.js";
import EstadoOrdenProvision from '../constants/EstadoOrdenProvision.js';
import InvalidFieldException from "../exception/InvalidFieldException.js";
import MissingDataException from "../exception/MissingDataException.js";
import NotFoundException from "../exception/NotFoundException.js";
import ordenProvisionDetalleRepo from "../repository/OrdenProvisionDetalleRepo.js";
import ordenProvisionRepo from "../repository/OrdenProvisionRepo.js"
import productoRepo from "../repository/ProductoRepo.js";
import proveedorRepo from "../repository/ProveedorRepo.js";

async function create(ordenProvision) {
  try {
    await validateSupplyOrderFields(ordenProvision);

    await Promise.all(ordenProvision.detalles.map(async detalle => {
      await validateSupplyOrderDetailFields(detalle);

      const product = await productoRepo.getById(detalle.productoId);

      if (!product)
        throw new NotFoundException(`No existe el producto con el id especificado (id=${detalle.productoId})`);

      if (detalle.cantidad > product.stockActual)
        throw new InvalidFieldException(`La cantidad solicitada (${detalle.cantidad}) del producto (${product.nombre}) supera su stock actual (${product.stockActual})`);
    }));

    const createdSupplyOrder = await ordenProvisionRepo.create(ordenProvision);

    await Promise.all(ordenProvision.detalles.map(async detalle => {
      detalle.ordenProvisionId = createdSupplyOrder.id;
      await ordenProvisionDetalleRepo.create(detalle);
    }));

    return createdSupplyOrder;
  } catch (error) {
    throw error;
  }
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

  try {
    await validateSupplyOrderFields(ordenProvision);

    return await ordenProvisionRepo.update(id, ordenProvision);
  } catch (error) {
    throw error;
  }
}

async function updateState(id, estado) {

  const POSSIBLE_STATES = Object.values(EstadoOrdenProvision)

  if (!POSSIBLE_STATES.includes(estado))
    throw new InvalidFieldException('El estado de la orden de provisión es inválido (debe ser Recibida o Cancelada)');

  // TODO: Hacer bien
  if (estado === EstadoOrdenProvision.RECIBIDA) {
    const supplyOrderResult = await ordenProvisionRepo.updateState(id, estado);

    await Promise.all(supplyOrderResult.detalles.map(async detalle => {
      const product = await productoRepo.getById(detalle.productoId);

      product.stockActual += detalle.cantidad;

      await productoRepo.update(product.id, product);
    }));

    return supplyOrderResult;
  }
  else if (estado === EstadoOrdenProvision.CANCELADA) {
    return await ordenProvisionRepo.updateState(id, estado);
  }

  return await ordenProvisionRepo.updateState(id, estado);
}

export default { create, get, getById, getByProviderId, getByDate, update, updateState };