import proveedorService from '../service/ProveedorService.js';
import DuplicatedNameException from '../exception/DuplicatedFieldException.js';
import errorHandler from '../utils/errorHandler.js';
import InvalidFieldException from '../exception/InvalidFieldException.js';
import MissingDataException from '../exception/MissingDataException.js';
import NotFoundException from '../exception/NotFoundException.js';

async function create(req, res) {

  const provider = req.body;

  try {
    const providerResult = await proveedorService.create(provider);
    return res.status(201).json(providerResult)
  } catch (error) {
    const response = errorHandler(error, [DuplicatedNameException, InvalidFieldException, MissingDataException]);

    return res.status(response.status).json(response.body);
  }

};

async function get(req, res) {

  try {
    const nombre = req.query.nombre;
    const providers = await proveedorService.get(nombre);
    return res.status(200).json(providers);
  } catch (error) {
    const response = errorHandler(error, []);

    return res.status(response.status).json(response.body);
  }

}

async function getById(req, res) {

  const id = req.params.id;

  try {
    const provider = await proveedorService.getById(id);
    return res.status(200).json(provider);
  } catch (error) {
    const response = errorHandler(error, [NotFoundException]);

    return res.status(response.status).json(response.body);
  }

}

export default { create, get, getById };