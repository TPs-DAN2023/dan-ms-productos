import productoService from '../service/ProductoService.js';
import DuplicatedNameException from '../exception/DuplicatedFieldException.js';
import errorHandler from '../utils/errorHandler.js';
import InvalidNameException from '../exception/InvalidNameException.js';
import MissingDataException from '../exception/MissingDataException.js';
import NotFoundException from '../exception/NotFoundException.js';
import InvalidDescriptionException from '../exception/InvalidDescriptionException.js';
import InvalidActualStockException from '../exception/InvalidActualStockException.js';

async function create(req, res) {

  const prod = req.body;

  try {
    const producto = await productoService.create(prod);
    return res.status(201).json(producto)
  } catch (error) {
    const response = errorHandler(error, [DuplicatedNameException, InvalidNameException, InvalidDescriptionException, InvalidActualStockException, MissingDataException]);

    return res.status(response.status).json(response.body);
  }

};

async function get(req, res) {

  try {
    const nombre = req.query.nombre;
    const productos = await productoService.get(nombre);
    return res.status(200).json(productos);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function getById(req, res) {

  const id = req.params.id;

  try {
    const producto = await productoService.getById(id);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function getByCategoryName(req, res) {

  const nombre = req.params.nombre;

  try {
    const producto = await productoService.getByCategoryName(nombre);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function getByProviderName(req, res) {

  const nombre = req.params.nombre;

  try {
    const producto = await productoService.getByProviderName(nombre);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function getByActualStock(req, res) {

  const cantidad = req.params.cantidad;

  try {
    const producto = await productoService.getByActualStock(cantidad);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }

}

async function update(req, res) {

  const id = req.params.id;
  const prod = req.body;

  try {
    const producto = await productoService.update(id, prod);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

async function updateStock(req, res) {

  const id = req.params.id;
  const cantidad = req.params.cantidad;

  try {
    const producto = await productoService.updateStock(id, cantidad);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

async function deleteProd(req, res) {

  const id = req.params.id;

  try {
    const producto = await productoService.deleteProd(id);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

export default { create, get, getById, getByCategoryName, getByProviderName, getByActualStock, update, updateStock, deleteProd };