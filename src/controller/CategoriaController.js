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

async function listarCategorias(req, res) {

  try {
    const categories = await categoriaService.listarCategorias();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function listarCategoriaPorId(req, res) {

  const id = req.params.id;

  try {
    const category = await categoriaService.listarCategoriaPorId(id);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function listarCategoriaPorNombre(req, res) {

  const nombre = req.params.nombre;

  try {
    const category = await categoriaService.listarCategoriaPorNombre(nombre);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}


export default { crearCategoria, listarCategorias, listarCategoriaPorId, listarCategoriaPorNombre };