import { validateSupplyOrderFields, validateSupplyOrderDetailFields } from "../utils/validation.js";
import EstadoOrdenProvision from '../constants/EstadoOrdenProvision.js';
import InvalidFieldException from "../exception/InvalidFieldException.js";
import MissingDataException from "../exception/MissingDataException.js";
import NotFoundException from "../exception/NotFoundException.js";
import ordenProvisionDetalleRepo from "../repository/OrdenProvisionDetalleRepo.js";
import ordenProvisionRepo from "../repository/OrdenProvisionRepo.js"
import productoRepo from "../repository/ProductoRepo.js";
import ProductsFromDifferentProvidersException from "../exception/ProductsFromDifferentProvidersException.js";
import ProductStockNotAvailableException from "../exception/ProductStockNotAvailableException.js";
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

      // Ask if all products are from the same provider
      if (product.proveedorId !== supplyOrder.proveedorId)
        throw new ProductsFromDifferentProvidersException(`No se puede recibir la orden de provisión ya que el producto ${product.nombre} no pertenece al proveedor (id=${supplyOrder.proveedorId}) de la orden de provisión`);
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
  try {
    return await ordenProvisionRepo.get();
  } catch (error) {
    throw error;
  }
}

async function getById(id) {

  try {
    const ordenProvision = await ordenProvisionRepo.getById(id);

    if (!ordenProvision)
      throw new NotFoundException(`No existe la orden de provisión con el id especificado (id=${id})`);

    return ordenProvision;
  } catch (error) {
    throw error;
  }
}

async function getByProviderId(id) {

  try {
    const provider = await proveedorRepo.getById(id);

    if (!provider)
      throw new NotFoundException(`No existe el proveedor con el id especificado (id=${id})`);

    return await ordenProvisionRepo.getByProviderId(id);
  } catch (error) {
    throw error;
  }
}

async function getByGenerationDate(fechaInicio, fechaFin) {

  if (!fechaInicio || !fechaFin)
    throw new MissingDataException('Falta especificar la fecha de inicio y/o fin');

  if (fechaInicio > fechaFin)
    throw new InvalidFieldException('La fecha de inicio no puede ser mayor a la fecha de fin');

  if (!isDateValid(fechaInicio) || !isDateValid(fechaFin))
    throw new InvalidFieldException('La fecha de inicio y/o fin no tienen un formato válido (deben ser "YYYY-MM-DD")');

  try {
    return await ordenProvisionRepo.getByGenerationDate(fechaInicio, fechaFin);
  } catch (error) {
    throw error;
  }
}

async function getByReceptionDate(fechaInicio, fechaFin) {

  if (!fechaInicio || !fechaFin)
    throw new MissingDataException('Falta especificar la fecha de inicio y/o fin');

  if (fechaInicio > fechaFin)
    throw new InvalidFieldException('La fecha de inicio no puede ser mayor a la fecha de fin');

  if (!isDateValid(fechaInicio) || !isDateValid(fechaFin))
    throw new InvalidFieldException('La fecha de inicio y/o fin no tienen un formato válido (deben ser "YYYY-MM-DD")');

  try {
    return await ordenProvisionRepo.getByReceptionDate(fechaInicio, fechaFin);
  } catch (error) {
    throw error;
  }
}

async function update(id, ordenProvision) {

  try {
    await validateSupplyOrderFields(ordenProvision);

    const supplyOrder = await ordenProvisionRepo.getById(id);

    if (!supplyOrder)
      throw new NotFoundException(`No existe la orden de provisión con el id especificado (id=${id})`);

    return await ordenProvisionRepo.update(id, ordenProvision);
  } catch (error) {
    throw error;
  }
}

async function updateState(id, estado) {
  try {
    const POSSIBLE_STATES = Object.values(EstadoOrdenProvision);

    if (!POSSIBLE_STATES.includes(estado))
      throw new InvalidFieldException('El estado de la orden de provisión es inválido (debe ser "recibida" o "cancelada")');

    const supplyOrder = await ordenProvisionRepo.getById(id);

    if (!supplyOrder)
      throw new NotFoundException(`No existe la orden de provisión con el id especificado (id=${id})`);

    // Ask if the orden has already been canceled or received
    if (supplyOrder.esCancelada || supplyOrder.fechaRecepcion)
      throw new InvalidFieldException('La orden de provisión ya ha sido ' + (supplyOrder.esCancelada ? 'cancelada' : 'recibida') + ' y no puede ser modificada');

    if (estado === EstadoOrdenProvision.CANCELADA) {
      return await ordenProvisionRepo.cancelOrder(id);
    }

    // Ask if all products have the minimum stock available
    await Promise.all(supplyOrder.detalles.map(async detalle => {
      const product = await productoRepo.getById(detalle.productoId);

      if (detalle.cantidad > product.stockActual)
        throw new ProductStockNotAvailableException(`La cantidad solicitada (${detalle.cantidad}) del producto (${product.nombre}) supera su stock actual (${product.stockActual})`);
    }));

    // If so, update the stock of each product
    await Promise.all(supplyOrder.detalles.map(async detalle => {
      const product = await productoRepo.getById(detalle.productoId);

      product.stockActual -= detalle.cantidad;
    }));

    const supplyOrderResult = await ordenProvisionRepo.receiveOrder(id);
    // Finally, update the state of the supply order to be received
    // return await ordenProvisionRepo.receiveOrder(id);
    return supplyOrderResult;
  } catch (error) {
    throw error;
  }
}

export default { create, get, getById, getByProviderId, getByGenerationDate, getByReceptionDate, update, updateState };