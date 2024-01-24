import proveedorService from '../service/ProveedorService.js';

async function crearProveedor(req, res) {

  const provider = req.body;

  if (!provider.nombre || !provider.mail)
    return res.status(400).json({ error: 'Faltan datos', missingData: getMissingData(provider) });

  try {
    const providerResult = await proveedorService.crearProveedor(provider);
    return res.status(201).json(providerResult)
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

};

function getMissingData(provider) {
  let missingData = [];
  if (!provider.nombre) missingData.push('nombre');
  if (!provider.mail) missingData.push('mail');
  return missingData;
}

async function listarProveedores(req, res) {

  try {
    const providers = await proveedorService.listarProveedores();
    return res.status(200).json(providers);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function listarProveedorPorId(req, res) {

  const id = req.params.id;

  try {
    const provider = await proveedorService.listarProveedorPorId(id);
    return res.status(200).json(provider);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function listarProveedorPorNombre(req, res) {

  const nombre = req.params.nombre;

  try {
    const provider = await proveedorService.listarProveedorPorNombre(nombre);
    return res.status(200).json(provider);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}



export default { crearProveedor, listarProveedores, listarProveedorPorId, listarProveedorPorNombre };