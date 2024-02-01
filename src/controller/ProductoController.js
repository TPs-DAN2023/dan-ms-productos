import productoService from '../service/ProductoService.js';

async function create(req, res) {

  const prod = req.body;

  // puede haber productos sin proveedor o categoria?
  if (!prod.nombre || !prod.descripcion || !prod.proveedorId || !prod.stockActual || !prod.categoriaId)
    return res.status(400).json({ error: 'Faltan datos', message: getMissingData(prod) });

  try {
    const producto = await productoService.create(prod);
    return res.status(201).json(producto)
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

};

function getMissingData(prod) {
  let missingData = [];
  if (!prod.nombre) missingData.push('nombre');
  if (!prod.descripcion) missingData.push('descripcion');
  if (!prod.proveedorId) missingData.push('proveedorId');
  if (!prod.stockActual) missingData.push('stockActual');
  if (!prod.categoriaId) missingData.push('categoriaId');
  return missingData;
}

async function get(req, res) {

  try {
    const nombre = req.query.nombre;
    const productos = await productoService.get(nombre);
    return res.status(200).json(productos);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function getById(req, res) {

  const id = req.params.id;

  try {
    const producto = await productoService.getById(id);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function getByCategoryName(req, res) {

  const nombre = req.params.nombre;

  try {
    const producto = await productoService.getByCategoryName(nombre);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function getByProviderName(req, res) {

  const nombre = req.params.nombre;

  try {
    const producto = await productoService.getByProviderName(nombre);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function getByActualStock(req, res) {

  const cantidad = req.params.cantidad;

  try {
    const producto = await productoService.getByActualStock(cantidad);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function update(req, res) {

  const id = req.params.id;
  const prod = req.body;

  try {
    const producto = await productoService.update(id, prod);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

async function updateStock(req, res) {

  const id = req.params.id;
  const cantidad = req.params.cantidad;

  try {
    const producto = await productoService.updateStock(id, cantidad);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

async function deleteProd(req, res) {

  const id = req.params.id;

  try {
    const producto = await productoService.deleteProd(id);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

export default { create, get, getById, getByCategoryName, getByProviderName, getByActualStock, update, updateStock, deleteProd };