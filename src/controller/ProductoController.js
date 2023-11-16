import productoService from '../service/ProductoService.js';

async function crearProducto(req, res) {

  const prod = req.body;

  // puede haber productos sin proveedor o categoria?
  if(!prod.nombre || !prod.descripcion || !prod.proveedorId || !prod.stockActual || !prod.categoriaId)
    return res.status(400).json("Faltan campos obligatorios");

  try {
    const producto = await productoService.crearProducto(prod);
    return res.status(201).json(producto)
  } catch (error) {
    return res.status(404).json({error: error.message});
  }

};

export default { crearProducto };