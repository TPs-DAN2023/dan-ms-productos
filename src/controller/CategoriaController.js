import categoriaService from '../service/CategoriaService.js';
import DuplicatedNameException from '../exception/DuplicatedFieldException.js';
import errorHandler from '../utils/errorHandler.js';
import InvalidFieldException from '../exception/InvalidFieldException.js';
import MissingDataException from '../exception/MissingDataException.js';
import NotFoundException from '../exception/NotFoundException.js';

async function create(req, res) {

  const category = req.body;

  try {
    const categoryResult = await categoriaService.create(category);
    return res.status(201).json(categoryResult)
  } catch (error) {
    const response = errorHandler(error, [DuplicatedNameException, InvalidFieldException, MissingDataException]);
    console.log(error)
    return res.status(response.status).json(response.body);
  }
};

async function get(req, res) {

  try {
    const nombre = req.query.nombre;
    const categories = await categoriaService.get(nombre);
    return res.status(200).json(categories);
  } catch (error) {
    const response = errorHandler(error, []);
    console.log(error)
    return res.status(response.status).json(response.body);
  }

}

async function getById(req, res) {

  const id = req.params.id;

  try {
    const category = await categoriaService.getById(id);
    return res.status(200).json(category);
  } catch (error) {
    const response = errorHandler(error, [NotFoundException]);
    console.log(error)
    return res.status(response.status).json(response.body);
  }

}

export default { create, get, getById };