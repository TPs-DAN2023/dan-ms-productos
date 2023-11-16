
async function crearProducto(req, res) {

  const prod = req.body;

  // puede haber productos sin proveedor o categoria?
  if(!prod.nombre || !prod.descripcion || !prod.proveedorId || !stockActual || !categoriaId)
    return res.status(400).json("Faltan campos obligatorios");


  try {
    const producto = await crearProducto(prod);
    return res.status(201).json(producto)
  } catch (error) {
    return res.status(404).json({error: error.message});
  }

};

export { crearProducto };