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

// routerOrdenesProvision.get('/', controller.listarOrdenesProvision);
// routerOrdenesProvision.get('/:id', controller.listarOrdenProvisionPorId);
// routerOrdenesProvision.get('/proveedor/:id', controller.listarOrdenProvisionPorIdProveedor);
// // TODO: Chequear si la siguiente es correcta o no
// routerOrdenesProvision.get('/fecha/:desde/:hasta', controller.listarOrdenProvisionPorFecha);
// routerOrdenesProvision.put('/:id', controller.modificarOrdenProvision);
// routerOrdenesProvision.patch('/:id/estado', controller.cambiarEstadoOrdenProvision);

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
    return res.status(200).json(supplyOrderResult);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

export default { crearOrdenProvision, listarOrdenesProvision, listarOrdenProvisionPorId, listarOrdenProvisionPorIdProveedor, listarOrdenProvisionPorFecha, modificarOrdenProvision, cambiarEstadoOrdenProvision };