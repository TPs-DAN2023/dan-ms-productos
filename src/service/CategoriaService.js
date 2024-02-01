import MissingDataException from "../exception/MissingDataException.js";
import InvalidNameException from "../exception/InvalidNameException.js";
import DuplicatedNameException from "../exception/DuplicatedNameException.js";
import categoriaRepo from "../repository/CategoriaRepo.js"
import NotFoundException from "../exception/NotFoundException.js";

async function crearCategoria(categoria) {

  if (!categoria.nombre)
    throw new MissingDataException('Faltan datos');

  if (categoria.nombre.length < 3)
    throw new InvalidNameException('El nombre de la categoría debe tener al menos 3 caracteres');

  if (categoria.nombre.length > 50)
    throw new InvalidNameException('El nombre de la categoría debe tener menos de 50 caracteres');

  if (await esNombreRepetido(categoria.nombre))
    throw new DuplicatedNameException('Ya existe una categoría con ese nombre');

  return await categoriaRepo.createCategoria(categoria);
}

async function esNombreRepetido(nombre) {
  const categorias = await categoriaRepo.getCategorias(nombre);
  return categorias.length > 0;
}

async function listarCategorias(nombre) {
  return await categoriaRepo.getCategorias(nombre);
}

async function listarCategoriaPorId(id) {
  const categoria = await categoriaRepo.getCategoriaById(id);

  if (!categoria)
    throw new NotFoundException(`No existe la categoría con el id especificado (id=${id})`);

  return categoria;
}

export default { crearCategoria, listarCategorias, listarCategoriaPorId }