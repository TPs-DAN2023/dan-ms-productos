import categoriaService from '../service/CategoriaService.js';

async function crearCategoria(req, res) {

  const category = req.body;

  if (!category.nombre)
    return res.status(400).json("Faltan campos obligatorios");

  try {
    const categoryResult = await categoriaService.crearCategoria(category);
    return res.status(201).json(categoryResult)
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

};

export default { crearCategoria };