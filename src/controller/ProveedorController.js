import proveedorService from '../service/ProveedorService.js';

async function crearProveedor(req, res) {

  const provider = req.body;

  if (!provider.nombre || !provider.mail)
    return res.status(400).json("Faltan campos obligatorios");

  try {
    const providerResult = await proveedorService.crearProveedor(provider);
    return res.status(201).json(providerResult)
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

};

export default { crearProveedor };