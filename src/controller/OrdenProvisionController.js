import ordenProvisionService from '../service/OrdenProvisionService.js';

async function create(req, res) {
  const supplyOrder = req.body;

  try {
    const supplyOrderResult = await ordenProvisionService.create(supplyOrder);
    return res.status(201).json(supplyOrderResult)
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

};

function getMissingData(supplyOrder) {
  let missingData = [];
  if (!supplyOrder.fechaGeneracion) missingData.push('fechaGeneracion');
  if (!supplyOrder.fechaRecepcion) missingData.push('fechaRecepcion');
  if (!supplyOrder.proveedorId) missingData.push('proveedorId');
  return missingData;
}

async function get(req, res) {

  try {
    const supplyOrders = await ordenProvisionService.get();
    return res.status(200).json(supplyOrders);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function getById(req, res) {

  const id = req.params.id;

  try {
    const supplyOrder = await ordenProvisionService.getById(id);
    return res.status(200).json(supplyOrder);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function getByProviderId(req, res) {

  const id = req.params.id;

  try {
    const supplyOrder = await ordenProvisionService.getByProviderId(id);
    return res.status(200).json(supplyOrder);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

// TODO: Ver si está bien así
async function getByDate(req, res) {

  const desde = req.params.desde;
  const hasta = req.params.hasta;

  try {
    const supplyOrder = await ordenProvisionService.getByDate(desde, hasta);
    return res.status(200).json(supplyOrder);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function update(req, res) {

  const id = req.params.id;
  const supplyOrder = req.body;

  try {
    const supplyOrderResult = await ordenProvisionService.update(id, supplyOrder);
    return res.status(200).json(supplyOrderResult);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function updateState(req, res) {

  const id = req.params.id;
  const estado = req.body;

  try {
    const supplyOrderResult = await ordenProvisionService.updateState(id, estado);
    if (supplyOrderResult.fechaRecepcion) {
      const productResult = await productoService.modificarStockDeProductos(supplyOrderResult);
    }
    return res.status(200).json(supplyOrderResult);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

export default { create, get, getById, getByProviderId, getByDate, update, updateState };