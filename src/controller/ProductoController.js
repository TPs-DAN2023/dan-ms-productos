import productoService from '../service/ProductoService.js';

async function crearProducto(req, res) {

  const prod = req.body;

  // puede haber productos sin proveedor o categoria?
  if (!prod.nombre || !prod.descripcion || !prod.proveedorId || !prod.stockActual || !prod.categoriaId)
    return res.status(400).json({ error: 'Faltan datos', missingData: getMissingData(prod) });

  try {
    const producto = await productoService.crearProducto(prod);
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

async function listarProductos(req, res) {

  try {
    const nombre = req.query.nombre;
    const productos = await productoService.listarProductos(nombre);
    return res.status(200).json(productos);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function listarProductoPorId(req, res) {

  const id = req.params.id;

  try {
    const producto = await productoService.listarProductoPorId(id);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function listarProductoPorNombreCategoria(req, res) {

  const nombre = req.params.nombre;

  try {
    const producto = await productoService.listarProductoPorNombreCategoria(nombre);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function listarProductoPorNombreProveedor(req, res) {

  const nombre = req.params.nombre;

  try {
    const producto = await productoService.listarProductoPorNombreProveedor(nombre);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function listarProductoPorStockActual(req, res) {

  const cantidad = req.params.cantidad;

  try {
    const producto = await productoService.listarProductoPorStockActual(cantidad);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function modificarProducto(req, res) {

  const id = req.params.id;
  const prod = req.body;

  try {
    const producto = await productoService.modificarProducto(id, prod);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function eliminarProducto(req, res) {

  const id = req.params.id;

  try {
    const producto = await productoService.eliminarProducto(id);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

export default { crearProducto, listarProductos, listarProductoPorId, listarProductoPorNombreCategoria, listarProductoPorNombreProveedor, listarProductoPorStockActual, modificarProducto, eliminarProducto };