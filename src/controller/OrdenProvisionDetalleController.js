import ordenProvisionDetalleService from '../service/OrdenProvisionDetalleService.js';

async function create(req, res) {

  const supplyOrderDetails = req.body;

  if (!supplyOrderDetails.ordenProvisionId || !supplyOrderDetails.cantidad || !supplyOrderDetails.productoId || !supplyOrderDetails.precio)
    return res.status(400).json({ error: 'Faltan datos', message: getMissingData(supplyOrderDetails) });

  if (supplyOrderDetails.cantidad < 1 || supplyOrderDetails.cantidad > 1000)
    return res.status(400).json({ error: 'La cantidad del producto debe encontrarse entre 1 y 1000' });

  if (supplyOrderDetails.precio < 0)
    return res.status(400).json({ error: 'El precio del producto debe ser mayor que 0' });

  try {
    const supplyOrderDetailsResult = await ordenProvisionDetalleService.create(supplyOrderDetails);
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

export default { create };