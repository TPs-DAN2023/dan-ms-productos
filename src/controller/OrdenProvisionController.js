import ordenProvisionService from '../service/OrdenProvisionService.js';

async function crearOrdenProvision(req, res) {

  const supplyOrder = req.body;

  if (!supplyOrder.fechaGeneracion || !supplyOrder.fechaRecepcion || !supplyOrder.esCancelada || !supplyOrder.proveedorId)
    return res.status(400).json("Faltan campos obligatorios");

  try {
    const supplyOrderResult = await ordenProvisionService.crearOrdenProvision(supplyOrder);
    return res.status(201).json(supplyOrderResult)
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

};

export default { crearOrdenProvision };