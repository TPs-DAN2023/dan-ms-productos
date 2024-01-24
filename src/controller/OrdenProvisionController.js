import ordenProvisionService from '../service/OrdenProvisionService.js';

async function crearOrdenProvision(req, res) {

  const supplyOrder = req.body;

  if (!supplyOrder.fechaGeneracion || !supplyOrder.proveedorId)
    return res.status(400).json({ error: 'Faltan datos', missingData: getMissingData(supplyOrder) });

  if (supplyOrder.esCancelada)
    return res.status(400).json({ error: 'No se puede crear una orden de provisión cancelada' });

  if (supplyOrder.fechaRecepcion)
    return res.status(400).json({ error: 'No se puede crear una orden de provisión ya recibida' });

  try {
    const supplyOrderResult = await ordenProvisionService.crearOrdenProvision(supplyOrder);
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

async function listarOrdenesProvision(req, res) {

  try {
    const supplyOrders = await ordenProvisionService.listarOrdenesProvision();
    return res.status(200).json(supplyOrders);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function listarOrdenProvisionPorId(req, res) {

  const id = req.params.id;

  try {
    const supplyOrder = await ordenProvisionService.listarOrdenProvisionPorId(id);
    return res.status(200).json(supplyOrder);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function listarOrdenProvisionPorIdProveedor(req, res) {

  const id = req.params.id;

  try {
    const supplyOrder = await ordenProvisionService.listarOrdenProvisionPorIdProveedor(id);
    return res.status(200).json(supplyOrder);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

// TODO: Ver si está bien así
async function listarOrdenProvisionPorFecha(req, res) {

  const desde = req.params.desde;
  const hasta = req.params.hasta;

  try {
    const supplyOrder = await ordenProvisionService.listarOrdenProvisionPorFecha(desde, hasta);
    return res.status(200).json(supplyOrder);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function modificarOrdenProvision(req, res) {

  const id = req.params.id;
  const supplyOrder = req.body;

  try {
    const supplyOrderResult = await ordenProvisionService.modificarOrdenProvision(id, supplyOrder);
    return res.status(200).json(supplyOrderResult);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function cambiarEstadoOrdenProvision(req, res) {

  const id = req.params.id;
  const estado = req.body;

  try {
    const supplyOrderResult = await ordenProvisionService.cambiarEstadoOrdenProvision(id, estado);
    if (supplyOrderResult.fechaRecepcion) {
      const productResult = await productoService.modificarStockDeProductos(supplyOrderResult);
    }
    return res.status(200).json(supplyOrderResult);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

export default { crearOrdenProvision, listarOrdenesProvision, listarOrdenProvisionPorId, listarOrdenProvisionPorIdProveedor, listarOrdenProvisionPorFecha, modificarOrdenProvision, cambiarEstadoOrdenProvision };