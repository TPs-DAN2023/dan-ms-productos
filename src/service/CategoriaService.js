import categoriaRepo from "../repository/CategoriaRepo.js"
import DuplicatedNameException from "../exception/DuplicatedFieldException.js";
import InvalidNameException from "../exception/InvalidNameException.js";
import MissingDataException from "../exception/MissingDataException.js";
import NotFoundException from "../exception/NotFoundException.js";

async function create(categoria) {

  if (!categoria.nombre)
    throw new MissingDataException('Faltan campos: nombre');

  if (categoria.nombre.length < 3)
    throw new InvalidNameException('El nombre de la categoría debe tener al menos 3 caracteres');

  if (categoria.nombre.length > 50)
    throw new InvalidNameException('El nombre de la categoría debe tener menos de 50 caracteres');

  const categorias = await categoriaRepo.get();

  if (await isDuplicated(categorias, 'nombre', categoria.nombre))
    throw new DuplicatedNameException('Ya existe una categoría con ese nombre');

  return await categoriaRepo.create(categoria);
}

async function get(nombre) {
  return await categoriaRepo.get(nombre);
}

async function getById(id) {
  const categoria = await categoriaRepo.getById(id);

  if (!categoria)
    throw new NotFoundException(`No existe la categoría con el id especificado (id=${id})`);

  return categoria;
}

export default { create, get, getById }