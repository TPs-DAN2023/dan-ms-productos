import ordenProvisionDetalleService from '../service/OrdenProvisionDetalleService.js';

async function crearOrdenProvisionDetalle(req, res) {

  const supplyOrderDetails = req.body;

  if (!supplyOrderDetails.ordenProvisionId || !supplyOrderDetails.cantidad || !supplyOrderDetails.productoId || !supplyOrderDetails.precio)
    return res.status(400).json({ error: 'Faltan datos', missingData: getMissingData(supplyOrderDetails) });

  try {
    const supplyOrderDetailsResult = await ordenProvisionDetalleService.crearOrdenProvisionDetalle(supplyOrderDetails);
    return res.status(201).json(supplyOrderDetailsResult)
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

};

function getMissingData(supplyOrderDetails) {
  let missingData = [];
  if (!supplyOrderDetails.ordenProvisionId) missingData.push('ordenProvisionId');
  if (!supplyOrderDetails.cantidad) missingData.push('cantidad');
  if (!supplyOrderDetails.productoId) missingData.push('productoId');
  if (!supplyOrderDetails.precio) missingData.push('precio');
  return missingData;
}

export default { crearOrdenProvisionDetalle };