import ordenProvisionDetalleService from '../service/OrdenProvisionDetalleService.js';

async function crearOrdenProvisionDetalle(req, res) {

  const supplyOrderDetails = req.body;

  if (!supplyOrderDetails.ordenProvisionId || !supplyOrderDetails.cantidad || !supplyOrderDetails.productoId || !supplyOrderDetails.precio)
    return res.status(400).json("Faltan campos obligatorios");

  try {
    const supplyOrderDetailsResult = await ordenProvisionDetalleService.crearOrdenProvisionDetalle(supplyOrderDetails);
    return res.status(201).json(supplyOrderDetailsResult)
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

};

export default { crearOrdenProvisionDetalle };